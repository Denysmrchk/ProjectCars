import Image from "next/image";
import {FC} from "react";

export interface DotMarkerProps {
    onClick: () => void;
    selected?:boolean,
    positionX:number,
    positionY:number,
    title?:string,
    infrastructure?:[
        {stores:[{title:string}],
            auctions:[{title:string}]}
]}


export const DotMarker:FC<DotMarkerProps>= ({onClick, selected,positionX,positionY,title,infrastructure})=>{
    return (
        <div onClick={onClick} className="absolute w-7 h-7 flex justify-center items-center bg-blue-400 rounded-full hover:bg-blue-700 cursor-pointer" style={{top: `${positionY}%`, left: `${positionX}%`}}>
                <div className="w-5 h-5 flex justify-center items-center border-2 border-white rounded-full">
                    {selected &&
                        <Image
                            className="absolute opacity-80 hover:opacity-100 mb-[70px] scale-[2.5] z-[1]"
                            src="/placeholder-home.png"
                            width={128}
                            height={128}
                            alt='icon-map-marker'
                        />}
                </div>
        </div>
    )
}