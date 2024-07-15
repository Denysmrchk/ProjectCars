import Image from 'next/image';
import { ChangeThemeButton } from '@/components/buttons/ChangeThemeButton/ChangeThemeButton';

const Navbar = () => {
  return (
    <header className="w-full absolute z-10 top-0">
      <nav className="bg-gray-200 dark:bg-gray-background dark:text-gray-200 border-b-[1.5px] border-gray-500 dark:border-gray-500 h-16 flex justify-center w-full">
        <div className="flex justify-between items-center w-[1440px] px-10">
          <div className="flex items-center">
            <Image
              className="mr-5"
              src="/icons/logo-icon.png"
              alt="logo-icon"
              width={200}
              height={40}
            />
            <h1 className="font-medium">Project #</h1>
          </div>
          <div className=" flex items-center gap-1">
            <ChangeThemeButton />
            <p>icon</p>
            <div className="mx-2"></div>
            <p>login</p>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
