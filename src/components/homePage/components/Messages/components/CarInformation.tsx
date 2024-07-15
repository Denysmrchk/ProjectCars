import React, { FC, useState } from 'react';
import { motion } from 'framer-motion';
import { CustomBulletChart } from '@/components/charts/CustomBulletChart';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ICarInformation } from '@/components/homePage/components/Messages/components/types';
export const CarInformation: FC<ICarInformation> = ({ car }) => {
  const [isOpenCarInformation, setIsOpenCarInformation] = useState(false);
  const toggleCarInformation = () => {
    setIsOpenCarInformation(!isOpenCarInformation);
  };
  const onClickPay = () => {};
  const onClickCancel = () => {};
  return (
    <div className="flex flex-col h-fit">
      <div
        onClick={toggleCarInformation}
        className="bg-gray-300 min-w-[200px] w-fit text-black-darkest px-2.5 cursor-pointer">
        <p>carInformation.pdf</p>
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpenCarInformation ? 'auto' : '0px' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex flex-col items-center font-semibold overflow-hidden w-full">
        <div className="flex flex-col relative gap-3 w-3/4 items-center bg-gray-300 dark:bg-gray-200 text-black-darkest py-7 my-5">
          <XMarkIcon
            onClick={toggleCarInformation}
            className="absolute right-5 top-4 text-gray-500 cursor-pointer w-5"
          />
          <div className="flex flex-col w-2/3">
            <div className="flex justify-center my-2 text-[18px]">Check list</div>
            <div className="h-full flex flex-col justify-between">
              <div className="flex flex-col grow justify-between mb-2">
                <div className="w-full flex justify-between">
                  <p>Vehicle:</p>
                  <p>{car.title}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p>Odometer:</p>
                  <p>{car.odometer} KM</p>
                </div>
                <div className="w-full flex justify-between">
                  <p>Registered:</p>
                  <p>{car.registered}</p>
                </div>
                <div className="w-full flex justify-between">
                  <p>Highlights:</p>
                  <p> Run and Drive</p>
                </div>
              </div>
              <div className="flex flex-col justify-between h-[120px] gap-2 mb-6">
                <p>Condition:</p>
                <CustomBulletChart title="Body" width={car.condition.body} />
                <CustomBulletChart title="Technical" width={car.condition.technical} />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
