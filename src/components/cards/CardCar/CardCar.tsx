import React, { FC } from 'react';
import { auctionActions } from '@/components/mobx/Auction';
import { observer } from 'mobx-react-lite';
import { ICardCarProps } from '@/components/cards/CardCar/types';
import { TypeGarageCard } from './components/GarageCard';
import { TypeAuctionCard } from './components/AuctionCard';
import { TypeAuctionListCard } from './components/AuctionListCard';

const CardCar: FC<ICardCarProps> = observer(
  ({
    GarageCard = false,
    index,
    AuctionCard = false,
    title,
    src,
    condition = { body: 20, technical: 25 },
    avrPrice,
    odometer = 99999,
    registration = '12.10.1988',
    price = 1000,
    priceOnSale = 1000,
    message = '',
    auctionStatus = '',
    commentText,
  }) => {
    const { currentIndexCar } = auctionActions;

    if (GarageCard) {
      return (
        <TypeGarageCard
          message={message}
          index={index}
          odometer={odometer}
          src={src}
          registration={registration}
          condition={condition}
          title={title}
          price={price}
          priceOnSale={priceOnSale}
          avrPrice={avrPrice}
        />
      );
    }
    if (AuctionCard) {
      return (
        <TypeAuctionCard
          odometer={odometer}
          src={src}
          registration={registration}
          condition={condition}
          title={title}
          index={currentIndexCar}
          avrPrice={avrPrice}
          commentText={commentText}
        />
      );
    }

    return (
      <TypeAuctionListCard
        odometer={odometer}
        src={src}
        registration={registration}
        condition={condition}
        title={title}
        index={index}
        currentIndexCar={currentIndexCar}
        auctionStatus={auctionStatus}
      />
    );
  },
);

export default CardCar;
