import { makeAutoObservable, action } from 'mobx';
import { IFetchCarForUser } from '@/components/cards/CardCar/types';
import {addRandomProperties, shuffleArray} from "@/app/auctions/components/functions/Functions";

class AuctionActions {
  bidderName: string = 'player' || 'opponent' || undefined;
  bidValue: number = 50;
  currentValueAuction: number = 500;
  priceCarAuction: number = 1000;
  currentIndexCar: number = 0;
  arrayAuctionCars: IFetchCarForUser[] = [];
  loading = true;
  error: string | null =null;
  isSentRequest:boolean = false
    constructor() {
      makeAutoObservable(this, {
        fetchAuctionCars: action,
      });
  }

  fetchAuctionCars = async () => {
    this.setStatusLoading(true);
    this.error = null;
    try {
      const response = await fetch('https://6634b3649bb0df2359a26fed.mockapi.io/projectCars/carsArray');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      const shuffle =  await shuffleArray(addRandomProperties([...data]));
      this.setArrayAuctionCars(shuffle)
      this.isSentRequest=true;
    } catch (error: unknown) {
      if (error instanceof Error) {
        this.error = error.message;
      } else {
        this.error = 'An unknown error occurred';
      }
    } finally {
      this.setStatusLoading(false);
    }
  }

  setStatusLoading = (value:boolean) => {
    this.loading = value;
  };

  setBidder = (value: string) => {
    this.bidderName = value;
  };

  setBidValue = (value: number) => {
    this.bidValue = value;
  };

  setPriceCarAuction = (value: number) => {
    this.priceCarAuction = value;
  };

  setCurrentIndexCar = (value: number) => {
    this.currentIndexCar = value;
  };

  setCurrentValueAuction = (value: number) => {
    this.currentValueAuction = value;
  };

  setArrayAuctionCars = (value: IFetchCarForUser[]) => {
    this.arrayAuctionCars = value;
  };

  setCarAuctionStatus = (value: string, id: number) => {
    this.arrayAuctionCars = this.arrayAuctionCars.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          auctionStatus: value,
        };
      } else {
        return item;
      }
    });
  };

  setCarAuctionMessage = (category: string, id: number, price:number) => {
    this.arrayAuctionCars = this.arrayAuctionCars.map((item, index) => {
      if (index === id) {
        return {
          ...item,
          category: category,
          price:price,
        };
      } else {
        return item;
      }
    });
  };

}

export const auctionActions = new AuctionActions();
