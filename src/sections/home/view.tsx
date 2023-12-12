import { useState, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import FoodList from 'src/components/food-list';
import { useSettingsContext } from 'src/components/settings';
import HomeHeader from 'src/components/home-header/home-header';
import HomeSidebar from 'src/components/home-sidebar/home-sidebar';
import OrderSidebar from 'src/components/order-sidebar/order-sidebar';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();

  const [currentTab, setCurrentTab]: any = useState('6535919fc665979a76591ca1');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: any) => {
    setCurrentTab(newValue);
  }, []);

  const [searchInput, setSearchInput] = useState('');

  // const renderSwitch = () => {
  //   switch (currentTab) {
  //     case 'one':
  //       return <div>Coffee</div>;
  //     case 'two':
  //       return <div>Beverages</div>;
  //     case 'three':
  //       return <FoodList searchInput={searchInput} />;
  //     case 'four':
  //       return <div>Appetizer</div>;
  //     case 'five':
  //       return <div>Bread</div>;
  //     case 'six':
  //       return <div>Snack</div>;
  //     default:
  //       return <FoodList searchInput={searchInput} />;
  //   }
  // };

  return (
    <Grid container columns={15} sx={{ height: '100%' }}>
      <Grid
        item
        xs={4}
        sm={2}
        md={1.5}
        lg={1}
        sx={{
          borderTop: 1,
          borderColor: '#E4E4E4',
        }}
      >
        <HomeSidebar currentTab={currentTab} handleChangeTab={handleChangeTab} />
      </Grid>
      <Grid
        item
        xs={11}
        sm={8}
        md={9.5}
        lg={11}
        sx={{ bgcolor: '#F8F9FD', border: 1, borderBottom: 0, borderColor: '#E4E4E4' }}
      >
        <HomeHeader searchInput={searchInput} setSearchInput={setSearchInput} />
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <FoodList searchInput={searchInput} currentTab={currentTab} />
        </Container>
      </Grid>
      <Grid item xs={15} sm={5} md={4} lg={3} sx={{ borderTop: 1, borderColor: '#E4E4E4' }}>
        <OrderSidebar />
      </Grid>
    </Grid>
  );
}
