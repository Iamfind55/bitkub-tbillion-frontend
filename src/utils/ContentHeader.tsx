import Iconback from '@/icon/iconback'
import Icongoback from '@/icon/icongoback'
import Link from 'next/link'
import React from 'react'
type Props = {
    title: string,
    icon?: any,
    link: string 
}
function Contentheader({ title, icon, link }: Props) {
    return (
        <div className='flex gap-2 items-center bg-info p-2 rounded'>
            <Link href={link}  className='hover:opacity-90 transition-all duration-300 p-2 rounded'>{icon ? icon : <Icongoback />}</Link>
            <div className='text-xl font-bold select-none'>{title}</div>
        </div>
    )
}

export default Contentheader