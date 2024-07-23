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
  const [messageAuction, setMessageAuction] = useState('');
  const intervalRef = useRef<any>(null);
  const intervalChart = useRef<any>(null);
  const { setNotificationOnPage } = appStore;
  const { setIsChangeMessagesList, changeMessageList } = garageManage;
  const { fetching } = useFetching(
    async () => {
      await fetchCar.postCar(
        { ...arrayAuctionCars[currentIndexCar], price: currentValueAuction },
        'toPayment',
        messageAuction,
      );
    },
    { showNotification: true },
  );
  const randomDelay = Math.floor(Math.random() * 1550) + 1000;
  const [timer, setTimer] = useState(0);

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
      clearInterval(intervalChart.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      clearInterval(intervalChart.current);
    };
  }, [currentValueAuction, currentIndexCar]);

  useEffect(() => {
    if (endAuction) {
      setCarAuctionStatus('ended', currentIndexCar);
      if (bidderName === 'player' && arrayAuctionCars[currentIndexCar].category !== 'toPayment') {
        fetching();
        setNotificationOnPage('Home', true);
        setIsChangeMessagesList(true);
        setCarAuctionMessage('toPayment', currentIndexCar);
        changeMessageList(arrayAuctionCars[currentIndexCar], messageAuction, currentValueAuction);
      }
    }
  }, [endAuction]);
  useEffect(() => {
    setEndAuction(false);
    setMessageAuction(methodArray.getRandomElementOfArray(congratulationsMessagesAuction));
  }, [currentIndexCar]);

  return (
    <>
      <ProgressBarAuction value={timer} />
      <BlockButtonsAuction />
    </>
  );
});
