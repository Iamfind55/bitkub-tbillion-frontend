import Maincontent from '@/utils/maincontent'
import React from 'react'
import MainPrivacy from './main'

export default function page() {
  return (
    <div className="container mx-auto mt-20">
      <h2 className="text-3xl font-bold text-warning text-center">
        การยืนยันตัวตน
      </h2>
      <MainPrivacy />
    </div>
  );
}
