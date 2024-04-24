import {FC} from "react";
interface calcPriceOfCarProps{
    odometer: number,
    condition: {body:number, technical:number},
    avrPrice:number,
}
export const calcPriceCar = ({ odometer = 1, condition = { body: 1, technical: 1 }, avrPrice = 1 }: calcPriceOfCarProps) => {
    const bodyCoefficient = (condition.body - 100) / 100;
    const technicalCoefficient = (condition.technical - 100) / 100;

    const price = avrPrice * (1 - (odometer / 1000000) * bodyCoefficient) * (1 + technicalCoefficient);

    return price;
}

export const RandomPriceAuction = (value: number): number => {
    const randomMultiplier = Math.random() * 0.7 + 0.6;
    const randomPrice = value * randomMultiplier;
    return parseFloat(randomPrice.toFixed(2));
};