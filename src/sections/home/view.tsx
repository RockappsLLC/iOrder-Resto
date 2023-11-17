import { useState, useEffect, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { getMenuCategories } from 'src/api/menu-categories';

import SvgColor from 'src/components/svg-color';
import FoodList from 'src/components/food-list';
import { useSettingsContext } from 'src/components/settings';
import HomeHeader from 'src/components/home-header/home-header';
import OrderSidebar from 'src/components/order-sidebar/order-sidebar';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'one',
    icon: <SvgColor src="/assets/icons/home/coffee.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Coffee',
  },
  {
    value: 'two',
    icon: <SvgColor src="/assets/icons/home/beverages.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Beverages',
  },
  {
    value: 'three',
    icon: <SvgColor src="/assets/icons/home/food.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Food',
  },
  {
    value: 'four',
    icon: <SvgColor src="/assets/icons/home/appetizer.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Appetizer',
  },
  {
    value: 'five',
    icon: <SvgColor src="/assets/icons/home/bread.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Bread',
  },
  {
    value: 'six',
    icon: <SvgColor src="/assets/icons/home/snack.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Snack',
  },
];

export default function HomeView() {
  const settings = useSettingsContext();
  // const [menuCategories, setMenuCategories] = useState([]);
  const [currentTab, setCurrentTab] = useState('three');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const fetcher = async () => {
    try {
      await getMenuCategories();
      // setMenuCategories(response.data.data?.menuCategories);
      // console.log(response.data.data?.menuCategories);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  const renderSwitch = () => {
    switch (currentTab) {
      case 'one':
        return <div>Coffee</div>;
      case 'two':
        return <div>Beverages</div>;
      case 'three':
        return <FoodList />;
      case 'four':
        return <div>Appetizer</div>;
      case 'five':
        return <div>Bread</div>;
      case 'six':
        return <div>Snack</div>;
      default:
        return <FoodList />;
    }
  };

  return (
    <Grid container columns={15} sx={{ height: '100%' }}>
      <Grid
        item
        xs={4}
        sm={2}
        md={2}
        lg={1}
        sx={{
          borderTop: 1,
          borderColor: '#E4E4E4',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          orientation="vertical"
          centered
          variant="standard"
        >
          {TABS.map((tab: any) => (
            <Tab
              sx={{
                mx: 'auto',
                my: '6px',
                px: '6px',
                py: '12px',
                fontSize: '12px',
                width: '77px',
                height: '78px',
                borderRadius: '8px',
                background:
                  currentTab === tab.value
                    ? 'linear-gradient(218.57deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                    : '',
                color: currentTab === tab.value ? 'white' : '',
              }}
              iconPosition="top"
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid
        item
        xs={11}
        sm={12}
        md={10}
        lg={11}
        sx={{ bgcolor: '#F8F9FD', border: 1, borderBottom: 0, borderColor: '#E4E4E4' }}
      >
        <HomeHeader />
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>{renderSwitch()}</Container>
      </Grid>
      <Grid item xs={0} md={3} sx={{ borderTop: 1, borderColor: '#E4E4E4' }}>
        <OrderSidebar />
      </Grid>
    </Grid>
  );
}
