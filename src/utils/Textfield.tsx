import React, { InputHTMLAttributes } from "react";

export default function Textfield(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="block select-none">
      <label className="block text-sm font-medium" htmlFor={props?.id}>
        {props?.title}{" "}
        {props?.required && <span className="text-pink-500">*</span>}
      </label>
      <input
        type="text"
        id={props?.id}
        className={`rounded w-full border border-primary focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary text-base outline-none text-dark py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
        {...props}
      />
    </div>
  );
}
