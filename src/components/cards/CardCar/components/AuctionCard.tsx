import React from 'react';
import Image from 'next/image';
import { Condition, ParameterLine } from './CarInformation';
import {
  calcPriceCar,
  MakeIndention,
  RandomPriceAuction,
} from '@/app/auctions/components/functions/Functions';
import { IAuctionCard } from '../types';
import { auctionActions } from '@/components/mobx/Auction';

export const TypeAuctionCard = ({
  index = 0,
  title,
  src,
  condition,
  odometer,
  registration,
  avrPrice,
  commentText,
}: IAuctionCard) => {
  const { setPriceCarAuction } = auctionActions;
  const CarPrice = calcPriceCar({ condition, odometer, avrPrice });
  const PriceAuction = RandomPriceAuction(CarPrice);
  setPriceCarAuction(PriceAuction);
  return (
    <div className="grow flex-col dark:text-gray-200 m-2.5">
      <div className="w-1/2 relative">
        <div className="absolute top-[0px] left-[10px] text-lg flex">
          <p className="text-gray-600 mr-1 dark:text-gray-200">Auction</p>
          <p className="text-blue-500 dark:text-blue-400">#{index + 1}</p>
        </div>
      </div>
      <div className="flex gap-[70px] h-[220px] min-w-min dark:bg-neutral-600 mt-5">
        <div className="flex justify-end items-center w-[330px] h-full mt-2">
          <Image src={src} alt="auction-car-image" width={260} height={150} />
        </div>
        <div className="grow flex flex-col">
          <div className="my-3 max-w-max">
            <p className="border-b-2 text-[21px] border-gray-500">{title}</p>
          </div>
          <div className="h-full flex justify-between text-[14px] font-semibold gap-2">
            <div className="flex flex-col w-1/2 justify-between mb-2 max-w-[300px]">
              <ParameterLine name={'Odometer'} value={odometer} prefixValue="KM" />
              <ParameterLine name={'Registered'} value={registration} />
              <ParameterLine
                name={'Highlights'}
                value={condition.technical > 33 ? 'Run and Drive' : 'Not started'}
              />
              <ParameterLine name={'Estimated Retail Value'} value={avrPrice} prefixValue={'$'} />
            </div>
            <div className="flex flex-col w-1/2 justify-between h-[120px]">
              <Condition body={condition.body} technical={condition.technical} />
            </div>
          </div>
        </div>
      </div>
      <div className="w-full p-3 dark:bg-neutral-600 ">
        <h1>Comment:</h1>
        <div className="rounded-lg bg-gray-200 mt-1 w-full min-h-[70px] p-3 dark:bg-gray-300 dark:text-black-darkest">
          <p className="w-3/4 tracking-wider">{commentText && MakeIndention(commentText)}</p>
        </div>
      </div>
    </div>
  );
};
