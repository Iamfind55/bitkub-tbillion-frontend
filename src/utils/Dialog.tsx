import React, { ReactNode, useEffect, useRef } from "react";
import Button from "./Button";

interface DialogProps {
  isOpen: boolean;
  titleClose: string;
  titleSave: string;
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Dialog = ({ isOpen, onClose, children, className }: DialogProps) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dialogRef.current &&
        !dialogRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen, onClose]);
  if (!isOpen) {
    return null;
  }
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-black opacity-80 fixed inset-0 backdrop-blur-sm"></div>
      <div
        ref={dialogRef}
        className={`bg-white overflow-auto mt-10 text-info p-6 rounded z-50 md:w-2/4 w-2/5 max-h-[85vh] ${className}`}
      >
        {children}
      </div>
    </div>
  );
};

export default Dialog;
