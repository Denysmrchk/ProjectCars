import { makeAutoObservable } from 'mobx';
import { menuItemType } from '@/components/NavigationLine/typed';
import { arrayMenu } from '@/components/constants/NavigationLine';

class AppStore {
  selectedTitleCity: string = '';
  navigationList: menuItemType[] = arrayMenu;

  constructor() {
    makeAutoObservable(this);
  }

  setSelectedTitleCity = (category: string) => {
    this.selectedTitleCity = category;
  };
  setNotificationOnPage = (namePage: string, value: boolean) => {
    this.navigationList = this.navigationList.map((obj) => {
      if (obj.name === namePage) {
        return { ...obj, notification: value };
      }
      return obj;
    });
  };
  setNavigationList = (value: menuItemType[]) => {
    this.navigationList = value;
  };
}

export const appStore = new AppStore();
