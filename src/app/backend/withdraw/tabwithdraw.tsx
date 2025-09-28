"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

export default function Tabwithdraw() {
  const params = usePathname();
  return (
    <div className="pt-5 mb-3 flex">
      <Link
        href="/backend/withdraw/pending"
        className={`lg:px-5 lg:py-2 px-2 py-1  text-white font-bold hover:opacity-80 
         ${params == "/backend/withdraw/pending" ? "bg-info" : "bg-warning"}`}
      >
        Pending
      </Link>
      <Link
        href="/backend/withdraw"
        className={`lg:px-5 lg:py-2 px-2 py-1  text-white font-bold hover:opacity-80 
         ${params == "/backend/withdraw" ? "bg-info" : "bg-warning"}`}
      >
        All
      </Link>
    </div>
  );
}
