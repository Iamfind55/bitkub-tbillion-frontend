import React, { useState, useEffect } from "react";

interface NotificationProps {
  message: string;
  timeout: number; 
}

const ErrorNotification: React.FC<NotificationProps> = ({
  message,
  timeout,
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const notificationTimeout = setTimeout(() => {
      setIsVisible(false);
    }, timeout);

    return () => clearTimeout(notificationTimeout);
  }, [timeout]);

  return (
    <div
      className={`fixed bottom-5 right-5 w-60 p-2 bg-red-500 text-white rounded-md shadow-md ${
        isVisible ? "opacity-100" : "opacity-0"
      } transition-opacity duration-500 ease-in-out`}
    >
      <div className="flex items-center">
        <div className="inline-flex items-center justify-center flex-shrink-0 w-6 h-6 text-red-500 bg-red-100 rounded-lg dark:bg-red-800 dark:text-red-200">
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 11.793a1 1 0 1 1-1.414 1.414L10 11.414l-2.293 2.293a1 1 0 0 1-1.414-1.414L8.586 10 6.293 7.707a1 1 0 0 1 1.414-1.414L10 8.586l2.293-2.293a1 1 0 0 1 1.414 1.414L11.414 10l2.293 2.293Z" />
          </svg>
          <span className="sr-only">Error icon</span>
        </div>
        <div>
          <p className="text-sm ml-2 font-medium">{message}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ErrorNotification;
