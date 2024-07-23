'use client';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { appStore } from '@/components/mobx/CurrentPage';
import { PlayerAchievements } from '@/components/homePage/components/PlayerAchievements/PlayerAchivements';
import { MessagesBlock } from '@/components/homePage/components/Messages/MessagesBlock';
import { SalesHistory } from '@/components/homePage/components/SalesHistory/SalesHistory';
import { garageManage } from '@/components/mobx/GarageManage';

function Home() {
  const { setNotificationOnPage } = appStore;
  const { isChangeMessagesList, messagesOfCars } = garageManage;

  useEffect(() => {
    setNotificationOnPage('Home', false);
  }, [isChangeMessagesList, messagesOfCars]);

  return (
    <main className="w-full flex wrapper-content">
      <div className="flex flex-col w-2/5 min-w-[200px] h-[83vh] m-2.5 dark:text-gray-200">
        <PlayerAchievements />
        <SalesHistory />
      </div>
      <MessagesBlock />
    </main>
  );
}

export default observer(Home);
