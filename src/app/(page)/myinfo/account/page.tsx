import { FormatNumber } from '@/helper/format'
import React from 'react'
import Contentheader from '@/utils/ContentHeader'
import MyInfo from './myInfo'

export default function page() {
    return (
        <div>
            <div className="container px-5 mx-auto pt-[80px]">
                <Contentheader title='My Account' link='/myinfo' />
                <div className="flex flex-row items-center mt-8 justify-center">
                    <div className="w-full md:w-[850px]">
                        <div>
                            <MyInfo />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
