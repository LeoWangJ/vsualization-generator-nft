import type { CollectionMeta } from "./type";
import { TezosToolkit, DefaultWalletType } from '@taquito/taquito'
import axios from 'axios'
import { contractStorage, mintFreezeStorage, nftStorage, pausableSimpleAdminStorage } from '@oxheadalpha/fa2-interfaces'

export const createNftStorage = (owner: string, metadata: string) => {
    return contractStorage.with(pausableSimpleAdminStorage).with(nftStorage).with(mintFreezeStorage).build({ owner, metadata })
}

export async function createCollection(wallet: TezosToolkit, address: string, metadata: CollectionMeta): Promise<string> {
    const { data: code } = await axios.get('src/assets/fa2_nft_asset.tz')
    const storage = createNftStorage(address, JSON.stringify(metadata))
    try {
        const contract = await originateContract(wallet, code, storage)
        console.log(`createCollection:`, contract)
        return contract.address
    } catch (e) {
        return `create collection contract error!`
    }
}


export const originateContract = async (tz: TezosToolkit, code: string, storage: string | object): Promise<DefaultWalletType> => {
    try {
        const origParam = typeof storage === 'string' ? { code, init: storage } : { code, storage };
        const originationOp = await tz.wallet.originate(origParam).send()
        const contract = originationOp.contract()
        return Promise.resolve(contract);
    } catch (error) {
        return Promise.reject(error);
    }
}