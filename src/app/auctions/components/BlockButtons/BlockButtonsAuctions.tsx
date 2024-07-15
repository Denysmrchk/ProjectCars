import { auctionActions } from '@/components/mobx/Auction';
import React, { useEffect, useRef, useState } from 'react';
import { observer } from 'mobx-react-lite';
import cn from 'classnames';
import { moneyOperation } from '@/components/mobx/MoneyOperation';
import { Slider } from 'antd';

export const BlockButtonsAuction = observer(() => {
  const {
    arrayAuctionCars,
    currentIndexCar,
    setBidValue,
    bidValue,
    currentValueAuction,
    setCurrentValueAuction,
    priceCarAuction,
    setCarAuctionStatus,
    setBidder,
    bidderName,
    setCurrentIndexCar,
  } = auctionActions;
  const { valueMoney } = moneyOperation;

  const [disabledBidButton, setDisabledBidButton] = useState(false);
  const [disabledSkipButton, setDisabledSkipButton] = useState(false);

  const BidButtonClick = (value: number) => {
    if (bidValue * 0.8 < valueMoney) {
      setCurrentValueAuction(value);
      setDisabledBidButton(true);
      setBidder('player');
      setCarAuctionStatus('running', currentIndexCar);
    }
  };

  const SkipButtonClick = () => {
    if (arrayAuctionCars[currentIndexCar].auctionStatus === 'running') {
      setCurrentValueAuction(priceCarAuction);
      setCarAuctionStatus('ended', currentIndexCar);
    } else {
      if (currentIndexCar < arrayAuctionCars.length - 1) {
        setCurrentIndexCar(currentIndexCar + 1);
        setCarAuctionStatus('ended', currentIndexCar);
      }
    }
  };

  useEffect(() => {
    setDisabledSkipButton(false)
    setDisabledBidButton(arrayAuctionCars[currentIndexCar].auctionStatus === 'ended');
    if (arrayAuctionCars[currentIndexCar].auctionStatus == 'running') {
      setDisabledSkipButton(bidderName === 'player');
      setDisabledBidButton(bidderName === 'player');
    }
  }, [arrayAuctionCars[currentIndexCar].auctionStatus, bidderName]);

  const onChangeSwiper = (value: number) => {
    setBidValue(value);
  };

  return (
    <div>
      <Slider step={25} min={50} max={1000} onChange={onChangeSwiper} value={bidValue} />
      <div className="flex-center-content">
        <div className="flex items-center">
          <button
            disabled={disabledSkipButton}
            onClick={() => SkipButtonClick()}
            className={cn('bg-red-300 text-white font-bold py-2 px-4 rounded cursor-default', {
              '!cursor-pointer bg-red-500': arrayAuctionCars.length - 1 > currentIndexCar,
            })}>
            Skip
          </button>
        </div>
        <div
          className="flex grow items-center justify-between rounded-full mx-2"
          style={{ maxWidth: '200px' }}>
          <button
            onClick={bidValue > 50 ? () => setBidValue(bidValue - 50) : undefined}
            className="text-xl font-bold">
            -
          </button>
          <span className="text-lg mx-1 text-center w-[60px]">+${bidValue}</span>
          <button onClick={() => setBidValue(bidValue + 50)} className="text-xl font-bold">
            +
          </button>
        </div>
        <button
          onClick={() => BidButtonClick(currentValueAuction + bidValue)}
          disabled={disabledBidButton}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
          Bid
        </button>
      </div>
    </div>
  );
});
