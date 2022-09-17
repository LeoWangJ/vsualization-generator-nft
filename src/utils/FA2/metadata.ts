import { validateTzip16, validateTzip21 } from '@oxheadalpha/fa2-interfaces'
import { TezosToolkit } from '@taquito/taquito'
import type { CollectionMeta, CreateNFTMeta, NFTMeta } from './type'
import * as fa2 from '@oxheadalpha/fa2-interfaces'



export const createCollectionMeta = ({ name, description, author = '', version = '1.0.0', licenseName = 'MIT' }: CollectionMeta) => {
    const meta = {
        name,
        description,
        homepage:'https://github.com/LeoWangJ/vsualization-generator-nft',
        authors: author ? [author]: [],
        version,
        license: { name: licenseName },
        interfaces: ['TZIP-016', 'TZIP-012', 'TZIP-021'],
        source: {
            tools: ['LIGO'],
            location: 'https://github.com/LeoWangJ/vsualization-generator-nft'
        }
    }
    return meta
}

export const validateCollectionMeta = (meta: NFTMeta) => {
    return validateTzip16(meta)
}

export const createNFTMeta = ({ name, description = '', tags = [], minterAddress, artifactUri }: CreateNFTMeta): NFTMeta => {
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

export const validateNFTMeta = (meta: NFTMeta) => {
    return validateTzip21(meta)
}

export const showNFTMetadata = async (tz: TezosToolkit, nftAddress: string, tokens: string[]) => {
    const tokenIds = tokens.map(t => Number.parseInt(t))
    const fa2Contract = (await fa2.tezosApi(tz).at(nftAddress)).withFa2()
    const tokensMeta = await fa2Contract.tokensMetadata(tokenIds)
    return tokensMeta
} 
