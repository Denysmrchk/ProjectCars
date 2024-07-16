import CardCar from '@/components/cards/CardCar/CardCar';
import { CardAuctionController } from '../CardController/CardAuctionController';
import { auctionActions } from '@/components/mobx/Auction';
import { observer } from 'mobx-react-lite';
import { LoadingSpin } from '@/components/notifications/LoadingSpin';

export const AuctionBlock = observer(() => {
  const { currentIndexCar, arrayAuctionCars, loading } = auctionActions;
  return (
    <div className="flex min-h-[400px] max-w-[1440px] w-full gap-5 px-2.5">
      {loading ? (
        <LoadingSpin className="h-[350px]" />
      ) : (
        <>
          <div className="flex grow py-5">
            <CardCar
                {...arrayAuctionCars[currentIndexCar]}
                AuctionCard={true}
                index={currentIndexCar}
            />
          </div>
          <div className="border-l-[10px] border-gray-300 dark:border-gray-background h-full"></div>
          <div className="flex py-5">
          <CardAuctionController />
          </div>
        </>
      )}
    </div>
  );
});
