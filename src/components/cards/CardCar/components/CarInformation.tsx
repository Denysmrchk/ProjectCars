import { CustomBulletChart } from '@/components/charts/CustomBulletChart';
import React, { useState } from 'react';
import { Button, Dropdown, Menu, MenuProps } from 'antd';
import { DownOutlined } from '@ant-design/icons';

export const Condition = ({
  body,
  technical,
  conditionTextNone,
}: {
  body: number;
  technical: number;
  conditionTextNone?: boolean;
}) => {
  return (
    <>
      {!conditionTextNone ? <p>Condition:</p> : ''}
      <CustomBulletChart title="Body" width={body} />
      <CustomBulletChart title="Technical" width={technical} />
    </>
  );
};

export const ParameterLine = ({
  name,
  value,
  prefixValue,
}: {
  name: string;
  value: number | string | undefined;
  prefixValue?: string;
}) => {
  return (
    <div className="w-full h-fit flex justify-between">
      <p>{name}</p>
      <div className="border-b-[2px] border-dotted dark:border-gray-300 border-black-darkest flex-1 mx-2 my-[5px]"></div>
      <p>
        {value} {prefixValue}
      </p>
    </div>
  );
};

interface MenuItem {
  key: string;
  label: string;
}

const items: MenuItem[] = [
  { key: '1', label: 'Option 1' },
  { key: '2', label: 'Option 2' },
  { key: '3', label: 'Option 3' },
];

interface ISortMenuProps {
  items: { key: string; label: string }[];
  title: string;
  onValueChange: (value: string) => void;
}

export const ParameterPopup: React.FC<ISortMenuProps> = ({ items, title, onValueChange }) => {
  const [selectedValue, setSelectedValue] = useState<string>('Select a value');

  const handleMenuClick: MenuProps['onClick'] = (e) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem) {
      setSelectedValue(selectedItem.label);
      onValueChange(selectedItem.label);
    }
  };

  const menu: MenuProps = {
    items: items.map((item) => ({
      key: item.key,
      label: item.label,
    })),
    onClick: handleMenuClick,
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="dark:text-gray-200 text-black-darkest text-[18px]">{title}: </span>
      <Dropdown menu={menu}>
        <Button>
          {selectedValue} <DownOutlined />
        </Button>
      </Dropdown>
    </div>
  );
};
