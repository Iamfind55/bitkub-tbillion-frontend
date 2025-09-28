import Iconbank from "@/icon/iconbank";
import Iconbill from "@/icon/iconbill";
import Iconbilloutline from "@/icon/iconbilloutline";
import Iconcall from "@/icon/iconcall";
import Iconcalltime from "@/icon/iconcalltime";
import Iconcardoutline from "@/icon/iconcardoutline";
import Iconchartoutline from "@/icon/iconchartoutline";
import Icondeposit from "@/icon/icondeposit";
import Iconhistory from "@/icon/iconhistory";
import Iconreturn from "@/icon/iconreturn";
import Iconsecurity from "@/icon/iconsecurity";
import Icontopup from "@/icon/icontopup";
import Iconworkstory from "@/icon/iconworkstory";
import Link from "next/link";
import React from "react";
import { TfiWallet } from "react-icons/tfi";
type Props = {};

export default function page({}: Props) {
  const listmyinfo = [
    {
      icon: <Iconbank />,
      title: "บัญชีธนาคาร",
      link: "/myinfo/bank",
    },
    
    {
      icon: <TfiWallet />,
      title: "ฝากเหรียญ",
      link: "/myinfo/deposit",
    },
    {
      icon: <TfiWallet />,
      title: "ถอนเหรียญ",
      link: "/myinfo/withdrawcoin",
    },
    {
      icon: <Iconworkstory />,
      title: "ธุรกรรมเหรียญ",
      link: "/myinfo/transactioncoin",
    },
  
    {
      icon: <Iconbill />,
      title: "ถอนเงิน",
      link: "/myinfo/withdraw",
    },
    {
      icon: <Iconchartoutline />,
      title: "รายการซื้อขาย",
      link: "/myinfo/listtrade",
    },
    {
      icon: <Iconworkstory />,
      title: "ธุรกรรม",
      link: "/myinfo/transaction",
    },
    // {
    //   icon: <Iconcalltime />,
    //   title: "ติดต่อ",
    //   link: "/myinfo/contact",
    // },
    {
      icon: <Iconcardoutline />,
      title: "บัญชีของฉัน",
      link: "/myinfo/account",
    },
    {
      icon: <Iconsecurity />,
      title: "ยืนยันตัวตน",
      link: "/myinfo/privacy",
    },
  ];
  return (
    <div>
      <div className="container px-5 mx-auto pt-[120px] pb-5">
        <div className="w-full flex justify-center">
          <div className="w-full flex justify-center md:w-3/4 lg:w-2/3 xl:w-3/6 rounded shadow-lg bg-info">
            <div className="text-bold text-2xl rounded bg-success px-10 font-bold py-2 inline-block absolute translate-y-[-20px]">
              ข้อมูลของฉัน
            </div>

            <div className="pt-10 pb-10 px-5 w-full grid grid-cols-12  md:gap-y-10 gap-y-5 text-warning">
              {listmyinfo.map((res, index) => (
                <Link
                  href={res.link}
                  className="md:col-span-4 col-span-6 select-none hover:opacity-80 transition-all duration-150"
                  key={index}
                >
                  <div className="w-full flex flex-col items-center text-center">
                    <div className="md:text-3xl text-2xl bg-dark flex justify-center items-center rounded-full md:w-20 md:h-20 w-16 h-16">
                      {res.icon}
                    </div>
                    <span className="mt-3">{res.title}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
