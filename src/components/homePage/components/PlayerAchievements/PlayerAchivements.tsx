import { CustomBulletChart } from '@/components/charts/CustomBulletChart';

export const PlayerAchievements = () => {
  return (
    <div className="flex flex-col justify-between min-h-[550px] bg-white rounded-lg p-5 mb-4 dark:bg-neutral-600">
      <div className="flex min-h-fit w-full">
        <div className="border-b-2 mb-4 w-full">
          <p className="text-lg">Player Achievements</p>
        </div>
      </div>
      <div className="flex min-h-[100px]">
        <div className="w-1/3 min-w-[100px] flex-center-content">
          <div className=" text-white rounded-full bg-blue-400 w-[100px] h-[100px] flex-center-content flex-col">
            <p>Level:</p>
            <p>1</p>
          </div>
        </div>
        <div className="w-2/3 flex flex-col justify-between px-2.5">
          <p> buy cars: 0</p>
          <p> Total Earned Money: 0</p>
        </div>
      </div>
      <div className="flex items-center">
        <div className="w-full min-h-[100px]">
          <CustomBulletChart width={30} title="xp" />
        </div>
      </div>
    </div>
  );
};
