import { FC, useState } from 'react';
import { moneyOperation } from '@/components/mobx/MoneyOperation';
import { observer } from 'mobx-react-lite';
import { ProgressBar } from '@/app/auctions/components/ProgressBar/ProgressBar';

interface JobCardProps {
  title: string;
  description: string;
  payoffValue: number;
  timePerPoint: number;
}
const JobCard: FC<JobCardProps> = observer(({ title, description, payoffValue, timePerPoint }) => {
  const [progress, setProgress] = useState(0);
  const [localStatusWorking, setLocalStatusWorkingProgress] = useState(false);
  const { working, toggleWorkingStatus, setChangeWallet } = moneyOperation;
  const startProgress = (value: number) => {
    setLocalStatusWorkingProgress(true);
    toggleWorkingStatus(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += 1;
      setProgress(currentProgress);
      if (currentProgress >= 100) {
        clearInterval(interval);
        toggleWorkingStatus(false);
        setLocalStatusWorkingProgress(false);
        setProgress(0);
        setChangeWallet('plus', value);
      }
    }, timePerPoint);
  };

  return (
    <div className="flex flex-col justify-between h-[250px] bg-white dark:text-gray-300 dark:bg-neutral-600 rounded-lg w-[300px] ">
      <div className="flex flex-col p-4 ">
        <div className="flex justify-start text-2xl text-nowrap">
          <h1>{title}</h1>
        </div>
        <div className="overflow-hidden h-[70px]">
          <h3>{description}</h3>
        </div>
      </div>
      <div className="flex flex-col p-5 pt-0 gap-2 items-center">
        <ProgressBar
          value={progress}
          color="rgb(34 197 94)"
          className={'w-28 dark:border-gray-300'}
        />
        <div className="flex justify-center">
          <button
            className="w-[140px] rounded-lg p-3 bg-yellow-500 dark:border-green-100 dark:text-black-darkest"
            onClick={() => startProgress(payoffValue)}
            disabled={working}>
            {localStatusWorking ? 'Working...' : 'Start'}
          </button>
        </div>
      </div>
    </div>
  );
});
export default JobCard;
