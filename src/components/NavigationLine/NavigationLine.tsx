'use client';

import { usePathname, useRouter } from 'next/navigation';
import cn from 'classnames';
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { appStore } from '@/components/mobx/CurrentPage';
import { moneyOperation } from '@/components/mobx/MoneyOperation';
import { MapPinIcon } from '@heroicons/react/24/outline';
import 'tailwindcss/tailwind.css';
import { menuItemType } from '@/components/NavigationLine/typed';

const formatPath = (path: string) => {
  const parts = path.slice(1).split('/');
  return parts.map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');
};

const NavigationLine: React.FC = observer(() => {
  const { valueMoney, showMoneyAnimation, changeWallet } = moneyOperation;
  const router = useRouter();
  const pathName = usePathname();
  const currentPage = formatPath(pathName);
  const [selectedPageCategory, setSelectedPageCategory] = useState<string>('');
  const { selectedTitleCity, navigationList } = appStore;

  useEffect(() => {
    const savedPage = localStorage.getItem('selectedPageCategory');
    if (savedPage) {
      if (savedPage === currentPage) {
        setSelectedPageCategory(savedPage);
      } else {
        setSelectedPageCategory('Home');
      }
    }
  }, []);

  const onClickCategory = (item: menuItemType) => {
    router.push(item.link);
    setSelectedPageCategory(item.name);
    localStorage.setItem('selectedPageCategory', item.name);
  };

  return (
    <div className="flex justify-between items-center w-full py-1 dark:text-gray-200 bg-gray-300 dark:bg-gray-background">
      <div className="wrapper-content flex justify-between">
        <ul className="flex">
          {navigationList.map((item: menuItemType) => (
            <li
              key={item.name}
              className={cn('p-2.5 cursor-pointer w-28 flex justify-center', {
                'text-blue-500 border-b-[2px] border-blue-500  dark:text-blue-400 ':
                  selectedPageCategory === item.name,
              })}
              onClick={() => onClickCategory(item)}>
              {<item.icon className="w-[24px] mr-2 h-[23px]" />}
              <div className="relative w-fit">
                {item.name}
                {item.notification && (
                  <div className="absolute top-[-5px] right-[-8px] w-2 h-2 rounded-[8px] bg-blue-400"></div>
                )}
              </div>
            </li>
          ))}
        </ul>
        <div className="flex gap-5">
          <div className="flex items-center ">
            <MapPinIcon className="w-6 mr-2" />
            <p className="text-[16.5px]">{selectedTitleCity}</p>
          </div>
          <div className="flex relative min-w-[80px] text-green-500 px-3 mr-5">
            <div className=" flex items-center justify-end w-full">
              <p className="text-[22px] tracking-wide">${valueMoney}</p>
            </div>
            <div className="flex absolute top-[35px] right-[12px]">
              {changeWallet.status && (
                <div
                  className={`tracking-wide text-[22px] ${
                    showMoneyAnimation ? 'animate-slideDownIn' : 'animate-slideDownOut'
                  }`}>
                  {changeWallet.sign === 'plus' ? (
                    <p className="text-green-500">+{changeWallet.value}</p>
                  ) : (
                    <p className="text-red-400">-{changeWallet.value}</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

export default NavigationLine;
