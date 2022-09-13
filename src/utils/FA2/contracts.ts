import type { CollectionMeta } from "./type";
import { PollingSubscribeProvider, TezosToolkit, ContractAbstraction, ContractProvider } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
import axios from 'axios'
import { contractStorage, mintFreezeStorage, nftStorage, pausableSimpleAdminStorage } from '@oxheadalpha/fa2-interfaces';

export const createNftStorage = (owner: string, metadata: CollectionMeta) => {
    return contractStorage
        .with(pausableSimpleAdminStorage)
        .with(nftStorage)
        .with(mintFreezeStorage)
        .build({ owner, metadata })
}

export async function createCollection(owner: string, metadata: CollectionMeta): Promise<void> {
    const tz = await createToolkit(owner);
    const ownerAddress = await tz.signer.publicKeyHash();

    const { data: code } = await axios.get('src/assets/fa2_nft_asset.tz')
    const storage = createNftStorage(ownerAddress, metadata)
    const contract = await originateContract(tz, code, storage, 'nft')
}

export async function createToolkit(
    privateKey: string
): Promise<TezosToolkit> {
    const signer = await InMemorySigner.fromSecretKey(privateKey).catch(_ => console.log(`fail to get signer`))
    return createToolkitFromSigner(signer as unknown as InMemorySigner);
}

export function createToolkitFromSigner(
    signer: InMemorySigner
): TezosToolkit {
    const toolkit = createToolkitWithoutSigner();
    toolkit.setProvider({
        signer
    });
    return toolkit;
}

export function createToolkitWithoutSigner(): TezosToolkit {
    const toolkit = new TezosToolkit("https://rpc.ghostnet.teztnets.xyz")
    toolkit.setStreamProvider(
        toolkit.getFactory(PollingSubscribeProvider)({
            pollingIntervalMilliseconds: 5000
        })
    );
    return toolkit;
}


export const originateContract = async (
    tz: TezosToolkit,
    code: string,
    storage: string | object,
    name: string
): Promise<ContractAbstraction<ContractProvider>> => {
    try {
        const origParam = typeof storage === 'string' ? { code, init: storage } : { code, storage };
        const originationOp = await tz.contract.originate(origParam);
        const contract = await originationOp.contract()
        return Promise.resolve(contract);
    } catch (error) {
        const jsonError = JSON.stringify(error, null, 2);
        return Promise.reject(error);
    }
}