import { Chat } from '@pushprotocol/uiweb';

export default function MyChat({ account, supportAddress }) {
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
        <Chat
            account={account}
            supportAddress={supportAddress}
            apiKey={process.env.NEXT_PUBLIC_PUSH_CHAT_API_KEY}
            // apiKey='tAWEnggQ9Z.UaDBNjrvlJZx3giBTIQDcT8bKQo1O1518uF1Tea7rPwfzXv2ouV5rX9ViwgJUrXm'
            env='staging'
            theme={theme}
        />
    );
};