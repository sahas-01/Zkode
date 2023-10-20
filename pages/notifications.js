import Web3Modal from "web3modal";
import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { useEffect, useState } from "react";
import Header from "../components/Header";

export default function Notifications() {

    const [notifs, setNotifs] = useState([]);


    const getNotifications = async () => {
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();

        const notifications = await PushAPI.user.getFeeds({
            user: 'eip155:5:' + await signer.getAddress(), // user address in CAIP
            env: 'staging'
        });
        console.log(notifications);
        setNotifs(notifications);
    }

    useEffect(() => {
        getNotifications();
        console.log(notifs)
    }, []);

    return (
        <>
            <Header />
            <section className="bg-black text-white pb-10 px-10">
                <div className="max-w-5xl mx-auto">
                    <h1 className="text-2xl font-semibold my-10 md:ml-5">Notifications</h1>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {/* If notif is empty display */}
                        {notifs.length === 0 && (
                            <div className="bg-gray-800 rounded-lg p-4">
                                <h1 className="text-xl font-semibold">No notifications</h1>
                                <p className="text-sm">You haven&apos;t received any notifications yet.</p>
                            </div>
                        )}
                        {notifs && notifs.map((n, i) => (
                            // Add UI for notifications
                            <div className="bg-gray-800 rounded-lg p-4" key={i}>
                                <h1 className="text-xl font-semibold">
                                    {
                                    // If n.title has the word "PeerTask" in it, then display "Kaamify" in place of "Peertask" else display ""
                                    n.title.includes("PeerTask") ? n.title.replace("PeerTask", "Kaamify") : n.title
                                    }
                                </h1>
                                <p className="text-sm">{n.message}</p>
                                {/* Show Timestamp in Left corner bottom */}
                                <p className="text-xs">{n.cta}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}

