import { TezosToolkit } from "@taquito/taquito"
import * as fa2 from '@oxheadalpha/fa2-interfaces'

export interface CollectionMeta {
    name: string
    description: string
    homepage: string
    authors: string[]
    version: string
    licenseName: string
    interfaces: string[]
    source: {
        tools: string[]
        location: string
    }
}

export interface NFTMeta {
    name: string
    description: string
    tags: string[]
    minterAddress: string
    artifactUri: string
}

export interface PinIPFS {
    apiKey: string,
    secretKey: string,
    name: string,
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