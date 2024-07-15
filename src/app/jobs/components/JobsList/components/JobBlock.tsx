'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { FC, useState } from 'react';
import JobCard from '@/app/jobs/components/JobsList/components/JobCard';

type JobType = {
  title: string;
  description: string;
  timePerPoint: number;
  payoffValue: number;
};

interface JobBlockProps {
  jobsArray: { JobsList: JobType[]; level: number };
  index: number;
}
export const JobBlock: FC<JobBlockProps> = ({ jobsArray, index }) => {
  const [isVisibleList, setIsVisibleList] = useState(index == 0);
  return (
    <div className="flex flex-col w-full gap-5">
      <div
        onClick={() => setIsVisibleList(!isVisibleList)}
        className="text-[22px] cursor-pointer pb-2 dark:text-gray-300 border-b-[2.5px] border-gray-400 dark:border-gray-400">
        <h1 className="ml-10">Level {jobsArray.level}</h1>
      </div>
      {isVisibleList && (
        <div className="flex gap-4 overflow-x-scroll no-scrollbar rounded-lg">
          <Swiper slidesPerView={'auto'} spaceBetween={20}>
            {jobsArray.JobsList.map((item, index) => (
              <SwiperSlide key={item.title} style={{ width: 'max-content' }}>
                <JobCard {...item} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};
