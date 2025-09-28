import React, { InputHTMLAttributes } from "react";
import { NumericFormat } from "react-number-format";

export default function Numberfield(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  return (
    <div className="block select-none">
      <label className="block text-sm font-medium" htmlFor={props?.id}>
        {props?.title}{" "}
        {props?.required && <span className="text-pink-500">*</span>}
      </label>
      <NumericFormat
        onChange={props?.onChange}
        name={props?.name}
        placeholder={props?.placeholder}
        id={props?.id}
        required={props.required}
        value={Number(props?.value)}
        className={`rounded w-full border border-primary focus:border-primary focus:bg-white focus:ring-1 focus:ring-primary text-base outline-none text-dark py-1 px-3 leading-8 transition-colors duration-200 ease-in-out`}
        allowLeadingZeros
        thousandSeparator=","
      />
    </div>
  );
}
