import pinataSDK from '@pinata/sdk'
import type { PinIPFS } from './type';


export async function pinFile({ apiKey, secretKey, name, metadata }: PinIPFS): Promise<string> {
    const pinataClient = pinataSDK(apiKey, secretKey)
    const response = await pinataClient.pinJSONToIPFS(metadata, {
        pinataMetadata: { name }
    })
    return response.IpfsHash
}