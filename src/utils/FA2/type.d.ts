import { TezosToolkit } from "@taquito/taquito"
import * as fa2 from '@oxheadalpha/fa2-interfaces'

export interface CollectionMeta {
    name: string
    description: string
    homepage?: string
    authors?: string[]
    version: string
    licenseName?: string
    author?: string
    license?: { name: string },
    interfaces?: string[]
    source?: {
        tools: string[]
        location: string
    }
}

export interface CreateNFTMeta {
    name: string
    description: string
    tags?: string[]
    minterAddress: string
    artifactUri: string
}

export interface NFTMeta {
    decimals: number
    isBooleanAmount: boolean
    name: string
    description: string
    tags: string[]
    minter: string
    artifactUri: string
    displayUri: string
    thumbnailUri: string
    creators: string[]
    rights: string
    attributes: { name: string, value: string }[]
}

export interface PinIPFS {
    apiKey: string
    secretKey: string
    name: string
    metadata: NFTMeta
}

export interface Token {
    tokenId: number
    metadataUri: string
}
export interface MintNFT {
    wallet: TezosToolkit
    address: string
    collectionAddress: string
    tokens: Token[]
}


export interface Balance {
    owner: string
    tokenId: number
    balance: number
}

export interface ShowBalance {
    tz: TezosToolkit
    ownerAddress: string
    nftAddress: string
    tokens: string[]
}


export interface NftCollection{
    tokenId:number
    image:string
    metadataUri:string
    minted: boolean
  }
  
export interface NftCollectionLocal {
    [key?:string]:NftCollection[]
  }