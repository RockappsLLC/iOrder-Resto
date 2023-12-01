import { useState, useCallback } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

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
  const [currentTab, setCurrentTab] = useState('three');

  const [allOrders, setAllOrders] = useState([]);
  const [ordered, setOrdered] = useState(false);

  const [itemCounts, setItemCounts] = useState<{ _id: string; count: number }[]>([]);

  const [searchInput, setSearchInput] = useState('');
  const [foodCount, setFoodCount] = useState(1);

  const handleIncrement = (itemId: string) => {
    setItemCounts((prevCounts) => {
      const existingItem = prevCounts.find((countItem) => countItem._id === itemId);

      if (existingItem) {
        return prevCounts.map((countItem) =>
          countItem._id === itemId ? { ...countItem, count: countItem.count + 1 } : countItem
        );
      }

      return [...prevCounts, { _id: itemId, count: 1 }];
    });
  };

  const handleDecrement = (itemId: string) => {
    setItemCounts((prevCounts) => {
      const existingItem = prevCounts.find((countItem) => countItem._id === itemId);

      if (existingItem && existingItem.count > 0) {
        return prevCounts.map((countItem) =>
          countItem._id === itemId ? { ...countItem, count: countItem.count - 1 } : countItem
        );
      }

      return prevCounts;
    });
  };

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const renderSwitch = () => {
    switch (currentTab) {
      case 'one':
        return <div>Coffee</div>;
      case 'two':
        return <div>Beverages</div>;
      case 'three':
        return (
          <FoodList
            setOrdered={setOrdered}
            searchInput={searchInput}
            allOrders={allOrders}
            setAllOrders={setAllOrders}
            foodCount={foodCount}
            setFoodCount={setFoodCount}
            itemCounts={itemCounts}
            setItemCounts={setItemCounts}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        );
      case 'four':
        return <div>Appetizer</div>;
      case 'five':
        return <div>Bread</div>;
      case 'six':
        return <div>Snack</div>;
      default:
        return (
          <FoodList
            setOrdered={setOrdered}
            searchInput={searchInput}
            allOrders={allOrders}
            setAllOrders={setAllOrders}
            foodCount={foodCount}
            setFoodCount={setFoodCount}
            itemCounts={itemCounts}
            setItemCounts={setItemCounts}
            handleIncrement={handleIncrement}
            handleDecrement={handleDecrement}
          />
        );
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
        <HomeHeader searchInput={searchInput} setSearchInput={setSearchInput} />
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>{renderSwitch()}</Container>
      </Grid>
      <Grid item xs={1} md={3} sx={{ borderTop: 1, borderColor: '#E4E4E4' }}>
        <OrderSidebar
          ordered={ordered}
          allOrders={allOrders}
          itemCounts={itemCounts}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </Grid>
    </Grid>
  );
}
