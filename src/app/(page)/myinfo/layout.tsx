import HandleMiddleware from '@/middleware/handlemiddleware'
import React from 'react'
export default async function layout({ children }: { children: React.ReactNode }) {
    await HandleMiddleware(['customer']);
    return (
        <>
            {children}
        </>
    )
}
