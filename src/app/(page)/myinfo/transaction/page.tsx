import Contentheader from '@/utils/ContentHeader'
import React from 'react'
import TableTransaction from './TableTransaction'

export default function page() {
    return (
        <div>
            <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
                <Contentheader title='การทำธุรกรรม' link='/myinfo' /> 
                 <TableTransaction/> 
            </div>
        </div>
    )
}
