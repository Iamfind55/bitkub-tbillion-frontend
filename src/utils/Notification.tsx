import React, { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  timeout: number; // Add timeout prop
}

const Notification = ({ message, timeout }: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(notificationTimeout);
  }, [timeout]);

  return (
    <div
      className={`fixed bottom-5 right-5 w-60 p-2 bg-green-500 text-white rounded-md shadow-md ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 ease-in-out`}
    >
      <div className="flex items-center">
        <div className="mr-2 inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-green-500 bg-green-100 rounded-lg dark:bg-green-800 dark:text-green-200">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
          </svg>
          <span className="sr-only">Check icon</span>
        </div>
        <div>
          <p className="text-sm font-medium">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default Notification;
