"use client"
import Image from 'next/image';
import {DotMarker} from "@/components/DotMarker";
import {useState} from "react";
import {appStore} from "@/app/mobx/CurrentPage";

const PositionCity=[
    {selected:false,positionX:12.5,positionY:39, title:'San Fiero',
        infrastructure:[
        {stores:[{title:'ShopParts'}],auctions:[{title:'Copard'}]}
        ]},
    {selected:false,positionX:52,positionY:68.5, title:'Ballas',
        infrastructure:[
            {stores:[{title:'ShopParts'}],auctions:[{title:'BalAct'}]}
        ]},
    {selected:false,positionX:68.5,positionY:34, title:'Chicago',
        infrastructure:[
            {stores:[{title:'ShopParts'}],auctions:[{title:'Auction Chicago'}]}
        ]},
]

const PageCity = () => {
    const [cityData, setCityData] = useState(PositionCity);
    const {setSelectedTitleCity} = appStore;

    const handleMarkerClick = (title:string) => {
        const updatedCityData = cityData.map((item,) => {
            if (item.title === title) {
                return { ...item, selected: true };
            } else {
                return { ...item, selected: false };
            }
        });
        console.log(title)
        setCityData(updatedCityData);
        setSelectedTitleCity(title); // Обновляем selectedCategory при клике
    };
  return (
      <div className="min-h-[80vh]">
          <div className="relative scale-[0.8] max-w-[1400px] max-h-[750px]">
              <Image src="/pngwing.png" width={1400} height={800} alt="background"/>
              {cityData.map((item, index) => (
                      <DotMarker
                          key={item.title}
                          onClick={() => handleMarkerClick(item.title)}
                          positionX={item.positionX}
                          positionY={item.positionY}
                          selected={item.selected}/>
                  )
              )}
          </div>
      </div>
  );
};

export default PageCity;
