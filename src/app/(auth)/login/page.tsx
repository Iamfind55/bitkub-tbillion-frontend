import Iconlock from "@/icon/iconlock";
import Button from "@/utils/Button";
import Textfield from "@/utils/Textfield";
import Link from "next/link";
import React from "react"; // eslint-disable-line no-use-before-define
import FormLogin from "./formlogin";
export default function page() {
  return (
    <div
      className="max-auto min-h-screen bg-center bg-no-repeat bg-cover"
      style={{
        backgroundImage:
          "linear-gradient(45deg, rgba(34,15, 34, 0.50),rgba(29, 26, 2, 0.30),rgba(34, 34, 34, 0.69)), url('images/bg-login.jpg')",
      }}
    >
      <div className="mx-auto">
        <div className="grid grid-cols-12">
          <div className="col-span-12 hidden lg:block md:col-span-12 lg:col-span-6 xl:col-span-7 p-10"></div>
          <div className="col-span-12 md:col-span-12 lg:col-span-6 xl:col-span-5">
            <div className="min-h-screen py-5 bg-gray-800/90 backdrop-blur-sm text-white flex items-center justify-center">
              <div className="flex flex-col gap-6 sm:px-2 px-8 max-w-[500px]  min-w-[350px]">
                <div className="flex justify-center items-center">
                  <Link  href="/">
                  <img src="/images/logo.png" alt="" className="w-20" />
                  </Link>
                </div>
                <div className="text-3xl text-center font-bold">
                  เข้าสู่ระบบ
                </div>
                <FormLogin />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
