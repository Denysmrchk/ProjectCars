import {ProgressBar} from "@/components/ProgressBar";
import {FC, useState} from "react";
import {moneyOperation} from "@/app/mobx/MoneyOperation";
import {observer} from "mobx-react-lite";

interface JobComponentProps{
    title:string,
    description:string,
    payoffValue:number,
    timePerPoint:number,
}
const JobComponent:FC<JobComponentProps> = observer(({title, description, payoffValue,timePerPoint}) =>{
    const [progress, setProgress] = useState(0);
    const [localStatusWorking, setLocalStatusWorkingProgress] = useState(false);
    const {jobAddMoney,working,toggleWorkingStatus} = moneyOperation
    const startProgress = (value:number) => {
            setLocalStatusWorkingProgress(true)
            toggleWorkingStatus(true);
            let currentProgress = 0;
            const interval = setInterval(() => {
                currentProgress += 1;
                setProgress(currentProgress);
                if (currentProgress >= 100) {
                    clearInterval(interval);
                    toggleWorkingStatus(false)
                    setLocalStatusWorkingProgress(false)
                    jobAddMoney(value);
                }
            }, timePerPoint);
    };

    return (
        <div className="flex justify-between min-h-[150px] bg-white rounded-lg m-2">
            <div className="flex flex-col p-5">
                <div className="flex justify-start text-2xl">
                    <h1>{title}</h1>
                </div>
                <div>
                    <h3>{description}</h3>
                </div>
            </div>
            <div className="flex flex-col p-5 justify-between">
                <div className="flex justify-end">
                    <button className="w-[120px] rounded-lg p-3 border border-black bg-yellow-500"
                            onClick={() => startProgress(payoffValue)} disabled={working}>
                        {localStatusWorking ? 'Working...' : 'Start'}
                    </button>
                </div>
                <ProgressBar value={progress} color="rgb(34 197 94)"/>

            </div>
        </div>
    )
})
export default JobComponent;