import React from 'react';
import { motion } from 'framer-motion';
import { Spin } from 'antd';

interface LoadingSpinProps {
  className?: string;
}

export const LoadingSpin: React.FC<LoadingSpinProps> = ({ className = '' }) => {
  const style = `flex-center-content w-full h-1/2 ${className}`;
  return (
    <div className={style}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}>
        <Spin size={'large'} className="w-full " />
      </motion.div>
    </div>
  );
};
