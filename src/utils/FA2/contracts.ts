import type { CollectionMeta } from "./type";
import { PollingSubscribeProvider, TezosToolkit, ContractAbstraction, ContractProvider } from '@taquito/taquito'
import { InMemorySigner } from '@taquito/signer'
import axios from 'axios'
import { contractStorage, mintFreezeStorage, nftStorage, pausableSimpleAdminStorage } from '@oxheadalpha/fa2-interfaces';
import { TempleWallet } from "@temple-wallet/dapp";

export const createNftStorage = (owner: string, metadata: string) => {
    return contractStorage
        .with(pausableSimpleAdminStorage)
        .with(nftStorage)
        .with(mintFreezeStorage)
        .build({ owner, metadata })
}

export async function createCollection(wallet: TezosToolkit,address:string,  metadata: CollectionMeta): Promise<void> {
     const { data: code } = await axios.get('src/assets/fa2_nft_asset.tz')
    const storage = createNftStorage(address, JSON.stringify(metadata))
    const contract = await originateContract(wallet, code, storage)
    console.log(contract)
}


export const originateContract = async (
    tz: TezosToolkit,
    code: string,
    storage: string | object
): Promise<ContractAbstraction<ContractProvider>> => {
    try {
        const origParam = typeof storage === 'string' ? { code, init: storage } : { code, storage };
        console.log(origParam)
        const originationOp = await tz.contract.originate(origParam);
        console.log(originationOp)
        const contract = await originationOp.contract()
        return Promise.resolve(contract);
    } catch (error) {
        const jsonError = JSON.stringify(error, null, 2);
        return Promise.reject(error);
    }
}