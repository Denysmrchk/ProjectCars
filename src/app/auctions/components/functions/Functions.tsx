import { fetchAllCarsType } from '@/components/cards/CardCar/types';
import { methodArray } from '@/components/hooks/methodArray';
import { carComments } from '@/components/cards/CardCar/constants';

interface calcPriceOfCarProps {
  odometer: number;
  condition: { body: number; technical: number };
  avrPrice: number;
}
export const calcPriceCar = ({ odometer, condition, avrPrice }: calcPriceOfCarProps) => {
  const bodyCoefficient = (condition.body - 100) / 100;
  const technicalCoefficient = (condition.technical - 100) / 100;
  const price = Math.floor(
    avrPrice * ((1 - odometer / 850000 + (1 + bodyCoefficient) + (1 + technicalCoefficient)) / 3),
  );
  return price;
};

export const RandomPriceAuction = (value: number): number => {
  const randomMultiplier = Math.random() * 0.8 + 0.5;
  const cheapCar = Math.random() * 0.5 + 0.5;
  const randomPrice = value > 3000 ? value * randomMultiplier : value * cheapCar;
  return parseFloat(randomPrice.toFixed(2));
};

export function getRandomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function getRandomElement(array: any) {
  return array[getRandomInt(0, array.length - 1)];
}

export function shuffleArray(array: any) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

export function addRandomProperties(cars: fetchAllCarsType[]) {
  return cars.map((car: fetchAllCarsType) => ({
    ...car,
    category: 'auctionCar',
    odometer: getRandomInt(0, 500000),
    condition: {
      body: getRandomInt(0, 100),
      technical: getRandomInt(0, 100),
    },
    registered: getRandomElement(car.YOI),
    auctionStatus: 'not started',
    commentText: methodArray.getRandomElementOfArray(carComments),
  }));
}
export const MakeIndention = (value: string) => {
  const firstSpaceIndex = value.indexOf(' ');
  const firstWord = value.substring(0, firstSpaceIndex);
  const restOfComment = value.substring(firstSpaceIndex);
  return (
    <>
      <span className="ml-5">{firstWord}</span>
      {restOfComment}
    </>
  );
};
