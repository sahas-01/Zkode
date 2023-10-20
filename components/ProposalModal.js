import { useState } from 'react'
import { useRouter } from 'next/router'
import Web3Modal from "web3modal";
import { contractAddress } from "../../blockchain/config";
import JobPortal from "../../blockchain/artifacts/contracts/JobPortal.sol/JobPortal.json";
import { ethers } from "ethers";
import { uploadToIPFS, client } from '../utils/ipfs'
import sendNotif from '../utils/notifications';
import Router from 'next/router';



export default function ProposalModal({ setModal }) {

    const [proposal, setProposal] = useState({
        bid: 0,
        motivation: '',
        proposalDetails: '',
        duration: 0,
    });

    // get projectId and taskId from url
    const { asPath } = useRouter()
    let projectId = asPath.split('/')[3];
    console.log(projectId);
    let taskId = asPath.split('/')[4];
    console.log(taskId);

    // submit proposal
    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(proposal);
        proposal.bid = ethers.utils.parseEther(proposal.bid.toString());
        const web3Modal = new Web3Modal();
        const connection = await web3Modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const jobPortal = new ethers.Contract(contractAddress, JobPortal.abi, signer);
        const uri = await uploadToIPFS(proposal);
        console.log(uri);
        const tx = await jobPortal.sendProposal(projectId, taskId, proposal.bid, proposal.motivation, uri);
        await tx.wait();

        // send notification to the user
        await sendNotif([await signer.getAddress()], `Proposal for task ${taskId} is submitted!`, `Proposal for task ${taskId} is submitted!`)

        // send notification to the manager
        // get project details
        const project = await jobPortal.projects(projectId);
        console.log("ProjectManager: ", project.projectManager)
        await sendNotif([project.projectManager], `Proposal for task ${taskId} is submitted by user!`, `Please review the proposal for task ${taskId}.`)

        Router.push(`/viewproject/viewtask/${projectId}/${taskId}`);
    };

    return (
        <div className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none backdrop-filter backdrop-blur-sm ">
            <div className="relative w-auto my-6 mx-auto">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-[48rem] bg-[#1a1e27] outline-none focus:outline-none ">
                    <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                        <h3 className="text-3xl font-semibold text-white">Submit Proposal</h3>
                        <button
                            className="bg-transparent border-0 text-black float-right"
                            onClick={() => setModal(false)}
                        >
                            <span className="text-black opacity-7 h-8 w-8 text-xl block bg-gray-400 py-0 rounded-full">
                                x
                            </span>
                        </button>
                    </div>
                    <div className="relative p-3 flex-auto">
                        <form className="bg-transparent shadow-md rounded px-8 pt-3 pb-8 w-full">
                            <label className="block text-white text-sm font-semibold mb-1">
                                Motivation*
                            </label>
                            <textarea type="text" className="shadow appearance-none border rounded w-full text-white block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none transition transform duration-100 ease-out resize-none "
                                required
                                onChange={(e) => setProposal({ ...proposal, motivation: e.target.value })}
                            />

                            <label className="block text-white text-sm font-semibold mb-1">
                                Bid(ETH)*
                            </label>
                            <input type="number" className="shadow appearance-none border rounded w-full text-white block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none transition transform duration-100 ease-out"
                                onChange={(e) => setProposal({ ...proposal, bid: e.target.value })}
                                required
                                min={0}
                                max={100}
                            />
                            <label className="block text-white text-sm font-semibold mb-1">
                                Duration(days)*
                            </label>
                            <input type="number" className="shadow appearance-none border rounded w-full text-white block h-10 bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-5 mt-2 mb-2 mr-10 text-sm w-full focus:outline-none transition transform duration-100 ease-out"
                                onChange={(e) => setProposal({ ...proposal, duration: e.target.value })}
                                required
                                min={0}
                                max={10}
                            />
                            <label className="block text-white text-sm font-semibold">
                                Proposal*
                            </label>
                            <textarea
                                onChange={(e) => setProposal({ ...proposal, proposalDetails: e.target.value })}
                                type="text"
                                id="description" className='shadow appearance-none border rounded w-full text-white block h-fit bg-[#ffffff12] text-white rounded-lg px-2 border border-slate-600 py-2 mt-3 mb-2 mr-10 text-sm w-full focus:outline-none transition transform duration-100 ease-out resize-none' required />
                        </form>
                    </div>

                    <button
                        className="text-white bg-sky-700 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Save
                    </button>

                </div>
            </div>
        </div>
    )
}
