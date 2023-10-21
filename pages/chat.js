import { useState, useEffect } from 'react';
import { Chat, ITheme } from '@pushprotocol/uiweb';
import Web3Modal from "web3modal";
import { ethers } from "ethers";

export default function MyChat() {

    // Request method to authorize user

    const [account, setAccount] = useState("");
    const [supportAddress, setSupportAddress] = useState("");

    function handleInputChange(event) {
        const { name, value } = event.target;
        setSupportAddress(value);
    }

    async function getAccount() {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        let account = await signer.getAddress();
        setAccount(account);
    }

    useEffect(() => {
        getAccount();
    }, [])


    const theme = {
        bgColorPrimary: 'gray',
        bgColorSecondary: 'purple',
        textColorPrimary: 'white',
        textColorSecondary: 'green',
        btnColorPrimary: 'red',
        btnColorSecondary: 'purple',
        border: '1px solid black',
        borderRadius: '40px',
        moduleColor: 'pink',
    };
    return (
        <>
            From : {account}

            <input type="text" name="supportAddress" value={supportAddress} onChange={handleInputChange} />
            <Chat
                account={account}
                supportAddress={supportAddress}
                apiKey={process.env.NEXT_PUBLIC_PUSH_CHAT_API_KEY}
                // apiKey='tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm'
                env='staging'
                theme={theme}
            />
        </>
    );
};