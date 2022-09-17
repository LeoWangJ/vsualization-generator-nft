import type { Balance, CollectionMeta, MintNFT, ShowBalance, Token } from "./type"
import { TezosToolkit, DefaultWalletType } from '@taquito/taquito'
import axios from 'axios'
import { contractStorage, mintFreezeStorage, nftStorage, pausableSimpleAdminStorage } from '@oxheadalpha/fa2-interfaces'
import * as fa2 from '@oxheadalpha/fa2-interfaces'
import { BigNumber } from 'bignumber.js'
import { char2Bytes } from '@taquito/utils'

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
        return `create collection contract error`
    }
}


export const mintNfts = async ({ wallet, address, collectionAddress, tokens }: MintNFT): Promise<void> => {
    const nftContract = (await fa2.tezosWalletApi(wallet).at(collectionAddress)).asNft().withMint()
    const parsedTokens = tokens.map((token) => parseTokens(token))
    await fa2.runMethod(nftContract.mint([{ owner: address, tokens: parsedTokens }]))
}

const parseTokens = (token: Token): fa2.TokenMetadataInternal => {
    const parseToken = fa2.createOffChainTokenMetadata(
        new BigNumber(token.tokenId),
        token.metadataUri
    )
    parseToken.token_info.set('', char2Bytes(token.metadataUri))
    return parseToken
}

export const mintFreeze = async (wallet: TezosToolkit, collectionAddress: string): Promise<void> => {
    const nftContract = (await fa2.tezosApi(wallet).at(collectionAddress)).asNft().withMint().withFreeze()
    await fa2.runMethod(nftContract.mintFreeze())
}

export const originateContract = async (tz: TezosToolkit, code: string, storage: string | object): Promise<DefaultWalletType> => {
    try {
        const origParam = typeof storage === 'string' ? { code, init: storage } : { code, storage }
        const originationOp = await tz.wallet.originate(origParam).send()
        const contract = originationOp.contract()
        return Promise.resolve(contract)
    } catch (error) {
        return Promise.reject(error)
    }
}

export const showBalances = async ({ tz, ownerAddress, nftAddress, tokens }: ShowBalance): Promise<Balance[]> => {
    const requests: fa2.BalanceRequest[] = tokens.map(t => {
        return { token_id: new BigNumber(t), owner: ownerAddress }
    })
    const fa2Contract = (await fa2.tezosApi(tz).at(nftAddress)).withFa2()
    const balances = await fa2Contract.queryBalances(requests)
    return parseBalances(balances)
}

const parseBalances = (balances: fa2.BalanceResponse[]): Balance[] => {
    return balances.map(balance => {
        return {
            owner: balance.request.owner,
            tokenId: +balance.request.token_id.toString(),
            balance: +balance.balance.toString()
        }
    })
}