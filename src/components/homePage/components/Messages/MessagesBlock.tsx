import fetchCar from '@/components/api/fetchCar';
import { useFetching } from '@/components/hooks/useFetching';
import { garageManage } from '@/components/mobx/GarageManage';
import { useEffect } from 'react';
import { CarInformation } from './components/CarInformation';
import { Receipt } from './components/Receipt';
import { observer } from 'mobx-react-lite';
import { EnvelopeOpenIcon } from '@heroicons/react/24/outline';
import { LoadingSpin } from '@/components/notifications/LoadingSpin';

export const MessagesBlock = observer(() => {
  const {
    messagesOfCars,
    fetchUserCars,
    loading,
    isChangeMessagesList,
    setIsChangeMessagesList,
    fetchRequest,
  } = garageManage;
  useEffect(() => {
    if (!fetchRequest || isChangeMessagesList) {
      fetchUserCars();
      setIsChangeMessagesList(false);
    }
  }, [isChangeMessagesList]);

  return (
    <div className="flex flex-col grow max-h-[83vh] max-w-3/5 !min-h-[350px] bg-white rounded-lg p-5 m-2.5 dark:bg-neutral-600 dark:text-gray-200">
      <div className="border-b-2 mb-4 w-full">
        <p className="text-lg">Messages</p>
      </div>
      {loading ? (
        <LoadingSpin />
      ) : messagesOfCars.length ? (
        <div className="flex flex-col h-fit gap-5 overflow-auto swiper-scrollbar-vertical transition-[height] duration-300">
          {messagesOfCars
            .slice()
            .reverse()
            .map((car, id) => (
              <div
                key={id}
                className="flex flex-col w-full bg-white border border-gray-400 rounded-lg px-5 py-3 pb-5 dark:bg-gray-background dark:border-none transition-colors">
                <div className="grow">
                  <h2 className="dark:text-blue-400 border-b-2 text-lg border-gray-400 mb-3 max-w-fit text-blue-500">
                    {car.category === 'toPayment' ? 'Auction' : 'Buyer'}
                  </h2>
                </div>
                <div className="flex flex-col px-5 gap-5">
                  <div className="font-[20px] tracking-wider">
                    {car.message === 'Order to buy' ? (
                      <div className="flex flex-col gap-3">
                        <p>
                          Great news! We have received an offer for your car. A potential buyer is
                          interested in purchasing your vehicle.
                        </p>
                        <p>
                          {car.title} {car.registered} {car.odometer} KM
                        </p>
                      </div>
                    ) : (
                      car.message
                    )}
                  </div>
                  <div className="flex flex-col gap-5 h-fit">
                    {car.message !== 'Order to buy' && <CarInformation car={car} />}
                    <Receipt priceCar={car.price} odometerCar={car.odometer} car={car} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      ) : (
        <div className="flex-center-content w-full h-1/2 flex-col gap-5 select-none">
          <EnvelopeOpenIcon className="w-20 text-gray-500 dark:text-white opacity-60" />
          <p>No messages</p>
        </div>
      )}
    </div>
  );
});
