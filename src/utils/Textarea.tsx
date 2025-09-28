import React, { TextareaHTMLAttributes } from "react";

export default function Textarea(
  props: TextareaHTMLAttributes<HTMLTextAreaElement>
) {
  return (
    <label className="block select-none" htmlFor={props?.id}>
      <label className="block text-sm font-medium">
        {props?.title}
        {props?.required && <span className="text-pink-500"> *</span>}
      </label>
      <textarea
        id={props?.id}
        className="w-full rounded border border-primary focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary text-base outline-none text-dark py-2 px-3 leading-8 transition-colors duration-200 ease-in-out"
        {...props}
      />
    </label>
  );
}
