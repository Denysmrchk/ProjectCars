import cn from 'classnames';
import React, { useEffect } from 'react';
import { auctionActions } from '@/components/mobx/Auction';
import { observer } from 'mobx-react-lite';

export const AuctionInformation = observer(() => {
  const {
    setCurrentValueAuction,
    setBidder,
    currentValueAuction,
    bidderName,
    currentIndexCar,
    arrayAuctionCars,
  } = auctionActions;

  useEffect(() => {
    setBidder('player');
    setCurrentValueAuction(500);
    return () => {
      setBidder('player');
      setCurrentValueAuction(500);
    };
  }, [currentIndexCar]);

  return (
    <div className="flex flex-col flex-center-content grow">
      <div
        className={cn('h-24 w-24 flex flex-col flex-center-content bg-green-500 rounded-full', {
          '!bg-red-500': bidderName == 'opponent',
        })}>
        {arrayAuctionCars[currentIndexCar].auctionStatus == 'not started' && (
          <span className="flex text-center font-bold text-xl">{currentValueAuction}</span>
        )}
        {arrayAuctionCars[currentIndexCar].auctionStatus == 'running' && (
          <>
            <span className={cn('font-bold text-xl', { 'mt-2': bidderName == 'opponent' })}>
              {currentValueAuction}
            </span>
            <span className="flex text-center">
              {bidderName == 'opponent' ? 'Opponent' + ' bid' : 'Your bid!'}
            </span>
          </>
        )}
        {arrayAuctionCars[currentIndexCar].auctionStatus == 'ended' && (
          <div className="flex text-center font-bold text-xl flex-col">
            <p>Win</p>
            <p>{bidderName}</p>
          </div>
        )}
      </div>
      <div className="mt-8">
        {arrayAuctionCars[currentIndexCar].auctionStatus == 'ended' ? (
          <div className="flex-center-content">
            <p className="mr-2">Won bid:</p>
            <p className="text-green-500 text-lg">
              ${arrayAuctionCars[currentIndexCar].price || Math.floor(currentValueAuction)}
            </p>
          </div>
        ) : arrayAuctionCars[currentIndexCar].auctionStatus ? (
          <span>Current bid</span>
        ) : (
          <span>Initial bid</span>
        )}
      </div>
    </div>
  );
});
