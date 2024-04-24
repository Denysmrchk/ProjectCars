import { makeAutoObservable } from 'mobx';

class AppStore {
    selectedTitleCity: string = '';

    constructor() {
        makeAutoObservable(this);
    }

    setSelectedTitleCity = (category:string) => {
        this.selectedTitleCity = category;
    }
}

export const appStore = new AppStore();