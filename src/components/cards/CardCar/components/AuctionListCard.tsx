import React from 'react';
import Image from 'next/image';
import cn from 'classnames';
import { IAuctionListCard } from '../types';
import { Condition, ParameterLine } from './CarInformation';

export const TypeAuctionListCard = ({
  index = 0,
  title,
  src,
  condition,
  odometer,
  registration,
  currentIndexCar = 0,
  auctionStatus,
}: IAuctionListCard) => {
  return (
    <div
      className={cn(
        'flex relative gap-5 bg-white rounded-lg w-full p-2.5 dark:bg-neutral-600 dark:text-gray-200 mb-4',
        {
          'border-2 border-blue-500': index == currentIndexCar,
        },
      )}>
      <div className="justify-center items-center h-full relative">
        <div className="h-fit w-[200px]">
          <Image className="my-5" src={src} alt="image-auction-list-car" width={220} height={100} />
        </div>
      </div>
      <div className="flex flex-col justify-center relative grow">
        <div className="absolute top-0 left-0 flex justify-start text-nowrap">
          <h2 className="border-b-2 h-fit text-lg border-gray-300 mb-3">{title}</h2>
        </div>
        <div className="flex justify-center dark:bg-neutral-600">
          <div className="flex items-center justify-between w-3/4 h-[130px] mt-3">
            <div className="flex flex-col justify-between h-full w-1/3 max-w-[300px]">
              <ParameterLine name={'Odometer'} value={odometer} prefixValue="KM" />
              <ParameterLine name={'Registered'} value={registration} />
              <ParameterLine
                name={'Highlights'}
                value={condition.technical > 33 ? 'Run and Drive' : 'Not started'}
              />
            </div>
            <div className="flex flex-col justify-between h-full w-1/3">
              <Condition body={condition.body} technical={condition.technical} />
            </div>
            <div className="flex flex-col justify-between h-full">
              <p>Lot number: {index + 1}</p>
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
