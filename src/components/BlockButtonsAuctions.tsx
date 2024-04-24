import {auctionActions} from "@/app/mobx/Auction";
import {useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

export const BlockButtonsAuctions=observer(()=>{
    const {currentIndexCar,setCurrentIndexCar,priceCarAuction,setBidValue,bidValue,setStartAuction,currentValueAuction,auctionStatus, setBidder,bidderName,setCurrentValueAuction} = auctionActions
    const [disabledButton, setDisabledButton] = useState(false);
    const [disabledButtonSkip, setDisabledButtonSkip] = useState(false);
    const BidButtonClick = (value:number) =>{
            setStartAuction('running...');
            setDisabledButtonSkip(true)
            setCurrentValueAuction(value);
            setBidder("your bid")
            setDisabledButton(true)
            if (value < priceCarAuction) {
                const randomDelay = Math.floor(Math.random() * 1750) + 1000;
                setTimeout(() => {
                    setCurrentValueAuction(value + 50);
                    setBidder("opponent")
                    setDisabledButton(false)
                }, randomDelay)}
    }
    const SkipButtonClick = () =>{
        setCurrentIndexCar(currentIndexCar + 1)
    }
    useEffect(() => {
        if(auctionStatus==='ended'){setDisabledButtonSkip(false)}
    }, [auctionStatus]);
    // useEffect(()=>{
    //     if(auctionStatus=='running...'){BidButtonClick(bidValue+currentValueAuction)}
    // }, [auctionStatus])
    console.log(auctionStatus)
    return (
        <div className="flex justify-between items-center">
            <div className="flex items-center">
                <button
                    disabled={disabledButtonSkip}
                    onClick={() => SkipButtonClick()}
                    className="bg-red-300 hover:bg-red-500 text-white font-bold py-2 px-4 rounded">
                    Skip
                </button>
            </div>
            <div className="flex grow items-center justify-between rounded-full mx-2"
                 style={{maxWidth: '200px'}}>
                <button onClick={bidValue > 50 ? () => setBidValue(bidValue - 50) : undefined}
                        className="text-xl font-bold">-
                </button>
                <span className="text-lg mx-1">${priceCarAuction}</span>
                <button onClick={() => setBidValue(bidValue + 50)} className="text-xl font-bold">+</button>
            </div>
            <button
                onClick={() => BidButtonClick(currentValueAuction + bidValue)}
                disabled={disabledButton}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                Bid
            </button>
        </div>
    )
})