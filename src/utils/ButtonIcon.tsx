import React, { ButtonHTMLAttributes } from 'react'

export default function ButtonIcon(props: ButtonHTMLAttributes<HTMLButtonElement> & { icon: any }) {
    return (
        <button {...props}
            className={`flex items-center justify-center hover:opacity-90 transition duration-300 active:scale-105 text-lg font-bold ${props.className} py-2 px-4`}>
            <i> {props.icon}</i> {props.title}
        </button>
    )
}
