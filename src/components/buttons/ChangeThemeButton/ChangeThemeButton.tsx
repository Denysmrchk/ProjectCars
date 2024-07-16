'use client';
import { useTheme } from '@/components/сontext/theme/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/outline';
import React, { useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';

export const ChangeThemeButton = () => {
  const { theme, toggleTheme } = useTheme();
  const [activeTheme, setActiveTheme] = useState('light');
  useEffect(() => {
    setActiveTheme(theme);
  }, [theme]);
  return (
    <div className='w-[60px]'>
      <button onClick={toggleTheme} className="p-2 dark:text-white text-yellow-500">
        {activeTheme === 'light' ? <SunIcon className="w-8" /> : <MoonIcon className="w-8" />}
      </button>
    </div>
  );
};
