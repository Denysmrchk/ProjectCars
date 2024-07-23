'use client';

import CardCar from '@/components/cards/CardCar/CardCar';
import React, { useEffect } from 'react';
import { garageManage } from '@/components/mobx/GarageManage';
import { observer } from 'mobx-react-lite';
import { LoadingSpin } from '@/components/notifications/LoadingSpin';

function Garage() {
  const {
    garageList,
    fetchUserCars,
    loading,
    isChangedGarageList,
    setIsChangedGarageList,
    fetchRequest,
  } = garageManage;

  useEffect(() => {
    if (!fetchRequest || isChangedGarageList) {
      fetchUserCars();
      setIsChangedGarageList(false);
    }
  }, [isChangedGarageList]);

  if (garageManage.error) {
    return <div>Error: {garageManage.error}</div>;
  }
  return (
    <main className="w-full flex wrapper-content">
      <div className="flex flex-col grow max-h-[85vh] !min-h-[60vh] bg-white rounded-lg p-5 m-2.5 dark:bg-neutral-600 dark:text-gray-200">
        <div className="border-b-2 mb-4 w-full">
          <p className="text-lg">Garage</p>
        </div>
        <div className="flex flex-wrap h-full overflow-auto swiper-scrollbar-vertical scroll-auto gap-x-3">
          {loading ? (
            <LoadingSpin className="h-[350px]" />
          ) : garageList.length ? (
            garageList.map((car, id) => (
              <CardCar
                key={id}
                index={id}
                {...car}
                registration={car.registered}
                GarageCard={true}
              />
            ))
          ) : (
            <div className="flex-center-content w-full h-full text-[20px] opacity-40">
              <p>empty</p>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

export default observer(Garage);
