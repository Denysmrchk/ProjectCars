"use client"
import CardCar from "@/components/CardCar";
import {CardAuctionController} from "@/components/CardAuctionController";
import {useEffect, useState} from "react";
import {auctionActions} from "@/app/mobx/Auction";
import {observer} from "mobx-react-lite";

const carList = [
    {title:'Renault 5 Turbo', src:'/cars/reno.jpg' ,avrPrice:3500, AuctionCard:false, condition:{body:33,technical:38}, odometer:320000, registration: '19.12.1980'},
    {title:'911 Carrera RS', src:'/cars/911-carrera-rs-92.png', AuctionCard:false, avrPrice:80000, condition:{body:45,technical:48},odometer:232000, registration: '22.11.1993'},
    {title:'Golf GTI', src:'/cars/golf-1-gti-83.jpeg', AuctionCard:false, avrPrice:6000, condition:{body:57,technical:62},odometer:280000, registration: '11.08.1983'},
    {title:'Renault 5 Turbo', src:'/cars/reno.jpg', AuctionCard:false, avrPrice:3500, condition:{body:70,technical:75},odometer:160000, registration: '18.10.1981'},
    {title:'Mi-To', src:'/cars/mi-to.jpeg', AuctionCard:false, avrPrice:12000, condition:{body:88,technical:89},odometer:153440, registration: '02.01.2004'},
    {title:'Renault 5 Turbo', src:'/cars/reno.jpg', AuctionCard:false, avrPrice:3500, condition:{body:88,technical:89},odometer:80000, registration: '02.01.1984'},]

const Auction = observer(() =>{
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const {currentIndexCar}=auctionActions
    useEffect(() => {

    }, [currentIndexCar]);
    return (
        <main className="flex flex-col min-h-[84vh] p-[15px] rounded-lg">
            <div className="flex min-h-[400px] w-full rounded-lg my-5">
                <CardCar{...carList[currentIndexCar]} AuctionCard={true} index={currentIndexCar} GarageCard={false} />
                <CardAuctionController/>
            </div>
            <div className="h-3/5 min-[280px] rounded-lg flex overflow-y-auto w-full mt-5 items-center">
                {carList.map((item,index) => (
                    <CardCar {...item} key={index} index={index} GarageCard={false}/>
                ))}
            </div>
        </main>
    );
}
)

export default Auction;