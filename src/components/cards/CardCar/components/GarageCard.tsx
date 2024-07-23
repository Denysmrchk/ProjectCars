import React, { useRef, useState } from 'react';
import Image from 'next/image';
import { Condition, ParameterLine } from './CarInformation';
import { ControllerChangePrice } from '@/app/garage/components/ControllerChangePrice/ControllerChangePrice';
import { IGarageCard } from '../types';
import { WrenchScrewdriverIcon } from '@heroicons/react/24/solid';
import { WrenchIcon } from '@heroicons/react/24/outline';
import { UserIcon } from '@heroicons/react/24/solid';
import { calcPriceCar } from '@/app/auctions/components/functions/Functions';
import { garageManage } from '@/components/mobx/GarageManage';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import { NotificationTextPriceOnSale } from '@/components/cards/CardCar/constants';

export const TypeGarageCard = observer(
  ({
    title,
    src,
    condition,
    odometer,
    registration,
    price,
    avrPrice,
    index,
    priceOnSale,
    message,
  }: IGarageCard) => {
    const [isOpenPopUp, setIsOpenPopUp] = React.useState(false);
    const [isPriceOnSale, setIsPriceOnSale] = useState(0);
    const popupRef = useRef<HTMLDivElement>(null);
    const { garageList, putCarOnSale } = garageManage;
    const priceCar = calcPriceCar({ odometer, condition, avrPrice });
    let carOnSaleBoolean =
      garageList[index].message === 'onSale' || garageList[index].message === 'Order to buy';
    const pricePercent = (priceOnSale / priceCar) * 1.75 * 100;
    const handleClickOutside = (event: React.MouseEvent) => {
      if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
        setIsOpenPopUp(false);
      }
    };
    const handleClickSale = async (message: string) => {
      setIsOpenPopUp(false);
      putCarOnSale(garageList[index], isPriceOnSale, pricePercent, message);
      if (message === 'onSale') {
        toast.info(<div dangerouslySetInnerHTML={{ __html: NotificationTextPriceOnSale }} />, {
          position: 'bottom-right',
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          className:
            'p-5 bg-white text-black-darkest w-[400px] right-[80px] dark:bg-neutral-800 dark:text-gray-400 opacity-80 hover:opacity-100',
        });
      }
    };

    return (
      <div className="flex flex-col w-[340px] bg-white border-2 border-gray-300 rounded-lg mb-3 p-3 dark:bg-gray-background dark:border-none">
        <div className="flex justify-between">
          <h2 className="border-b-2 text-lg border-gray-500 max-w-fit">{title}</h2>
          {carOnSaleBoolean ? (
            <div className="relative">
              <p className="border-b-2 border-green-500 text-green-500 h-fit text-[18px]">
                On Sale
              </p>
              <p className="absolute top-8 w-full flex justify-end text-green-600 dark:bg-gray-background rounded-l">
                {priceOnSale}$
              </p>
            </div>
          ) : (
            <p className="border-b-2 border-red-600 text-red-600 h-fit">Not on Sale</p>
          )}
        </div>
        <div className="h-full w-full flex-center-content my-3">
          <Image src={src} alt="image-auction-list-car" width={250} height={100} />
        </div>
        <div className="flex justify-between w-full">
          <div className="flex flex-col w-[180px] gap-1">
            <div className="flex justify-between">
              <p>Registration:</p>
              <p>{registration}</p>
            </div>
            <div className="flex justify-between">
              <p>Odometer:</p>
              <p>{odometer}</p>
            </div>
            <div className="flex justify-between">
              <p>Buying Price:</p>
              <p className="text-green-500">{price}$</p>
            </div>
            <div className="flex justify-between">
              <p>Recommended Price:</p>
              <p className="h-full flex items-end text-green-500">{priceCar}$</p>
            </div>
          </div>
          <div className="grow flex items-end justify-end">
            <button
              onClick={() => setIsOpenPopUp(true)}
              className="rounded-lg text-white border bg-orange-500 p-2.5 mx-3 dark:border-none">
              Manage
            </button>
          </div>
        </div>
        {isOpenPopUp && (
          <div
            onClick={(event) => handleClickOutside(event)}
            className="fixed inset-0 flex-center-content z-10 bg-black-darkest bg-opacity-50">
            <div
              ref={popupRef}
              className="flex flex-col h-[60%] min-h-[615px] w-[80%] min-w-[800px] max-w-[1200px] bg-white dark:bg-neutral-600 rounded-lg">
              <div className="flex w-full">
                <div className="flex-center-content w-1/2">
                  <Image src={src} alt="image-car-in-manage" width={320} height={200} />
                </div>
                <div className="ml-[50px] w-1/2 flex flex-col">
                  <div className="my-3 max-w-max">
                    <p className="border-b-2 text-2xl border-gray-500">{title}</p>
                  </div>
                  <div className="h-full flex flex-col justify-between text-[14px] font-semibold mr-4">
                    <div className="flex flex-col grow justify-between mb-2  max-w-[300px]">
                      <ParameterLine name={'Odometer'} value={odometer} prefixValue="KM" />
                      <ParameterLine name={'Registered'} value={registration} />
                      <ParameterLine
                        name={'Highlights'}
                        value={condition.technical > 33 ? 'Run and Drive' : 'Not started'}
                      />
                      <ParameterLine name={'Buying price'} value={price} prefixValue={'$'} />
                      <ParameterLine
                        name={'Estimated Retail Value'}
                        value={avrPrice}
                        prefixValue={'$'}
                      />
                    </div>
                    <div className="flex flex-col w-[87%] justify-between h-[120px]">
                      <Condition body={condition.body} technical={condition.technical} />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex grow w-full p-5 gap-5 select-none">
                <div className="flex grow h-full bg-gray-200 items-center dark:bg-gray-background rounded-lg p-5 gap-5">
                  <div className="flex-center-content flex-col cursor-pointer h-full w-full max-w-[250px] border-4 border-gray-300 rounded-lg gap-5 hover:border-gray-100 group dark:border-gray-500 dark:hover:border-blue-300">
                    <div className="relative w-[100px] h-[100px] group-hover:scale-[1.15] text-gray-800 dark:text-gray-200 dark:group-hover:text-blue-300 transition-transform duration-500">
                      <UserIcon style={{ width: '100px', opacity: 0.3 }} />
                      <WrenchIcon
                        style={{
                          position: 'absolute',
                          top: 30,
                          left: 45,
                          width: '50px',
                          opacity: 0.6,
                        }}
                      />
                    </div>
                    <div className="group-hover:mb-0.5 transition-transform duration-1000">
                      inspect the car
                    </div>
                  </div>
                  <div className="flex flex-col items-center cursor-pointer justify-center h-full w-full max-w-[250px] border-4 border-gray-300 rounded-lg gap-5 hover:border-gray-100 group dark:border-gray-500 dark:hover:border-blue-300">
                    <div className="group-hover:scale-[1.15] text-gray-500 dark:text-gray-200 dark:group-hover:text-blue-300 transition-transform duration-500">
                      <WrenchScrewdriverIcon
                        style={{ width: '80px', margin: '10px', opacity: 0.6 }}
                      />
                    </div>
                    <div className="group-hover:mb-0.5 transition-transform duration-1000">
                      take to the mechanic
                    </div>
                  </div>
                </div>
                <div className="flex flex-col relative items-center justify-between w-1/3 min-w-[300px] bg-gray-200 dark:bg-gray-background rounded-lg p-3">
                  {carOnSaleBoolean && (
                    <p className="absolute top-[10px] right-[10px] border-b-2 text-green-500 h-fit text-[18px]">
                      On Sale
                    </p>
                  )}
                  <ControllerChangePrice
                    maxValue={Math.floor(priceCar * 1.75)}
                    minValue={avrPrice / 5}
                    step={25}
                    priceCar={message === 'onSale' ? priceOnSale : Math.floor(priceCar * 0.8)}
                    setPriceOnSale={setIsPriceOnSale}
                  />
                  <div className="flex items-center h-full">
                    {carOnSaleBoolean ? (
                      <div className="flex gap-3">
                        <button
                          onClick={() => handleClickSale('notOnSale')}
                          className="dark:bg-red-400 bg-white px-5 py-3 rounded-lg hover:bg-red-600">
                          Take off
                        </button>
                        <button
                          onClick={() => handleClickSale('onSale')}
                          className="dark:bg-blue-500 bg-white px-5 py-3 rounded-lg hover:bg-blue-600">
                          Change
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => handleClickSale('onSale')}
                        className="dark:bg-blue-500 bg-white px-5 py-3 rounded-lg hover:bg-blue-200">
                        Put Up for Sale
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  },
);
