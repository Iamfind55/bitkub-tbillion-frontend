import React, { ButtonHTMLAttributes } from 'react'

export default function ButtonTitleUnderIcon(props: ButtonHTMLAttributes<HTMLButtonElement> & { icon: any }) {
    return (
        <div className='flex flex-col gap-2 justify-center items-center'>
            <button {...props}
                className={`flex  items-center justify-center hover:opacity-90 transition duration-300 active:scale-105 text-lg font-bold ${props.className}`}>
                <i> {props.icon}</i>
            </button>
            <span className='text-warning select-none'>{props.title}</span>
        </div>
    )
}
