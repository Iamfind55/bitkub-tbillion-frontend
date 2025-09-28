"use client";
import Iconeye from "@/icon/iconeye";
import Iconeyeof from "@/icon/iconeyeof";
import React, { InputHTMLAttributes, useState } from "react";

export default function Password(props: InputHTMLAttributes<HTMLInputElement>) {
  const [ispassword, setIspassword] = useState(true);
  return (
    <div className="block select-none ">
      <label className="block text-sm font-medium" htmlFor={props?.id}>
        {props?.title}{" "}
        {props?.required && <span className="text-pink-500">*</span>}
      </label>
      <div className="flex items-center relative ">
        <input
          id={props?.id}
          type={ispassword ? "password" : "text"}
          className={`rounded w-full border pr-[50px] border-primary   focus:border-primary  focus:bg-white focus:ring-1 focus:ring-primary   text-base outline-none text-dark py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
          {...props}
        />
        <button
          type="button"
          className="absolute z-30 right-0 w-[40px] text-info"
          onClick={() => setIspassword((res) => !res)}
        >
          {ispassword ? <Iconeye /> : <Iconeyeof />}
        </button>
      </div>
    </div>
  );
}
