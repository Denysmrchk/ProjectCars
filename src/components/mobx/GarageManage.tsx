import { makeAutoObservable } from 'mobx';
import { IFetchCarForUser } from '@/components/cards/CardCar/types';
import fetchCar from '@/components/api/fetchCar';
import { appStore } from '@/components/mobx/CurrentPage';
import { toast } from 'react-toastify';
import { NotificationTextNewMessage } from '@/components/cards/CardCar/constants';
import React from 'react';

const { setNotificationOnPage } = appStore;

class GarageManage {
  garageList: IFetchCarForUser[] = [];
  messagesOfCars: IFetchCarForUser[] = [];
  salesHistory: IFetchCarForUser[] = [];
  isChangedGarageList: boolean = false;
  isChangeMessagesList: boolean = false;
  loading = true;
  error: string | null = null;
  fetchRequest: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  fetchUserCars = async () => {
    this.loading = true;
    this.error = null;
    try {
      const response = await fetch(
        'https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/garage',
      );
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      this.setGarageList(data);
      this.setMessagesOfCars(data);
      this.setSalesHistoryList(data);
      this.setFetchRequest(true);
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = 'An unknown error occurred';
      }
    } finally {
      this.loading = false;
    }
  };

  setGarageList = (value: IFetchCarForUser[]) => {
    this.garageList = value.filter(
      (item) => item.category === 'carInGarage' || item.message === 'Order to buy',
    );
  };

  setMessagesOfCars = (value: IFetchCarForUser[]) => {
    this.messagesOfCars = value.filter(
      (item) => item.category == 'toPayment' || item.message === 'Order to buy',
    );
  };

  setSalesHistoryList = (value: IFetchCarForUser[]) => {
    this.salesHistory = value.filter((item) => item.category === 'salesHistory');
  };

  setIsChangedGarageList = (value: boolean) => {
    this.isChangedGarageList = value;
  };

  setIsChangeMessagesList = (value: boolean) => {
    this.isChangeMessagesList = value;
  };

  deleteMessage = (odometer: number) => {
    this.messagesOfCars = this.messagesOfCars.filter((item) => item.odometer !== odometer);
  };

  addCarToGarage = (car: IFetchCarForUser) => {
    this.garageList = [...this.garageList, car];
  };

  changeMessageList = (car: IFetchCarForUser, message: string, price: number) => {
    this.messagesOfCars = [
      ...this.messagesOfCars,
      { ...car, category: 'toPayment', price: price, message: message },
    ];
  };

  changeSalesHistoryList = (odometer: number, price: number) => {
    const newSale = this.messagesOfCars.map((item) =>
      item.odometer === odometer ? { ...item, priceOnSale: price } : item,
    );
    this.salesHistory = [...this.salesHistory, newSale[0]];
  };

  addMessage = (odometer: number) => {
    const newMessage = this.garageList.filter((item) => item.odometer === odometer);
    this.messagesOfCars = [...this.messagesOfCars, { ...newMessage[0], message: 'Order to buy' }];
  };

  putCarOnSale = (
    car: IFetchCarForUser,
    priceOnSale: number,
    pricePercent: number,
    message: string,
  ) => {
    const randomTime = Math.floor(Math.random() * (20000 - 5000 + 1)) + 5000;
    const randomValue = Math.random() * 100;
    if (message == 'onSale') {
      fetchCar.putCarOnSale(car.id, 'onSale', priceOnSale);
      this.garageList = this.garageList.map((item) =>
        item.odometer === car.odometer
          ? { ...item, message: 'onSale', priceOnSale: priceOnSale }
          : item,
      );
      setTimeout(() => {
        if (randomValue < pricePercent) {
          fetchCar.putCarOnSale(car.id, 'Order to buy', priceOnSale).then(() => {
            this.addMessage(car.odometer);
            setNotificationOnPage('Home', true);
          });
          toast.info(<div dangerouslySetInnerHTML={{ __html: NotificationTextNewMessage }} />, {
            position: 'bottom-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            className:
              'p-5 bg-white text-black-darkest w-[400px] right-[80px] dark:bg-neutral-800 dark:text-gray-400 opacity-60 hover:opacity-100',
          });
          this.setIsChangeMessagesList(true);
        }
      }, randomTime);
    } else {
      fetchCar.putCarOnSale(car.id, '', priceOnSale);
      this.garageList = this.garageList.map((item) =>
        item.odometer === car.odometer ? { ...item, message: '', priceOnSale: priceOnSale } : item,
      );
      this.messagesOfCars = this.messagesOfCars.filter((item) => item.odometer !== car.odometer);
    }
  };

  setFetchRequest = (value: boolean) => {
    this.fetchRequest = value;
  };
}

export const garageManage = new GarageManage();
