import React from 'react';
import { AuctionInformation } from '@/app/auctions/components/CardController/components/AuctionInformation';
import { ControlPanel } from '@/app/auctions/components/CardController/components/ControlPanel';

export const CardAuctionController = () => {
  return (
    <div className="max-w-[300px] bg-white flex flex-col dark:bg-neutral-600 dark:text-white m-2.5">
      <AuctionInformation />
      <ControlPanel />
    </div>
  );
};
