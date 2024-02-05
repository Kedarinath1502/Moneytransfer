import React from 'react'

export default function Balance({ value }) {
    return (
        <div className='shadow mt-4 '>
            <div className='ml-14 font-sans font-bold'>
                Your balance :   {value}
            </div>
        </div>
    )
}
