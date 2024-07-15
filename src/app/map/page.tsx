'use client';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { appStore } from '@/components/mobx/CurrentPage';
import { DotMarker } from '@/app/map/components/DotMarker';

const PositionCity = [
  {
    selected: true,
    positionX: 12.5,
    positionY: 39,
    title: 'San Fiero',
    infrastructure: [{ stores: [{ title: 'ShopParts' }], auctions: [{ title: 'Copard' }] }],
  },
  {
    selected: false,
    positionX: 52,
    positionY: 68.5,
    title: 'Ballas',
    infrastructure: [{ stores: [{ title: 'ShopParts' }], auctions: [{ title: 'BalAct' }] }],
  },
  {
    selected: false,
    positionX: 68.5,
    positionY: 34,
    title: 'Chicago',
    infrastructure: [
      { stores: [{ title: 'ShopParts' }], auctions: [{ title: 'CarActions Chicago' }] },
    ],
  },
];

const PageCity = () => {
  const [cityData, setCityData] = useState(PositionCity);
  const { setSelectedTitleCity } = appStore;
  useEffect(() => {
    setSelectedTitleCity('San Fiero');
  }, []);
  const handleMarkerClick = (title: string) => {
    const updatedCityData = cityData.map((item) => {
      if (item.title === title) {
        return { ...item, selected: true };
      } else {
        return { ...item, selected: false };
      }
    });
    setCityData(updatedCityData);
    setSelectedTitleCity(title); // Обновляем selectedCategory при клике
  };
  return (
    <div className="min-h-[80vh]">
      <div className="relative  scale-[0.8] max-w-[1400px] max-h-[750px]">
        <Image src="/pngwing.png" width={1400} height={800} alt="background" />
        {cityData.map((item, index) => (
          <DotMarker
            key={item.title}
            onClick={() => handleMarkerClick(item.title)}
            positionX={item.positionX}
            positionY={item.positionY}
            selected={item.selected}
          />
        ))}
      </div>
    </div>
  );
};

export default PageCity;
