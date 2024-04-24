import cn from "classnames";
import ProgressBarAuction from "@/components/ProgressBarAuction";
import {BlockButtonsAuctions} from "@/components/BlockButtonsAuctions";
import {auctionActions} from "@/app/mobx/Auction";
import {observer} from "mobx-react-lite";

export const CardAuctionController = observer(() => {
    const {currentValueAuction,bidderName,auctionStatus} = auctionActions

    return (
        <div className="max-w-[300px] bg-white border border-gray-300 rounded-lg ml-0 flex flex-col">
            <div className="flex flex-col justify-center items-center grow">
                <div className={cn("h-24 w-24 flex flex-col items-center justify-center bg-green-500 rounded-full", {
                    '!bg-red-500': bidderName == 'opponent'
                })}>
                    {auctionStatus == 'not started' && <span  className="flex text-center font-bold text-xl">{currentValueAuction}</span>}
                    {auctionStatus=='running...' &&
                        <><span
                        className={cn("font-bold text-xl", {'mt-2': bidderName == 'opponent'})}>{currentValueAuction}</span>
                         <span className="flex text-center">{(bidderName == 'opponent' ? 'Opponent' + ' bid' : 'Your bid!')}</span>
                          </>
                    }
                    {auctionStatus=='ended' && <div  className="flex text-center font-bold text-xl flex-col"><p>Win</p><p>{bidderName}</p></div>}
                </div>
                <div className="mt-8">
                    {auctionStatus == 'ended' ? <div className="flex justify-center items-center"><p className="mr-2">Won bid:</p><p className="text-green-500 text-lg">${currentValueAuction}</p></div> : <span>Current bid</span>}
                </div>
            </div>
            <ProgressBarAuction/>
            <BlockButtonsAuctions/>
        </div>
    )
})