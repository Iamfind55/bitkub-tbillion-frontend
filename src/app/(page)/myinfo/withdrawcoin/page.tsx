"use client";
import Contentheader from "@/utils/ContentHeader";
import React from "react";
import ListWalletCoin from "./ListWalletCoin";
import Link from "next/link";
import Iconadd from "@/icon/iconadd";

export default function page() {
  return (
    <div>
      <div className="container px-5 mx-auto min-h-[calc(100vh-90px)] pt-[80px] rounded">
        <Contentheader title="กระเป๋าเหรียญ" link="/myinfo" /> 
        <div className="mt-5">
          <ListWalletCoin />
        </div>
      </div>
    </div>
  );
}
