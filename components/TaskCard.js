import Link from 'next/link';
import React from 'react'

const TaskCard = ({
    task,
    id,
}) => {
    console.log(task);
    // go to the uri of each task and fetch the details
    // task.uri = JSON.parse(task.uri);
    // console.log(task.uri);
    return (


        <tbody className="divide-y divide-gray-200 text-white">
            <tr>
                <td className="px-6 py-4 text-sm font-medium  whitespace-nowrap">
                    {
                        task.Id
                    }
                </td>
                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                    {
                        task.taskName
                    }
                </td>
                <td className="px-6 py-4 text-sm  whitespace-nowrap">
                    {
                        task.proposalCount
                    }
                </td>
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    {
                        task.taskDuration
                    }
                    &nbsp;Days
                </td>
                {task.isReviewed ? (
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <span className='
                                text-sm
                                md:ml-3
                                bg-orange-900
                                rounded-xl
                                px-2
                                py-1
                                text-white
                                font-semibold
                            '
                        >
                            Reviewed
                        </span>
                    </td>
                ) : (task.isComplete ? (
                    <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <span className='
                                text-sm
                                md:ml-3
                                bg-green-900
                                rounded-xl
                                px-2
                                py-1
                                text-white
                                font-semibold
                            '
                        >
                            Completed
                        </span>
                    </td>
                ) :
                    (task.onGoing ? (
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <span
                                className='
                                text-sm
                                md:ml-3
                                bg-yellow-700
                                rounded-xl
                                px-2
                                py-1
                                text-white
                                font-semibold
                            '
                            >
                                OnGoing
                            </span>
                        </td>
                    ) : (task.isAvailable ? (
                        <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                            <span
                                className='
                                text-sm
                                md:ml-3
                                bg-green-700
                                rounded-xl
                                px-2
                                py-1
                                text-white
                                font-semibold
                            '
                            >
                                Available
                            </span>
                        </td>
                    ) : (<td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <span
                            className='
                        text-sm
                        md:ml-3
                        bg-yellow-700
                        rounded-xl
                        px-2
                        py-1
                        text-white
                        font-semibold
                    '
                        >
                            Waiting
                        </span>
                    </td>
                    )
                    )
                    )
                )}
                <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                    <Link href={`viewtask/${id}/${task.Id}`}>
                        <button
                            className='
                        bg-[#0284c7]
                        text-white
                        font-semibold
                        rounded-xl
                        px-4
                        py-2
                        hover:bg-[#0284c7]
                        hover:text-white
                        hover:font-semibold
                        hover:rounded-xl
                        hover:px-4
                        hover:py-2
                        '
                        >
                            View more
                        </button>
                    </Link>
                </td>
            </tr>
        </tbody>
    )
}

export default TaskCard