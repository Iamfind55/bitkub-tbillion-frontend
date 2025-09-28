"use client"

import Iconbank from "@/icon/iconbank";
import Iconbill from "@/icon/iconbill";
import Iconcardoutline from "@/icon/iconcardoutline";
import Iconchartoutline from "@/icon/iconchartoutline";
import Iconsecurity from "@/icon/iconsecurity";
import Iconworkstory from "@/icon/iconworkstory";
import { useTranslation } from "@/lib/i18n";
import Link from "next/link";
import React from "react";
import { TfiWallet } from "react-icons/tfi";
type Props = {};

export default function page({ }: Props) {
  const { t } = useTranslation();

  const listmyinfo = [
    {
      icon: <Iconbank />,
      title: t("account.bank_account"),
      link: "/myinfo/bank",
    },

    {
      icon: <TfiWallet />,
      title: t("account.coin_deposit"),
      link: "/myinfo/deposit",
    },
    {
      icon: <TfiWallet />,
      title: t("account.coin_withdraw"),
      link: "/myinfo/withdrawcoin",
    },
    {
      icon: <Iconworkstory />,
      title: t("account.coin_transactioncoin"),
      link: "/myinfo/transactioncoin",
    },

    {
      icon: <Iconbill />,
      title: t("account.money_withdraw"),
      link: "/myinfo/withdraw",
    },
    {
      icon: <Iconchartoutline />,
      title: t("account.listtrade"),
      link: "/myinfo/listtrade",
    },
    {
      icon: <Iconworkstory />,
      title: t("account.transaction"),
      link: "/myinfo/transaction",
    },
    {
      icon: <Iconcardoutline />,
      title: t("account.account"),
      link: "/myinfo/account",
    },
    {
      icon: <Iconsecurity />,
      title: t("account.privacy"),
      link: "/myinfo/privacy",
    },
  ];

  return (
    <div>
      <div className="container px-5 mx-auto pt-[120px] pb-5">
        <div className="w-full flex justify-center">
          <div className="w-full flex justify-center md:w-3/4 lg:w-2/3 xl:w-3/6 rounded shadow-lg bg-info">
            <div className="text-bold text-md rounded bg-success px-10 font-bold py-2 inline-block absolute translate-y-[-20px]">
              {t("account.my_info")}
            </div>

            <div className="pt-10 pb-10 px-5 w-full grid grid-cols-12  md:gap-y-10 gap-y-5 text-warning">
              {listmyinfo.map((res, index) => (
                <Link
                  href={res.link}
                  className="md:col-span-4 col-span-6 select-none hover:opacity-80 transition-all duration-150"
                  key={index}
                >
                  <div className="w-full flex flex-col items-center text-center">
                    <div className="md:text-2xl text-xl bg-dark flex justify-center items-center rounded-full md:w-16 md:h-16 w-12 h-12">
                      {res.icon}
                    </div>
                    <span className="text-sm mt-3">{res.title}</span>
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
