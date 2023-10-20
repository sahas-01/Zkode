import React from 'react'
import Router from 'next/router'

const GoBackbtn = () => {
    return (

        <button
            className="bg-[#0284c7] text-white text-lg px-5 py-2 rounded-xl mt-5"
            onClick={() => Router.back()}
        >
            Go Back
        </button>
    )
}

export default GoBackbtn