import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// import { getMenuCategories } from 'src/api/menu-categories';

import Iconify from '../iconify';

const TABS = [
  {
    value: 'one',
    icon: <Iconify icon="solar:phone-bold" width={24} />,
    label: 'Item One',
  },
  {
    value: 'two',
    icon: <Iconify icon="solar:heart-bold" width={24} />,
    label: 'Item Two',
  },
  {
    value: 'three',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Item Three',
  },
  {
    value: 'four',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Item Four',
  },
  {
    value: 'five',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Item Five',
  },
  {
    value: 'six',
    icon: <Iconify icon="eva:headphones-fill" width={24} />,
    label: 'Item Six',
  },
];

const SideBar = () => {
  // const [menuCategories, setMenuCategories] = useState([]);
  const [currentTab, setCurrentTab] = useState('one');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const fetcher = async () => {
    try {
      // const response = await getMenuCategories();
      // setMenuCategories(response.data.data?.menuCategories);
      // console.log(response.data.data?.menuCategories);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <Tabs value={currentTab} onChange={handleChangeTab} orientation="vertical">
      {TABS.map((tab: any) => (
        <Tab
          iconPosition="top"
          key={tab.value}
          icon={tab.icon}
          label={tab.label}
          value={tab.value}
        />
      ))}
    </Tabs>
  );
};

export default SideBar;
