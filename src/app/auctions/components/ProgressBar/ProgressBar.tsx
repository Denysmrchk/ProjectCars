import React, { FC } from 'react';
import cn from 'classnames';

interface ProgressBarProps {
  value: number;
  color: string;
  className?: string;
  children?: React.ReactNode;
}

export const ProgressBar: FC<ProgressBarProps> = ({ value, color, className, children }) => {
  return (
    <div
      className={cn(
        'h-[30px] w-[200px] rounded-lg bg-white-400 border-2 border-black relative',
        className,
      )}>
      <div
        className={cn(
          'absolute h-full w-[203px]  rounded-[6px] border-1 transition-width duration-400 ease-out',
          {
            'transition-width duration-400 ease-out': value === 100,
          },
        )}
        style={{ width: `${value}%`, background: color, borderColor: color }}>
        {children}
      </div>
    </div>
  );
};
