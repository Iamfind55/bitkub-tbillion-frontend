
import { getCurrency } from '@/services/services'
import React from 'react'
interface ICurrency {
    pair: string
    symbol: string,
    rate: number,
    fullName: string,
    imageUrl: string
}
export default async function Listcurrency() {
    const { data } = await getCurrency();
    return (
        <div className='grid grid-cols-12 gap-2'>
            {data.map((res:ICurrency, index:number) =>
                <div className="col-span-4" key={index}>
                    <div className="text-lg">{res.fullName}</div>
                    <div className="text-lg">{res.rate}</div>
                </div>
            )}
        </div>
    )
}
