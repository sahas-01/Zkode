// any other web3 ui lib is also acceptable
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { EmbedSDK } from "@pushprotocol/uiembed";
import { useEffect } from "react";

export default function SendNotif() {
  async function getAccount() {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    let account = await signer.getAddress();
    return account;
  }

  useEffect(() => {
    let account = getAccount();
    if (account) {
      // 'your connected wallet address'
      EmbedSDK.init({
        headerText: "PeerTask Notofications", // optional
        targetID: "sdk-trigger-id", // mandatory
        appName: "PeerTask", // mandatory
        user: account, // mandatory
        chainId: 1, // mandatory
        viewOptions: {
          type: "sidebar", // optional [default: 'sidebar', 'modal']
          showUnreadIndicator: false, // optional
          unreadIndicatorColor: "#cc1919",
          unreadIndicatorPosition: "bottom-right",
        },
        theme: "dark",
        onOpen: () => {
          console.log("-> client dApp onOpen callback");
        },
        onClose: () => {
          console.log("-> client dApp onClose callback");
        },
      });
    }

    return () => {
      EmbedSDK.cleanup();
    };
  }, []);

  // send notification
  const sendNotification = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = new ethers.Wallet(
      process.env.NEXT_PUBLIC_PUSH_SECRET_KEY,
      provider
    );
    // get signer from private key

    const apiResponse = await PushAPI.payloads.sendNotification({
      signer,
      type: 4, // broadcast
      identityType: 2, // direct payload
      notification: {
        title: `[SDK-TEST] PeerTask TITLE:`,
        body: `[sdk-test] notification BODY`,
      },
      payload: {
        title: `[sdk-test] pyld title`,
        body: `sample msg body`,
        cta: "",
        img: "",
      },
      recipients: [
        "eip155:5:0x42082772D74F5E48E25f7663D98351C40A9CE9db",
        "eip155:5:0xf5fD28886d2c93Ac1Af588BA5f91f750419f2cD8",
      ], // your channel address
      channel: "eip155:5:0x42082772D74F5E48E25f7663D98351C40A9CE9db", // your channel address
      env: "staging",
    });
    console.log(apiResponse);
  };

  const getNotifications = async () => {
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();

    const notifications = await PushAPI.user.getFeeds({
      user: "eip155:5:" + (await signer.getAddress()), // user address in CAIP
      env: "staging",
    });
    console.log(notifications);
    return notifications;
  };

  return (
    <>
      <div>
        <h1>Send Notif</h1>
        <button onClick={sendNotification}>Send</button>
      </div>
      <div>
        <h1>Get Notif</h1>
        <button onClick={getNotifications}>Get</button>
      </div>
      <button id="sdk-trigger-id">trigger button</button>
    </>
  );
}
