"use client"
import Contentheader from '@/utils/ContentHeader'
import React from 'react'
import TableTransaction from './TableTransaction'
import { useTranslation } from '@/lib/i18n'

export default function page() {
    const { t } = useTranslation()
    return (
        <div>
            <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
                <Contentheader title={t("hero.transationTitle")} link='/myinfo' />
                <TableTransaction />
            </div>
        </div>
    )
}
