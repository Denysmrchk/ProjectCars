import { makeAutoObservable } from 'mobx';

class AuctionActions {
    auctionStatus: string = 'not started' || 'running...' || 'ended';
    bidderName:string = 'player' || 'opponent' || undefined
    bidValue:number=50
    currentValueAuction:number=500
    priceCarAuction:number=1000
    currentIndexCar:number=0
    constructor() {
        makeAutoObservable(this);
    }
    setCurrentValueAuction= (value:number) => {
    this.currentValueAuction = value;
}
    setBidValue= (value:number) => {
        this.bidValue = value;
    }
    setStartAuction = (value:string) => {
        this.auctionStatus = value;
    }
    setBidder = (value: string) => {
        this.bidderName =value;
    }
    setPriceCarAuction= (value:number) => {
        this.priceCarAuction = value;
    }
    setCurrentIndexCar= (value:number) => {
       this.currentIndexCar = value
    }
}

export const auctionActions = new AuctionActions();