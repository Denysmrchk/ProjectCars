'use client';
import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { appStore } from '@/components/mobx/CurrentPage';
import { PlayerAchievements } from '@/components/homePage/components/PlayerAchievements/PlayerAchivements';
import { MessagesBlock } from '@/components/homePage/components/Messages/MessagesBlock';
import {ClipboardDocumentIcon } from "@heroicons/react/24/outline";

function Home() {
  const { setNotificationOnPage, navigationList } = appStore;

  useEffect(() => {
    if (navigationList) setNotificationOnPage('Home', false);
  }, []);

  return (
    <main className="w-full flex wrapper-content">
      <div className="flex flex-col w-2/5 min-w-[200px] h-[83vh] m-2.5 dark:text-gray-200">
        <PlayerAchievements />
        <div className="flex flex-col bg-white rounded-lg p-5 grow min-h-[200px] dark:bg-neutral-600">
          <div className="border-b-2 mb-4 w-full">
            <p className="text-lg">Sales History</p>
          </div>
          <div className="flex-center-content flex-col gap-5 w-full h-2/3 select-none">
              <ClipboardDocumentIcon className="w-20 text-gray-500 dark:text-white opacity-60"/>
                <p>You have not any sales :(</p>
          </div>
        </div>
      </div>
      <MessagesBlock />
    </main>
  );
}

export default observer(Home);
