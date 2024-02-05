import React from 'react'

export default function Appbar({ label1, label2, avatar }) {
    return (
        <div className='shadow flex flex-row justify-between px-10'>
            <div className='flex flex-col justify-center font-semibold font-sans'>
                MoneyTransfer
            </div>
            <div className='flex '>
                <div className='flex flex-col justify-center mr-4'>
                    Hello
                </div>
                <div className='bg-slate-300 rounded-full h-12 w-12 text-center flex justify-center'>
                    <div className='flex flex-col justify-center '>
                        😎
                    </div>

                </div>
            </div>
        </div>
    )
}
