import { makeAutoObservable } from 'mobx';

class MoneyOperation {
  valueMoney: number = 6000;
  showMoneyAnimation: boolean = false;
  working: boolean = false;
  changeWallet: {status: boolean, sign:'plus'|'minus'| null, value:number} = {status: false, sign:null, value: 0 }

  constructor() {
    makeAutoObservable(this);
  }

  setChangeWallet = (sign: 'plus'| 'minus', value: number ) => {
    this.changeWallet={status: true, sign:sign, value:value};
    this.showMoneyAnimation =true;
    this.valueMoney = sign == 'plus' ? this.valueMoney + value : this.valueMoney - value;
    setTimeout(()=>
            this.showMoneyAnimation=false
        , 1200)
    setTimeout(()=>
            this.showMoneyAnimation=false
        , 1400)

  }

  toggleWorkingStatus = (value: boolean) => {
    this.working = value;
  };


}

export const moneyOperation = new MoneyOperation();
