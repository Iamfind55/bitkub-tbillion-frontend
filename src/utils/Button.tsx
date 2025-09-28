import React, { ButtonHTMLAttributes } from 'react'

export default function Button(props: ButtonHTMLAttributes<HTMLButtonElement>) {
  
    return (
        <button {...props}  className={`rounded-fixed select-none flex items-center justify-center hover:opacity-80  transition duration-300 lg:text-md text-sm font-bold active:scale-105
         ${props.className} px-5 py-2`} >{props.title}</button>
    )
}
