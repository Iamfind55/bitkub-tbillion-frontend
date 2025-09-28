"use client";
import Iconbar from "@/icon/iconbar";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";
import Menusidebar from "./menusidebar";
import Menunavbar from "./menunavbar";

type Props = {
  children: React.ReactNode;
};

export default function Layoutbackend({ children }: Props) {
  const [open, setOpen] = React.useState(true);
  const pathname = usePathname();
  return (
    <div className="flex w-full">
      {/* menu sidebar */}
      <div
        className={`${open ? "lg:min-w-[260px] visible" : "lg:min-w-0 invisible"
          } 
             lg:bg-transparent bg-dark/60 backdrop-blur-sm lg:static fixed z-30 min-h-screen 
             min-w-full select-none transition-all duration-200`}
        onClick={() => {
          setOpen(!open);
        }}
      ></div>

      <div
        className={`min-w-[260px] bg-primary shadow min-h-screen transition-all duration-200 fixed z-30 top-0 
            ${open ? "left-0" : "left-[-260px]"}`}
      >
        <div className="h-[100px] flex items-center py-10">
          <Link
            href="/backend"
            className="flex w-full justify-center  overflow-hidden"
          >
            <img
              src="/new-logo/logo.jpeg"
              alt="logo"
              className="w-[60px] h-[60px] rounded-full border-4 shadow border-white/80 rounded-sm"
            />
          </Link>
        </div>

        <Menusidebar />
      </div>

      <div className={`w-full relative`}>
        {/* navbar */}
        <nav className="flex gap-2 shadow h-[60px] bg-warning px-5 sticky top-0 z-20 ">
          <div className="w-full flex justify-between">
            <div className="flex items-center gap-2">
              <Link
                href="#"
                onClick={() => {
                  setOpen(!open);
                }}
                className="text-white hover:text-white/70 text-xl transition-all duration-200 py-[6px] rounded"
              >
                <Iconbar />
              </Link>
            </div>

            {/* menu navbar  */}
            <Menunavbar />
          </div>
        </nav>
        {/* content */}
        <div className="w-full px-1 py-3 overflow-x-hidden text-info">
          {children}
        </div>
      </div>
    </div>
  );
}
