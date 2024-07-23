import {ClipboardDocumentIcon} from "@heroicons/react/24/outline";
import React from "react";
import {garageManage} from "@/components/mobx/GarageManage";
import {LoadingSpin} from "@/components/notifications/LoadingSpin";
import {observer} from "mobx-react-lite";
import cn from "classnames";

export const SalesHistory = observer(() => {
const {salesHistory, loading} = garageManage

    return(
            <div className="flex flex-col bg-white rounded-lg p-5 grow h-[400px] dark:bg-neutral-600">
                <div className="border-b-2 mb-4 w-full">
                    <p className="text-lg">Sales History</p>
                </div>
                {loading ? (
                    <LoadingSpin />
                ) :
                    salesHistory.length ?
                        <div className="flex flex-col overflow-auto">
                            {salesHistory.slice().reverse().map((car)=> (
                    <div key={car.id} className="flex w-full h-fit justify-between border-2 border-gray-300 rounded-lg mb-3 p-3 dark:bg-gray-background dark:border-none">
                        <div>
                            <p>{car.title}</p>
                        </div>
                        <div className="flex text-red-500">
                        <p className={cn("",{
                            "text-green-500 before:content-['+']" : car.priceOnSale!==undefined&&car.priceOnSale > 1,
                            "text-green-500" : car.priceOnSale!==undefined&&car.priceOnSale === 0

                        })}>{car.priceOnSale} $</p>
                        </div>
                    </div>))}
                        </div>
                 : (
                    <div className="flex-center-content flex-col gap-5 w-full h-2/3 select-none">
                        <ClipboardDocumentIcon className="w-20 text-gray-500 dark:text-white opacity-60"/>
                        <p>You have not any sales :(</p>
                    </div>
                )}

            </div>
    )
})