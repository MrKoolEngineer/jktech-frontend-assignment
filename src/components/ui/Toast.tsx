'use client';

import { FC, useEffect, useState } from 'react';

type ToastProps = {
  message: string;
  type?: 'success' | 'error';
  onClose?: () => void;
};

const Toast: FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      onClose?.();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  if (!visible) return null;

  return (
    <div
      className={`fixed top-5 right-5 z-50 rounded-md px-4 py-2 text-sm text-white shadow-lg transition-all duration-300 ${
        type === 'success' ? 'bg-green-600' : 'bg-red-600'
      }`}
    >
      {message}
    </div>
  );
};

export default Toast;
