import Contentheader from '@/utils/ContentHeader'
import React from 'react'
import TableListTrade from './TableListTrade'

export default function page() {
    return (
        <div>
            <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
                <Contentheader title='รายการการค้า' link='/myinfo' />
                {/* <div className='mx-auto lg:w-[800px] md:w-[600px] sm:w-[400px] w-full'> */}
                    <TableListTrade />
                {/* </div> */}
            </div>
        </div>
    )
}
