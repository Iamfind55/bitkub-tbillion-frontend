"use client"

import Contentheader from '@/utils/ContentHeader'
import React from 'react'
import TableWithdraw from './TableWithdraw'
import { useTranslation } from '@/lib/i18n';

export default function page() {
    const { t } = useTranslation();
    return (
        <div>
            <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
                <Contentheader title={t("withdraw.title")} link='/myinfo' />
                <TableWithdraw />
            </div>
        </div>
    )
}
