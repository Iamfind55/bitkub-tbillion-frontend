import React, { useRef, useState, useEffect, MouseEvent } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const MyModal = ({ isOpen, onClose, children, className }: Props) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(isOpen);

  const handleOutsideClick: any = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose(); // Close the modal when clicking outside
    }
  };

  useEffect(() => {
    setIsVisible(isOpen);
    if (isOpen) {
      document.body.style.overflow = "hidden"; // Disable scrolling on the body
      document.addEventListener("mousedown", handleOutsideClick);
    } else {
      document.body.style.overflow = "auto"; // Enable scrolling on the body
      document.removeEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [isOpen, onClose]);

  return (
    <>
      <div
        className={`${
          isVisible ? "visible" : "invisible"
        } min-h-screen flex justify-center items-center fixed top-0 z-30 backdrop-blur-sm left-0 right-0 bottom-0 bg-dark/50`}
      >
        <div
          className={`
                    ${
                      isVisible
                        ? "visible opacity-100 scale-100"
                        : "invisible opacity-0 scale-0"
                    }
                   transition-all relative duration-200 bg-white max-h-[90vh] text-info my-5 overflow-y-auto p-5 rounded ${
                     className ? className : " md:w-3/4 w-4/5  lg:w-2/4"
                   }`}
          ref={modalRef}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default MyModal;
