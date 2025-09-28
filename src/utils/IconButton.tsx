import React, { ButtonHTMLAttributes } from "react";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
}

const IconButton: React.FC<IconButtonProps> = ({
  icon,
  className,
  ...props
}) => {
  return (
    <button
      {...props}
      className={`rounded-fixed flex items-center justify-center rounded-lg bg-info text-gray-50  hover:opacity-80 transition duration-300 px-[16px] py-2 lg:text-md text-sm font-bold active:scale-105 ${className}`}
    >
      {icon}
    </button>
  );
};

export default IconButton;
