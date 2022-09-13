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