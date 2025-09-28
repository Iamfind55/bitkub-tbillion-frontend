import React, { ReactNode, useEffect, useRef } from "react";
import Button from "./Button";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
}

const DeleteDialog: React.FC<DialogProps> = ({
  isOpen,
  onConfirm,
  onClose,
  title,
}) => {
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
      <div className="bg-black opacity-50 fixed inset-0"></div>
      <div ref={dialogRef} className="bg-white text-info p-6 rounded z-10">
        <p className="font-bold text-lg mt-5">
          {title ? "Are you sure you want to delete?" : title}
        </p>
        <p className="text-sm">
          {title ? "Lorem ipsum dolor sit amet consectetur." : title}
        </p>
        <div className="flex justify-end mt-8">
          <Button
            title="Cancel"
            className="focus:outline-none text-white bg-danger hover:opacity-90 focus:ring-4 focus:ring-danger/30 font-sm rounded-lg text-sm px-[20px] py-[10px] me-2 mb-2 dark:danger/90 dark:hover:bg-danger dark:focus:ring-danger/25"
            onClick={onClose}
          />
          <Button
            title="Delete"
            className="focus:outline-none text-white bg-success hover:bg-success/80 focus:ring-4 focus:ring-success/30 font-medium rounded-lg text-sm px-[20px] py-[10px] me-2 mb-2 dark:bg-success/60 dark:hover:bg-success dark:focus:ring-success/hover:bg-success/80"
            onClick={onConfirm}
          />
        </div>
      </div>
    </div>
  );
};

export default DeleteDialog;
