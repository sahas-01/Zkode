import { SpheronClient, ProtocolEnum } from "@spheron/storage";


export default async function handler(req, res) {
    try {
        const bucketName = "example-browser-upload";
        const protocol = ProtocolEnum.IPFS; // desired protocol
        const token = process.env.NEXT_PUBLIC_SPHERON_TOKEN; 
    
        // Create a new SpheronClient instance with the access token
        const client = new SpheronClient({ token });
    
        // Generate the uploadToken using createSingleUploadToken method
        const { uploadToken } = await client.createSingleUploadToken({
          name: bucketName,
          protocol,
        });
    
        // Respond with the uploadToken in JSON format
        res.status(200).json({
          uploadToken,
        });
      } catch (error) {
        console.error(error); // Handle any errors that may occur
        next(error);
      }
}