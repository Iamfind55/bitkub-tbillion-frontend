import Maincontent from '@/utils/maincontent'
import React from 'react' 
import TableCoupon from './TableCoupon'

export default async function page() {
    return (
        <Maincontent>
            <h6 className="font-bold py-3">
                Manage Coupon
            </h6>
            <TableCoupon />
        </Maincontent>
    )
}
