// any other web3 ui lib is also acceptable
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";

function correctAddress(address) {
    address.map((a) => {
        a = 'eip155:5:' + a;
    })
    return address;
}


export default async function sendNotif(recipients, title, body) {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = new ethers.Wallet(process.env.NEXT_PUBLIC_PUSH_SECRET_KEY, provider);
    let apiResponse;

    recipients = correctAddress(recipients);

    console.log(recipients)

    let date = new Date();
    console.log('sending notification')
    apiResponse = await PushAPI.payloads.sendNotification({
        signer,
        type: 3, // subset
        // type: 1,  //broadcast
        identityType: 2, // direct payload
        notification: {
            title: title,
            body: body
        },
        payload: {
            title: title,
            body: body,
            // show timestamp in notification
            cta: date.toGMTString(),
            img: ''
        },
        recipients: recipients[0],
        channel: 'eip155:5:0x42082772D74F5E48E25f7663D98351C40A9CE9db', // your channel address
        env: 'staging'
    });

    console.log(apiResponse);
    return apiResponse;
}
