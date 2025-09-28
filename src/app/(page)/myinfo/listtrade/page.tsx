"use client"
import Contentheader from '@/utils/ContentHeader'
import React from 'react'
import TableListTrade from './TableListTrade'
import { useTranslation } from '@/lib/i18n'

export default function page() {
    const {t}=useTranslation()
    return (
        <div>
            <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
                <Contentheader title={t("hero.trandTitle")} link='/myinfo' />
                {/* <div className='mx-auto lg:w-[800px] md:w-[600px] sm:w-[400px] w-full'> */}
                    <TableListTrade />
                {/* </div> */}
            </div>
        </div>
    )
}
