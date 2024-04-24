"use client"

import {useParams, useRouter} from "next/navigation";
import cn from 'classnames';
type menuItem= {
    name: string,
    link: string,
    selected: boolean,
}
const arrayMenu:menuItem[]= [
    {name: 'Home', link: '/', selected:false},
    {name: 'Map', link: '/map',  selected: false},
    {name: 'Stores', link: '/stores', selected: false},
    {name: 'Auction', link: '/auctions',  selected: false},
    {name: 'Jobs', link: '/jobs',  selected: false},
]
import React, {useEffect, useState} from 'react';
import Image from "next/image";
import {observer} from "mobx-react-lite";
import {appStore} from "@/app/mobx/CurrentPage";
import {moneyOperation} from "@/app/mobx/MoneyOperation";

const CategoryList: React.FC = observer(() => {
    const{ valueMoney,showPlusAnimation,plusMoney} = moneyOperation
    const router = useRouter();
    const params = useParams()
    const [selectedPageCategory, setSelectedPageCategory] = useState<string>('');
    const { selectedTitleCity } = appStore;

    useEffect(() => {
        // При монтировании компонента проверяем, есть ли сохраненная страница в localStorage
        const savedPage = localStorage.getItem('selectedPageCategory');
        if (savedPage) {
            setSelectedPageCategory(savedPage);
        }
    }, []);

    const onClickCategory = (item: menuItem) => {
        router.push(item.link);
        setSelectedPageCategory(item.name);
        localStorage.setItem('selectedPageCategory', item.name);
    };

    return (
        <div className="flex flex-row border-b-2 border-gray-200 justify-between items-center mt-10">
            <ul className="main-list-category">
                {arrayMenu.map((item: menuItem) => (
                    <li
                        key={item.name}
                        className={cn(
                            'p-2.5 cursor-pointer',
                            {'!bg-white text-blue-500 rounded-lg': selectedPageCategory === item.name}
                        )}
                        onClick={() => onClickCategory(item)}
                    >
                        {item.name}
                    </li>
                ))}
            </ul>
            <div className="flex items-center w-[200px] justify-between">
                <div className="flex items-center">
                    <Image width={25} height={15} src="/icons/icon-home.png" alt='home-icon' className="mr-2"/>
                    <p>{selectedTitleCity}</p>
                </div>
                <div className="relative min-w-[80px]">
                    <div className="text-xl p-3 text-green-500">${valueMoney}</div>
                    <div className={`absolute top-[42px] left-[30%] text-green-500 animate-fadeInOutTop ${showPlusAnimation ? '' : 'hidden'}`}>
                        +${plusMoney}
                    </div>
                </div>
            </div>
        </div>
    );
})

export default CategoryList;