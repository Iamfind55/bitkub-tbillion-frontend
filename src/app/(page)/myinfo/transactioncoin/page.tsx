"use client";
import Contentheader from "@/utils/ContentHeader";
import React from "react";
import ListCoin from "./ListCoin";
import Link from "next/link";
import Iconadd from "@/icon/iconadd";
import { useTranslation } from "@/lib/i18n";

export default function page() {
  const { t } = useTranslation();

  return (
    <div>
      <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
        <Contentheader title={t("coin_transaction_title")} link="/myinfo" />
        <div className="w-full flex justify-center my-3">
          <Link href="deposit" className="flex gap-2 bg-success py-2 px-5 rounded"><Iconadd />{t("account.coin_deposit")}</Link>
        </div>
        <div className="mt-5">
          <ListCoin />
        </div>
      </div>
    </div>
  );
}
