import Iconadd from '@/icon/iconadd'
import Iconbill from '@/icon/iconbill' 
import Iconcardoutline from '@/icon/iconcardoutline'
import Iconchartoutline from '@/icon/iconchartoutline'
import Iconemail from '@/icon/iconemail'
import Iconuseroutline from '@/icon/iconuseroutline'
import ButtonTitleUnderIcon from '@/utils/ButtonTitleUnderIcon'
import Link from 'next/link'
import React from 'react'

export default function Tabmenu() {
    return (
        <div className="grid grid-cols-3"> 
            <Link href="/myinfo" className="col-span-1 flex justify-center">
                <ButtonTitleUnderIcon title='INFO'  icon={<Iconuseroutline />} className='p-2 rounded-full text-warning text-md bg-info' />
            </Link>
            <Link href="/myinfo/contact" className="col-span-1 flex justify-center">
                <ButtonTitleUnderIcon title='TOPUP' icon={<Iconemail />} className='p-2 rounded-full text-warning text-md bg-info' />
            </Link>
            <Link href="/myinfo/listtrade" className="col-span-1 flex justify-center">
                <ButtonTitleUnderIcon title='TRADING' icon={<Iconchartoutline />} className='p-2 rounded-full text-warning text-md bg-info' />
            </Link>
        </div>
    )
}
