'use client';
import { useEffect } from 'react';
import { auctionActions } from '@/components/mobx/Auction';
import { AuctionBlock } from './components/AuctionBlock/AuctionBlock';
import { AuctionList } from './components/AuctionList/AuctionList';

const Auction = () => {
  const { fetchAuctionCars, arrayAuctionCars } = auctionActions;
  useEffect(() => {
    if (!arrayAuctionCars.length) {
      fetchAuctionCars();
    }
  }, []);
  if (auctionActions.error) {
    return <div>Error: {auctionActions.error}</div>;
  }

  return (
    <main className="w-full flex flex-col relative gap-5">
      <div className="dark:bg-neutral-600 bg-white w-full flex justify-center sticky z-0 top-[30px] my-2.5">
        <AuctionBlock />
      </div>
      <AuctionList />
    </main>
  );
};

export default Auction;
