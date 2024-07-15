import React, { useEffect, useRef, useState } from 'react';
import { appStore } from '@/components/mobx/CurrentPage';
import { garageManage } from '@/components/mobx/GarageManage';
import { auctionActions } from '@/components/mobx/Auction';
import { useFetching } from '@/components/hooks/useFetching';
import fetchCar from '@/components/api/fetchCar';
import { methodArray } from '@/components/hooks/methodArray';
import { congratulationsMessagesAuction } from '@/components/homePage/components/constans';
import ProgressBarAuction from '@/app/auctions/components/ProgressBar/ProgressBarAuction';
import { BlockButtonsAuction } from '@/app/auctions/components/BlockButtons/BlockButtonsAuctions';
import { observer } from 'mobx-react-lite';

export const ControlPanel = observer(() => {
  const {
    arrayAuctionCars,
    currentIndexCar,
    setCarAuctionStatus,
    priceCarAuction,
    currentValueAuction,
    setBidder,
    bidderName,
    setCurrentValueAuction,
    setCarAuctionMessage,
  } = auctionActions;

  const [endAuction, setEndAuction] = useState(false);
  const intervalRef = useRef<any>(null);
  const intervalChart = useRef<any>(null);
  const { setNotificationOnPage } = appStore;
  const { setIsChangeMessagesList } = garageManage;
  const { fetching } = useFetching(
    async () => {
      await fetchCar.postCar(
        { ...arrayAuctionCars[currentIndexCar], price: currentValueAuction },
        'toPayment',
        methodArray.getRandomElementOfArray(congratulationsMessagesAuction),
      );
    },
    { showNotification: true },
  );
  const randomDelay = Math.floor(Math.random() * 1550) + 1000;
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    if (arrayAuctionCars[currentIndexCar].auctionStatus === 'running') {
      intervalRef.current = setInterval(() => {
        if (currentValueAuction < priceCarAuction) {
          setCurrentValueAuction(currentValueAuction + 50);
          setBidder('opponent');
        } else {
          clearInterval(intervalRef.current);
        }
      }, randomDelay);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [currentValueAuction]);

  useEffect(() => {
    setTimer(0);
    if (arrayAuctionCars[currentIndexCar].auctionStatus === 'running') {
      intervalChart.current = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer < 100) {
            return prevTimer + 4;
          } else {
            setEndAuction(true);
            clearInterval(intervalChart.current);
            return 0;
          }
        });
      }, 100);
      return () => {
        clearInterval(intervalChart.current);
      };
    }
    if (
      arrayAuctionCars[currentIndexCar].auctionStatus == 'ended' &&
      bidderName === 'player' &&
      arrayAuctionCars[currentIndexCar].category !== 'toPayment'
    ) {
      fetching();
      setNotificationOnPage('Home', true);
      setIsChangeMessagesList(true);
      setCarAuctionMessage('toPayment', currentIndexCar, currentValueAuction);
    }
    return () => clearInterval(intervalChart.current);
  }, [arrayAuctionCars[currentIndexCar].auctionStatus, currentValueAuction]);

  useEffect(() => {
    if (endAuction) {
      setCarAuctionStatus('ended', currentIndexCar);
    }
  }, [endAuction]);
  return (
    <>
      <ProgressBarAuction value={timer} />
      <BlockButtonsAuction />
    </>
  );
});
