import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { IAuctionListCard } from '../types';
import { Condition, ParameterLine } from './CarInformation';
import { auctionActions } from '@/components/mobx/Auction';

export const TypeAuctionListCard = ({
  index = 0,
  title,
  src,
  condition,
  odometer,
  registration,
  currentIndexCar = 0,
  auctionStatus,
  avrPrice,
}: IAuctionListCard) => {
  const { setCurrentIndexCar } = auctionActions;
  const viewLot = () => {
    setCurrentIndexCar(index);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  return (
    <div
      className={cn(
        'flex relative gap-5 bg-white rounded-lg grow dark:bg-neutral-600 dark:text-gray-200 mb-4',
        {
          'border-2 border-blue-500': index == currentIndexCar,
        },
      )}>
      <div className="justify-center items-center h-full relative">
        <div className="h-[80px] w-[200px]">
          <Image className="ml-1" src={src} alt="image-auction-list-car" width={150} height={80} />
        </div>
      </div>
      <div className="flex justify-between w-full grow">
        <div
          onClick={viewLot}
          className="flex flex-col justify-start text-nowrap w-[200px] cursor-pointer">
          <h2 className="border-b-2 w-fit h-fit text-lg border-gray-300 mb-3">{title}</h2>
          <div className="flex flex-col justify-between h-fit  hover:text-blue-500">
            <p>Lot number: {index + 1}</p>
          </div>
        </div>
        <div className="flex justify-center grow dark:bg-neutral-600">
          <div className="flex items-center justify-between grow w-full max-w-[500px] h-[100px] py-[2.5px] mt-3 text-[15px]">
            <div className="flex flex-wrap justify-between h-full w-[220px]">
              <ParameterLine name={'Odometer'} value={odometer} prefixValue="KM" />
              <ParameterLine name={'Registered'} value={registration} />
              <ParameterLine name={'Estimated Retail'} value={avrPrice} prefixValue={'$'} />
            </div>
            <div className="flex flex-col justify-between h-full w-1/2 max-w-[250px]">
              <Condition
                body={condition.body}
                technical={condition.technical}
                conditionTextNone={true}
              />
            </div>
          </div>
        </div>
      </div>
      {auctionStatus === 'ended' && (
        <div className="absolute inset-0 flex-center-content bg-black-darkest bg-opacity-50 text-white text-xl font-bold">
          Auction Ended
        </div>
      )}
    </div>
  );
};
