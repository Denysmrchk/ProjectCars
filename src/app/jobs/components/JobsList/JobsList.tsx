import { JobBlock } from '@/app/jobs/components/JobsList/components/JobBlock';
import { exampleArray } from '../constants';

export const JobsList = () => {
  return (
    <div className="flex flex-col gap-10 w-full">
      {exampleArray.map((levelJobs, index) => (
        <JobBlock jobsArray={levelJobs} key={index} index={index} />
      ))}
    </div>
  );
};
