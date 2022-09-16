import { validateTzip16, validateTzip21 } from '@oxheadalpha/fa2-interfaces'
import { TezosToolkit } from '@taquito/taquito'
import type { CollectionMeta, NFTMeta } from './type'
import * as fa2 from '@oxheadalpha/fa2-interfaces'



export const createCollectionMeta = ({ name, description, homepage, authors = [], version = '1.0.0', licenseName = 'MIT' }: CollectionMeta) => {
    const meta = {
        name,
        description,
        homepage,
        authors,
        version,
        license: { name: licenseName },
        interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
        source: {
            tools: ['LIGO'],
            location: 'https://github.com/oxheadalpha/nft-tutorial'
        }
    }
    return meta
}

export const validateCollectionMeta = (meta) => {
    return validateTzip16(meta)
}

export const createNFTMeta = ({ name, description = '', tags = [], minterAddress, artifactUri }: NFTMeta) => {
    const meta = {
        decimals: 0,
        isBooleanAmount: true,
        name,
        description,
        tags,
        minter: minterAddress,
        artifactUri,
        displayUri: artifactUri,
        thumbnailUri: artifactUri,
        creators: [],
        rights: '',
        attributes: [{ name: 'sample attribute', value: 'sample value' }]
    }
    return meta
}

export const validateNFTMeta = (meta) => {
    return validateTzip21(meta)
}

export const showNFTMetadata = async (tz: TezosToolkit, nftAddress: string, tokens: string[]) => {
    const tokenIds = tokens.map(t => Number.parseInt(t))
    const fa2Contract = (await fa2.tezosApi(tz).at(nftAddress)).withFa2()
    const tokensMeta = await fa2Contract.tokensMetadata(tokenIds)
    return tokensMeta
} 
