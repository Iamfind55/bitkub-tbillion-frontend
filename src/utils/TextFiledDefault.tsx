import React, { InputHTMLAttributes } from "react";

export default function TextfieldDefault(
  props: InputHTMLAttributes<HTMLInputElement>
) {
  const { title, required, type, ...rest } = props;
  
  const renderInput = () => {
    switch (type) {
      case "checkbox":
        return (
          <input
            type="checkbox"
            id={props?.id}
            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            {...rest}
          />
        );
      case "radio":
        return <input id={props?.id} type="radio" {...rest} />;

      default:
        return (
          <input
            id={props?.id}
            type={type === "password" ? "password" : "text" || "text"}
            className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-500 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-200`}
            {...rest}
          />
        );
    }
  };
  return (
    <div className="block">
      <label htmlFor={props?.id} className="block text-sm font-medium">
        {title && title}
        {required && <span className="text-pink-500">*</span>}
      </label>
      {renderInput()}
    </div>
  );
}
