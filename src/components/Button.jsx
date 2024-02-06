import React from 'react'
import { Link } from 'react-router-dom'

function Button({ text, flag, linkPath }) {

    return (
        <Link to={linkPath}>
            <div className={`rounded-full cursor-pointer px-5 py-2 border-2` + (flag ? " border-blue-700 bg-blue-700" : " border-blue-700 bg-white")}>

                <div className={`font-semibold ` + (flag ? "text-white" : "text-blue-700")}>{text}</div>
            </div>
        </Link>
    )
}

export default Button