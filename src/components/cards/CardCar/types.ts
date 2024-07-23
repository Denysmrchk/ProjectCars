export interface ICardCarProps {
  index: number;
  AuctionCard?: boolean;
  title: string;
  src: string;
  avrPrice: number;
  GarageCard?: boolean;
  condition?: { body: number; technical: number };
  odometer?: number;
  registration?: string;
  price?: number;
  priceOnSale?: number;
  message?: string;
  auctionStatus?: string;
  commentText?: string;
}
export type cardCarType = {
  title: string;
  src: string;
  condition: { body: number; technical: number };
  odometer: number;
  registration: string;
};
export interface IGarageCard extends cardCarType {
  index: number;
  price: number;
  avrPrice: number;
  priceOnSale: number;
  message: string;
}
export interface IAuctionCard extends cardCarType {
  index: number;
  avrPrice: number;
  commentText: string | undefined;
}
export interface IAuctionListCard extends cardCarType {
  index: number;
  currentIndexCar: number;
  auctionStatus: string;
  avrPrice: number;
}
export type fetchAllCarsType = {
  id: number;
  title: string;
  src: string;
  avrPrice: number;
  YOI: string[];
};
export interface IFetchCarForUser extends fetchAllCarsType {
  category: string;
  price: number;
  odometer: number;
  condition: { body: number; technical: number };
  registered: string;
  message?: string;
  auctionStatus: string;
  priceOnSale?: number;
}
