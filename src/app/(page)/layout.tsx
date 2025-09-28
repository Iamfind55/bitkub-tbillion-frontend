import Navbar from "@/components/theme/navbar"; 
import Iconhome from "@/icon/iconhome";
import Iconmoney from "@/icon/iconmoney";
import Iconuser from "@/icon/iconuser"; 
import React from "react";
import Tabmenufooter from "./tabmenufooter";
import Iconcalltime from "@/icon/iconcalltime";
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Navbar />
      {children}
      <div
        className="w-full flex items-center bg-slate-700
       shadow-lg py-1 px-4 sticky bottom-0 left-0 right-0 z-20"
      >
        <div className="w-full md:w-[500px] mx-auto flex justify-between md:gap-5 gap-3 overflow-x-auto overflow-y-hidden">
          <Tabmenufooter title="หน้าแรก" icon={<Iconhome />} link="/" />
          <Tabmenufooter
            title="ซื้อขาย"
            icon={<Iconmoney />}
            link="/trade/BTCUSDT"
          />
          <Tabmenufooter
            title="ติดต่อเรา"
            icon={<Iconcalltime />}
            link="/contact"
          />
          <Tabmenufooter
            title="บัญชีฉัน"
            icon={<Iconuser />}
            link="/myinfo"
          />
        </div>
      </div>
    </div>
  );
}
