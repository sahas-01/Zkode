import { SpheronClient, ProtocolEnum } from "@spheron/storage";
import { upload } from "@spheron/browser-upload";

export async function spheronUpload(bucketName: string, files: any) {
	const protocol = ProtocolEnum.IPFS; // desired protocol
	const token =
		"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhcGlLZXkiOiIxMzQ3ZjA5N2M1MDQ0ZTEwYzM5OTBiNGY1MmFiZDQ2YzUwNThlY2NjYTBkODMyMTEzNGZlODJhMzExMzZlYjM0MTU5ZTc5ZDc1NzQyYWRiYjU5ZjZhMjNkMDJjN2UwMDQ1ZmRiYzhkOWE1MjUxYTkxZGEyODE5NWJkZTAxZmFjZiIsImlhdCI6MTY5NzgzNzk0NywiaXNzIjoid3d3LnNwaGVyb24ubmV0d29yayJ9.LOVrRVp6XvpQFhwWa5LqLRIg7-lAAfBTEVia8ZUaDUc";

	// Create a new SpheronClient instance with the access token
	const client = new SpheronClient({ token });

	// Generate the uploadToken using createSingleUploadToken method
	const { uploadToken } = await client.createSingleUploadToken({
		name: bucketName,
		protocol,
	});

	console.log("uploadToken: ", uploadToken);

	const uploadResponse = await upload([files], { token: uploadToken });

	console.log(uploadResponse);
	return uploadResponse;
}
