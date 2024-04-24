import { useState, useEffect, FC } from 'react';
import { auctionActions } from "@/app/mobx/Auction";
import { observer } from "mobx-react-lite";
import cn from "classnames";

interface ProgressBarAuction {}

const ProgressBar: FC<ProgressBarAuction> = observer(() => {
    const [value, setValue] = useState(0);
    const durationInSeconds = 2.5; // Количество секунд, за которое полоска заполнится
    const { auctionStatus, setStartAuction, bidderName } = auctionActions;

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (auctionStatus=='running...') {
            interval = setInterval(() => {
                if (value < 100) {
                    setValue((prevValue) => prevValue + (100 / (durationInSeconds * 10)));
                } else {
                    clearInterval(interval);
                    setValue(0);
                    setStartAuction('ended');
                    console.log(bidderName)
                }
            }, 100);
        } else {
            setValue(0);
        }

        return () => clearInterval(interval);
    }, [value, auctionStatus, setStartAuction, bidderName]);

    useEffect(() => {
        if (bidderName) {
            setValue(0); // Сбросить значение до 0 при изменении bidderName
        }
    }, [bidderName]);

    return (
        <div className="flex-1 mx-4">
            <div className="flex justify-center">
                <p className="mr-2">Status:</p>
                <p className={cn('text-green-500',{'text-red-500' : auctionStatus=='not started', 'text-orange-400' : auctionStatus=='ended'})}> {auctionStatus}</p></div>
            <div className="relative mt-4">
                <div className="absolute h-3 bg-gray-500 w-full"></div>
                <div className="absolute top-0 h-3 bg-green-500" style={{ width: `${value}%` }}></div>
            </div>
        </div>
    );
});

export default ProgressBar;;