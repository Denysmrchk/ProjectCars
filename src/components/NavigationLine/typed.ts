import React from 'react';

export type menuItemType = {
  name: string;
  link: string;
  selected: boolean;
  icon: React.ElementType;
  notification?: boolean;
};
