
import React from 'react'
import { Link } from 'react-router-dom'

export default function BottomWarning({ label, buttontext, to }) {
    return (
        <div className='py-2 flex justify-center'>
            <div>
                {label}
            </div>
            <Link className='ml-1 underline pointer cursor-pointer' to={to}>
                {buttontext}
            </Link>

        </div>
    )
}
