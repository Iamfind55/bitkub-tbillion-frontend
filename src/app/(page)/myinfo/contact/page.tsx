"use client";
import React from "react";

export default function Page() {
  const name = localStorage.getItem("name");
  const accountId = localStorage.getItem("accountId");
  return (
    <div className="bg-warning/5">
      <div className="container px-5 mx-auto min-h-[100vh] pt-[90px] select-none pointer-events-none">
        <h2 className="text-xl text-center font-bold">ติดต่อเรา</h2>
        <div className="flex md:flex-row flex-col gap-10 justify-center items-center w-full mt-10">
          <div className="text-center">
            <img
              src="/images/image_line_contact.jfif"
              className="w-[150px]"
              alt=""
            />
            <div className="pt-3">ไลน์</div>
          </div>
        </div>
      </div>
    </div>
  );
}
