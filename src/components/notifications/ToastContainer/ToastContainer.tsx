'use client';
import { ToastContainer, Slide } from 'react-toastify';
import { ThemeContext } from '@/components/сontext/theme/ThemeContext';
import { useContext } from 'react';
import '../../../app/globals.css';
export const NotificationMessage = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <ToastContainer
      toastClassName={() =>
        theme === 'dark' ? 'Toastify__toast--custom-dark' : 'Toastify__toast--custom-light'
      }
      position="bottom-right"
      autoClose={5000}
      hideProgressBar
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
      transition={Slide}
    />
  );
};
