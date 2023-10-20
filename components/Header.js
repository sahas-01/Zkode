import React from 'react'
import Image from 'next/image'
import Router from 'next/router';
import Link from 'next/link';
function Header() {
    return (
        <>
            <header className="top-0 z-50 grid grid-cols-2 bg-black drop-shadow-md p-5 md:px-10">
                {/* left */}
                <Link href="/home">
                    < div className="relative flex items-center h-15 cursor-pointer my-auto" >
                        <h1 className="text-3xl font-bold text-white">Kaamify</h1>
                    </div >
                </Link>
                {/* right */}
                < div className="flex space-x-4 items-center justify-end text-gray-500" >
                    <button
                        onClick={() => Router.push('/createproject')}
                        className="hidden md:inline-flex bg-[#0284c7] text-white text-lg px-5 py-2 rounded-xl">Create Project</button>
                    <button className="hidden md:inline-flex bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl">Connect wallet</button>
                    <button
                        onClick={() => Router.push('/myprojects')}
                        className="hidden md:flex items-center bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl">
                        My Projects
                    </button>
                    <button
                        onClick={() => Router.push('/notifications')}
                        className="hidden md:flex items-center bg-transparent text-white text-lg px-5 py-2 border border-white-500 rounded-xl"
                    >
                        <Image src="/bell.png" width={25} height={100} alt="Notifications" />
                    </button>

                </div >
            </header >
        </>
    )
}

export default Header