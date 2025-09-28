import React, { ReactNode } from 'react'

function Maincontent({ children }: { children: React.ReactNode }) {
  return (
    <div className='p-1'>
      <div className="bg-white lg:px-5 lg:py-5 md:p-5 p-1 rounded min-h-[calc(100vh-90px)] relative">
      <div className='grid grid-cols-1 overflow-hidden'>
        {children}
      </div>
    </div>
    </div>
  );
}

export default Maincontent