import { create as ipfsClient } from "ipfs-http-client";

const projectId = process.env.NEXT_PUBLIC_INFURA_PROJECT_ID
const projectSecret = process.env.NEXT_PUBLIC_INFURA_PROJECT_SECRET
const auth = 'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

export const client = ipfsClient({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    apiPath: '/api/v0',
    headers: {
        authorization: auth
    }
})

export async function uploadToIPFS(Jdata) {
    const data = JSON.stringify(Jdata)
    const added = await client.add(data)
    const url = `https://unfold23.infura-ipfs.io/ipfs/${added.path}`;
    /* after file is uploaded to IPFS, return the URL to use it in the transaction */
    return url;
}