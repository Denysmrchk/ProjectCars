import { useEffect, useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Mousewheel, Scrollbar } from 'swiper/modules';
import CardCar from '@/components/cards/CardCar/CardCar';
import { auctionActions } from '@/components/mobx/Auction';
import { LoadingSpin } from '@/components/notifications/LoadingSpin';
import { observer } from 'mobx-react-lite';
import 'swiper/css';

export const AuctionList = observer(() => {
  const [isScrollEnabled, setIsScrollEnabled] = useState(false);
  const { arrayAuctionCars, loading } = auctionActions;
  const endOfBlock = useRef<HTMLDivElement>(null);
  const firstSlideRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const endOfPageObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsScrollEnabled(true);
        } else {
          setIsScrollEnabled(false);
        }
      },
      { threshold: 0.1 },
    );

    const firstSlideObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting) {
          setIsScrollEnabled(false);
        }
      },
      { threshold: 0.9 },
    );
    if (endOfBlock.current) {
      endOfPageObserver.observe(endOfBlock.current);
    }

    if (firstSlideRef.current) {
      firstSlideObserver.observe(firstSlideRef.current);
    }

    return () => {
      if (endOfBlock.current) {
        endOfPageObserver.unobserve(endOfBlock.current);
      }
      if (firstSlideRef.current) {
        firstSlideObserver.unobserve(firstSlideRef.current);
      }
    };
  }, [firstSlideRef.current]);

  return (
    <div className="bg-gray-300 z-10 dark:bg-gray-background content h-fit flex-center-content flex-col overflow-y-auto w-full rounded-lg">
      <div className="w-full py-2.5">
        <p className="font-semibold dark:text-gray-200 text-black-darkest text-xl wrapper-content">
          Auction`s Cars List
        </p>
      </div>
      {loading ? (
        <LoadingSpin className="h-[350px]" />
      ) : (
        <div className="w-full h-full mb-5 wrapper-content">
          <Swiper
            direction={'vertical'}
            slidesPerView={'auto'}
            freeMode={true}
            modules={[FreeMode, Scrollbar, Mousewheel]}
            style={{
              height: '90vh',
              width: '100%',
              overflow: isScrollEnabled ? 'auto' : 'hidden',
            }}>
            <SwiperSlide style={{ width: '100%', height: 'fit-content' }}>
              <div ref={firstSlideRef}></div>
              <div className="flex flex-col gap-2">
                {arrayAuctionCars.map((item, id) => (
                  <CardCar index={id} key={id} {...item} registration={item.registered} />
                ))}
              </div>
            </SwiperSlide>
          </Swiper>
          <div ref={endOfBlock}></div>
        </div>
      )}
    </div>
  );
});
