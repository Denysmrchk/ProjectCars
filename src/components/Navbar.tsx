import Image from 'next/image';
import { ChangeThemeButton } from '@/components/buttons/ChangeThemeButton/ChangeThemeButton';
import NavigationLine from '@/components/NavigationLine/NavigationLine';
import React from 'react';

const Navbar = () => {
  return (
    <header className="w-full fixed z-20 top-0">
      <nav className="flex flex-col justify-center w-full bg-gray-200 dark:bg-gray-background dark:text-gray-200 ">
        <div className="flex justify-between items-center border-b-[1.5px] border-gray-500 dark:border-gray-500">
          <div className="wrapper-content flex justify-between px-10 py-[4px]">
            <div className="flex items-center  h-14">
              <Image
                className="mr-5"
                src="/icons/logo-icon.png"
                alt="logo-icon"
                width={200}
                height={20}
              />
              <h1 className="font-medium">Project #</h1>
            </div>
            <div className="flex items-center gap-1">
              <ChangeThemeButton />
              <p>icon</p>
              <div className="mx-2"></div>
              <p>login</p>
            </div>
          </div>
        </div>
        <NavigationLine />
      </nav>
    </header>
  );
};

export default Navbar;
