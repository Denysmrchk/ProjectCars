import { useState, useEffect } from 'react';
import {auctionActions} from "@/app/mobx/Auction";

const useTimer = () => {
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const {setStartAuction} = auctionActions
    console.log(time)
    const startTimer = () => {
        setIsActive(true);
    };

    const resetTimer = () => {
        setIsActive(false);
        setTime(0);
    };
    let interval: NodeJS.Timeout;

    useEffect(() => {

        if (isActive) {
            let interval: NodeJS.Timeout;
            interval = setInterval(() => {
                setTime((prevTime) => prevTime - 1);
            }, 1000);
        } else {
            clearInterval(interval);
        }

        return () => clearInterval(interval);
    }, [isActive]);

    useEffect(() => {
        if (time === 0) {
            // setStartAuction(false);
            console.log('Время истекло!');
        }
    }, [time]);

    return { time, startTimer, resetTimer };
};

export default useTimer;