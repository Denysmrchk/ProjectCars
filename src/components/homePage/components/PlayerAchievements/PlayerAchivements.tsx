import { CustomBulletChart } from '@/components/charts/CustomBulletChart';
import { observer } from 'mobx-react-lite';
import { garageManage } from '@/components/mobx/GarageManage';
import cn from 'classnames';
import React from 'react';
import { ParameterLine } from '@/components/cards/CardCar/components/CarInformation';

export const PlayerAchievements = observer(() => {
  const { salesHistory } = garageManage;
  const totalSum = salesHistory.reduce((accum, currentItem) => {
    return accum + (currentItem.priceOnSale ? currentItem.priceOnSale : 0);
  }, 0);
  return (
    <div className="flex flex-col justify-between h-[380px] bg-white rounded-lg p-5 mb-4 dark:bg-neutral-600">
      <div className="flex min-h-fit w-full">
        <div className="border-b-2 mb-4 w-full">
          <p className="text-lg">Player Achievements</p>
        </div>
      </div>
      <div className="flex min-h-[100px]">
        <div className="w-1/3 min-w-[100px] flex-center-content">
          <div className=" text-white rounded-full bg-blue-400 w-[100px] h-[100px] flex-center-content flex-col">
            <p>Level:</p>
            <p>1</p>
          </div>
        </div>
        <div className="w-[280px] h-[100px] flex flex-col justify-between px-2.5">
          <ParameterLine name={'Cars bought'} value={salesHistory.length} />
          <div className="flex justify-between gap-2">
            <p className="text-"> Total Earned Money: </p>
            <div className="border-b-[2px] border-dotted dark:border-gray-300 border-black-darkest flex-1 my-[5px]"></div>
            <div className="text-red-500">
              <p
                className={cn('', {
                  'text-green-500 ': totalSum > 1,
                  'text-green-500': totalSum === 0,
                })}>
                {totalSum} $
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full min-h-[100px]">
          <CustomBulletChart width={30} title="xp" />
        </div>
      </div>
    </div>
  );
});
