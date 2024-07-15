import { menuItemType } from '@/components/NavigationLine/typed';
import {
  BriefcaseIcon,
  BuildingLibraryIcon,
  HomeIcon,
  KeyIcon,
  MapIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export const arrayMenu: menuItemType[] = [
  { name: 'Home', link: '/', icon: HomeIcon, selected: false, notification: false },
  { name: 'Garage', link: '/garage', icon: KeyIcon, selected: false, notification: false },
  { name: 'Map', link: '/map', icon: MapIcon, selected: false, notification: false },
  { name: 'Stores', link: '/stores', icon: ShoppingCartIcon, selected: false, notification: false },
  {
    name: 'Auction',
    link: '/auctions',
    icon: BuildingLibraryIcon,
    selected: false,
    notification: false,
  },
  { name: 'Jobs', link: '/jobs', icon: BriefcaseIcon, selected: false, notification: false },
];
