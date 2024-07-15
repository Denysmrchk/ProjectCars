import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { moneyOperation } from '@/components/mobx/MoneyOperation';
import fetchCar from '@/components/api/fetchCar';
import { IFetchCarForUser } from '@/components/cards/CardCar/types';
import { garageManage } from '@/components/mobx/GarageManage';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { ParameterLine } from '@/components/cards/CardCar/components/CarInformation';

export const Receipt = ({
  car,
  priceCar,
  odometerCar,
}: {
  priceCar: number;
  odometerCar: number;
  car: IFetchCarForUser;
}) => {
  const [isOpenReceipt, setIsOpenReceipt] = useState(false);
  const { valueMoney, setChangeWallet } = moneyOperation;
  const { setIsChangedGarageList, changeMessagesList } = garageManage;
  const toggleReceipt = () => {
    setIsOpenReceipt(!isOpenReceipt);
  };
  const receiptTotal = Math.floor(priceCar * 1.1) + 100;
  const onClickPay = () => {
    if (valueMoney > receiptTotal) {
      changeMessagesList(odometerCar);
      setChangeWallet('minus', receiptTotal);
      fetchCar.putCarInGarage(car).then(() => setIsChangedGarageList(true));
    }
  };
  const onClickCancel = () => {
    changeMessagesList(odometerCar);
    fetchCar.deleteCarFromMessages(car.id);
  };
  const handleClickSell = () => {
    changeMessagesList(odometerCar);
    setIsChangedGarageList(true);
    fetchCar.deleteCarFromMessages(car.id);
    if (car.priceOnSale) setChangeWallet('plus', car.priceOnSale);
  };
  return (
    <div className="flex flex-col">
      <div
        onClick={toggleReceipt}
        className="bg-gray-300 w-1/4 min-w-[200px] text-black-darkest px-2.5 cursor-pointer">
        {car.message === 'Order to buy' ? <p>proposal</p> : <p>receipt.pdf</p>}
      </div>
      <motion.div
        initial={false}
        animate={{ height: isOpenReceipt ? 'auto' : '0px' }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="flex flex-col items-center font-bold overflow-hidden w-full">
        <div className="flex flex-col gap-3 w-3/4 items-center bg-gray-300 dark:bg-gray-200 text-black-darkest py-3 my-5">
          <div className="relative w-full">
            <XMarkIcon
              onClick={toggleReceipt}
              className="absolute right-5 top-1 text-gray-500 cursor-pointer w-5"
            />
          </div>
          {car.message === 'Order to buy' ? (
            <div className="flex flex-col w-2/3 gap-2 py-2.5">
              <div className="flex flex-col gap-5 my-3">
                <ParameterLine name={'Buying Price'} value={car.price} prefixValue={'$'} />
                <ParameterLine name={'Price on Sale'} value={car.priceOnSale} prefixValue={'$'} />
                <div className="flex items-center justify-end relative gap-2">
                  <CheckCircleIcon className="w-[25px] rounded-[30px] bg-green-500 text-white" />
                  <div className="flex gap-2">
                    <p>Offer:</p>
                    <p> {car.priceOnSale}$</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <button
                  className="bg-green-500 rounded-[15px] px-6 py-2.5 text-white"
                  onClick={handleClickSell}>
                  Sell
                </button>
              </div>
            </div>
          ) : (
            <>
              <div className="relative w-full">
                <h1 className="w-full text-center mb-3">Receipt</h1>
              </div>
              <div className="flex flex-col w-2/3">
                <div className="flex justify-between gap-2">
                  <p>Bid</p>
                  <div className="border-b-[2px] border-dotted border-black-darkest flex-1 mx-2 my-[5px]"></div>
                  <p>{priceCar}$</p>
                </div>
                <div className="flex flex-col">
                  <div className="flex justify-between">
                    <p>Auction Fee 10%</p>
                    <div className="border-b-[2px] border-dotted border-black-darkest flex-1 mx-2 my-[5px]"></div>
                    <p>{priceCar * 0.1}$</p>
                  </div>
                  <div className="flex justify-between">
                    <p>Delivery from Ballas</p>
                    <div className="border-b-[2px] border-dotted border-black-darkest flex-1 mx-2 my-[5px]"></div>
                    <p>100$</p>
                  </div>
                </div>
                <div className="w-full h-1 border-gray-400 border-b-2 mt-7"></div>
                <div className="flex justify-end gap-5 my-3">
                  <p>Total:</p>
                  <p>{receiptTotal}$</p>
                </div>
              </div>
              <div className="flex items-center gap-5 my-4 text-gray-200">
                <button
                  className="bg-green-600 px-6 py-2.5 rounded-[20px]"
                  onClick={() => onClickPay()}>
                  Pay
                </button>
                <button
                  className="bg-red-500 px-6 py-2.5 rounded-[20px]"
                  onClick={() => onClickCancel()}>
                  Cancel
                </button>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};
