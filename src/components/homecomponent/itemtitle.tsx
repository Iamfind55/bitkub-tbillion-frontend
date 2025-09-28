import { FormatNumber } from '@/helper/format'
import React from 'react'

type Props = {
    image: string,
    title: string,
    sutitle: string
    amount: number
}

export default function Itemtitle(Props: Props) {
    return (
        <div className="flex flex-cols lg:gap-20 md:gap-10 gap-5 items-center justify-center">
            <div className='flex gap-2 items-center'>
                <img src={`/images/logo/${Props.image}`} alt="" className='w-8 h-8' />
                <p>{Props.title}</p>
            </div>
            <span className='text-md text-warning font-bold'>${FormatNumber(Props.amount)}</span>
        </div>
    )
}