import { makeAutoObservable } from 'mobx';

class MoneyOperation {
    valueMoney: number = 0;
    showPlusAnimation: boolean = false;
    plusMoney: number = 0;
    working:boolean= false;

    constructor() {
        makeAutoObservable(this);
    }

    jobAddMoney = (value:number) => {
        this.valueMoney = this.valueMoney + value;
        this.plusMoney= value;
        this.showPlusAnimation= true;
        this.toggleAnimationPlus();

    }
    toggleAnimationPlus=()=>{
        setTimeout(() => {
            this.showPlusAnimation=false;
        }, 900);
}
    toggleWorkingStatus=(value:boolean) =>{
        this.working=value;
    }
}

export const moneyOperation  = new MoneyOperation();