import Image from "next/image";
import {FC, useEffect, useState} from "react";
import {CustomBulletChart} from "@/components/CustomBulletChart";
import {calcPriceCar, RandomPriceAuction} from "@/components/Functions";
import {auctionActions} from "@/app/mobx/Auction";
import {observer} from "mobx-react-lite";
import cn from "classnames";

export interface CardCarProps{
    index:number
    AuctionCard:boolean,
    title:string,
    src:string,
    condition:{body:number,technical:number},
    avrPrice:number,
    odometer:number,
    registration:string,
    GarageCard:boolean
    setPopUpOpen?:(arg:boolean)=>void
    ManageCar?:boolean
}

const CardCar:FC<CardCarProps>= observer( ({ManageCar=false,setPopUpOpen,GarageCard=false,index,AuctionCard = false, title,src,condition,avrPrice,odometer,registration})=>{
    const {setPriceCarAuction,currentIndexCar}=auctionActions
    useEffect(() => {
        if(AuctionCard) {
            const CarPrice=calcPriceCar({condition, odometer, avrPrice})
            const PriceAuction = RandomPriceAuction(CarPrice)
            setPriceCarAuction(PriceAuction)
            console.log('car price', CarPrice)
        }
    }, [currentIndexCar]);
    if(GarageCard){
    return (
        <div>
            <div className="flex flex-col w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3">
                <div>
                    <h2 className="border-b-2 text-lg border-gray-500 mb-3 max-w-fit">{title}</h2>
            </div>
            <div className="flex justify-between">
                <div>
                    <p>Registration: {registration}</p>
                    <p>Odometer: {odometer}</p>
                </div>
                <div className="grow flex items-center justify-end">
                        <p className="font-bold mr-2">Status:</p>
                        <p className="border-b-2 border-red-600 text-red-600 mr-5">Not on Sale</p>
                    <button onClick={()=>setPopUpOpen && setPopUpOpen(true)} className="rounded-lg text-white border bg-orange-500 p-2.5 mx-3">
                        Manage
                    </button>
                </div>
            </div>
        </div>
        </div>

    )
    }
    if (!AuctionCard) {
        return (
            <div
             className="grow flex bg-white border border-gray-300 rounded-lg mr-3 flex-col max-w-max p-2.5 justify-between">
                < div className="w-0.5 relative">
                    <p className="absolute top-[-5px] left-[10px] text-lg text-gray-600 min-w-max">Auction
                        #{index + 1}
                    </p>
                </div>
    <div className="flex justify-center min-w-[175px]">
        <Image className="my-5" src={src} alt="ferrari" width={250} height={100}/>
    </div>
    <div className="flex justify-center">
                 <h2 className="border-b-2 text-lg border-gray-500 mb-3">{title}</h2>
             </div>
         </div>
     )
    }

    return (
            <div className={cn("grow bg-white border border-gray-300 rounded-lg mr-3 flex-col",
                {'border-none': ManageCar}
                )}>
                {!ManageCar ?
                    <div className="w-0.5 relative">
                        <p className="absolute top-[10px] left-[10px] text-lg text-gray-600 min-w-max">Auction
                            #{index + 1}</p>
                    </div>
                    :
                    ''
                }
                <div className="flex h-[280px] min-w-min">
                    <div className="flex justify-center m-auto w-1/2">
                        <Image className="m-2.5" src={src} alt="ferrari" width={320} height={200}/>
                    </div>
                    <div className="ml-[50px] w-1/2 flex flex-col">
                    <div className="my-3 max-w-max">
                        <p className='border-b-2 text-2xl border-gray-500'>{title}</p>
                    </div>
                    <div className='h-full flex flex-col justify-between text-[14px] font-semibold mr-4'>
                        <div className="flex flex-col grow justify-between mb-2  max-w-[300px]">
                            <div className="w-full flex justify-between">
                                <p>Odometer:</p>
                                <p>{odometer} KM</p>
                            </div>
                            <div className="w-full flex justify-between"><p>Registered:</p><p>{registration}</p></div>
                            <div className="w-full flex justify-between"><p>Highlights:</p><p> Run and Drive</p></div>
                        </div>
                        <div className="flex flex-col w-[87%] justify-between h-[120px]">
                            <p>Condition:</p>
                            <CustomBulletChart title='Body' width={condition.body}/>
                            <CustomBulletChart title='Technical' width={condition.technical}/>
                        </div>
                    </div>
                </div>
            </div>

                {ManageCar && (
                    <div className="flex flex-col justify-between h-[290px]">
                        <div className="grow bg-gray-300 rounded-lg m-3">

                        </div>
                        <div className="h-[50px] text-emerald-50 flex justify-end">
                            <div className="mr-4 border-orange-500">
                                <button className="border-2 bg-yellow-500 rounded-3xl p-2.5 w-[120px] border-yellow-500">
                                    Use
                                </button>
                            </div>
                            <div className="mr-6">
                                <button className="border-2 bg-red-500 rounded-3xl p-2.5 w-24 border-red-500">
                                    Sell
                                </button>
                            </div>
                        </div>
                    </div>
                ) || <div className="w-full p-3">
                    <h1>Comment:</h1>
                    <div className="rounded-lg bg-gray-200 w-full min-h-[100px] p-2">
                        <p>All Bad, it`s so much old car</p>
                    </div>
                </div>}
            </div>
    )
})

    export default CardCar;