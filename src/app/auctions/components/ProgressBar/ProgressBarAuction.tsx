import { FC } from 'react';
import { auctionActions } from '@/components/mobx/Auction';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';

const ProgressBar = observer(({ value }: { value: number }) => {
  const { currentIndexCar, arrayAuctionCars } = auctionActions;

  return (
    <div className="flex-1 mx-4">
      <div className="flex justify-center">
        <p className="mr-2">Status:</p>
        <p
          className={cn('text-green-500', {
            'text-red-500': arrayAuctionCars[currentIndexCar].auctionStatus == 'not started',
            'text-orange-400': arrayAuctionCars[currentIndexCar].auctionStatus == 'ended',
          })}>
          {arrayAuctionCars[currentIndexCar].auctionStatus}
        </p>
      </div>
      <div className="relative mt-4">
        <div className="absolute h-3 bg-gray-500 w-full"></div>
        <div className="absolute top-0 h-3 bg-green-500" style={{ width: `${value}%` }}></div>
      </div>
    </div>
  );
});

export default ProgressBar;
