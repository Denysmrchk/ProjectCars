"use client"
import {CustomBulletChart} from "@/components/CustomBulletChart";
import CardCar from "@/components/CardCar";
import React, {useRef} from "react";

export default function Home() {
    const [OpenPopUp, setOpenPopUp] = React.useState(false);
    const popupRef = useRef<HTMLDivElement>(null);

    const handleClickOutside = (event: React.MouseEvent) => {
        if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
            setOpenPopUp(false);
        }
    };
    return (
    <main className="w-full flex">
            {OpenPopUp && (
                <div
                    onClick={(event)=>handleClickOutside(event)}
                    style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                    className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 popup">
                    <div ref={popupRef} className="bg-white p-5 rounded-lg w-[1000px] mx-5">
                        <CardCar index={0} AuctionCard={true} title='Reno' src="/cars/reno.jpg"
                            condition={{body: 30, technical: 20}} avrPrice={3000} odometer={12313210}
                            registration="19.12.2000" GarageCard={false}
                            setPopUpOpen={setOpenPopUp} ManageCar={true}
                            />
                    </div>
                </div>
            )}
            <div className="flex flex-col w-2/5 min-w-[200px] h-[83vh] m-2.5">
                <div className="flex flex-col justify-between min-h-[350px] bg-white rounded-lg p-5 mb-4 ">
                    <div className="flex min-h-fit w-full">
                        <div className="border-b-2 mb-4 w-full">
                            <p className="text-lg">Player Achievement</p>
                        </div>
                    </div>
                    <div className="flex min-h-[100px]">
                        <div className="w-1/3 min-w-[100px] flex justify-center items-center">
                            <div
                                className=" text-white rounded-full bg-blue-400 w-[100px] h-[100px] flex flex-col justify-center items-center">
                                <p>Level:</p>
                                <p>1</p>
                            </div>
                        </div>
                        <div className="w-2/3  flex flex-col items-center px-2.5 justify-between">
                            <p> buy cars: 0</p>
                            <p> Total Earned Money: 0</p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <div className="w-full min-h-[100px]">
                            <CustomBulletChart width={30} title='xp'/>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col bg-white rounded-lg p-5 grow min-h-[200px]">
                    <div className="border-b-2 mb-4 w-full">
                        <p className="text-lg">Sales History</p>
                    </div>
                    <div className="flex flex-col grow overflow-auto h-full p-1 min-h-[200px]">
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-red-500 text-[18px]">-1122$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-green-500 text-[18px]">+432$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-green-500 text-[18px]">+432$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-red-500 text-[18px]">-1122$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-green-500 text-[18px]">+432$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-green-500 text-[18px]">+432$</p>
                        </div>
                        <div
                            className="w-full bg-gray-200 border border-gray-300 rounded-lg mb-3 p-3 flex justify-between">
                            <p>Reno</p>
                            <p className="text-green-500 text-[18px]">+432$</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col grow max-h-[83vh] !min-h-[350px] bg-white rounded-lg p-5 m-2.5">
                <div className="border-b-2 mb-4 w-full">
                    <p className="text-lg">Garage</p>
                </div>
                <div className="flex flex-col overflow-auto h-full">
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg"
                             condition={{body: 30, technical: 20}} avrPrice={3000} odometer={12313210}
                             registration="19.12.2000" GarageCard={true}
                             setPopUpOpen={setOpenPopUp}
                    />
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg"
                             condition={{body: 30, technical: 20}} avrPrice={3000} odometer={12313210}
                             registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg"
                             condition={{body: 30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>
                    <CardCar index={0} AuctionCard={false} title='Reno' src="/cars/reno.jpg" condition={{body:30, technical:20}} avrPrice={3000} odometer={12313210} registration="19.12.2000" GarageCard={true}/>

                </div>
            </div>
    </main>
  );
}
