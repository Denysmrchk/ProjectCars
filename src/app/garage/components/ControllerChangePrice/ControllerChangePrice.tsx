import { CircularChart } from '@/components/charts/CircularChart';
import { RangeSlider } from '@/components/charts/RangeSlider';
import React, { FC, useEffect, useState } from 'react';
interface IChangePriceProps {
  step: number;
  maxValue: number;
  minValue: number;
  priceCar: number;
  setPriceOnSale: (value: number) => void;
}
export const ControllerChangePrice: FC<IChangePriceProps> = ({
  maxValue,
  minValue,
  step,
  priceCar,
  setPriceOnSale,
}) => {
  const [inputValue, setInputValue] = useState(priceCar);
  const pricePercent = (inputValue / maxValue) * 100;
  useEffect(() => {
    setPriceOnSale(inputValue);
  }, [inputValue]);
  return (
    <div className="flex flex-col items-center w-[250px]">
      <div className="flex h-[150px] w-[150px]">
        <CircularChart value={pricePercent} />
      </div>
      <div className="flex justify-center h-full w-full">
        <RangeSlider
          step={step}
          priceCar={priceCar}
          minValue={minValue}
          maxValue={maxValue}
          inputValue={inputValue}
          setInputValue={setInputValue}
        />
      </div>
    </div>
  );
};
