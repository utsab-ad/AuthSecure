
import { useEffect } from "react";

const Toast = ({ message, type , onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => onClose(), 3000);
      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  const bgColor =
    type
      ? "bg-green-500"
      : !type
      ? "bg-red-500"
      : "bg-red-500";

  return (
    <div
      className={`fixed top-2 mx-0 z-50 px-4 py-2 rounded-lg text-white shadow-lg animate-fade-in-out transition-all duration-300 ease-in-out ${bgColor}`}
    >
      {message}
    </div>
  );
};

export default Toast;
