"use client"
import Image from "next/image";

export default function Home() {
    return (
        <main className="bg-white min-h-[84vh] p-[15px] rounded-lg flex">
            <div className="flex flex-wrap w-full">
                <div className="flex flex-col bg-gray-400 rounded-lg m-4 h-[320px] w-[280px] cursor-pointer items-center">
                    <Image src='/icons/body-shop-img.jpg' alt='body-shop' width={280} height={400} className="object-cover w-full h-[250px]" />
                    <div className="flex w-full">
                        <p className="text-pink-300 font-bold text-[30px] mt-3
                        ">Body Parts</p>
                    </div>
                </div>
                <div className="bg-gray-400 rounded-lg m-4 h-[320px] w-[280px] cursor-pointer">
                    <Image src='/icons/technic-shop-img.jpg' alt='body-shop' width={280} height={400} className="object-cover w-full h-[250px]" />
                    <div className="flex w-full">
                        <p className="text-white font-bold text-[30px] mt-3
                        ">Spare parts</p>
                    </div>
                </div>
            </div>
        </main>
    );
}


