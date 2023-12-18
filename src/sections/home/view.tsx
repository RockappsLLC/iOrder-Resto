import { useState, useEffect, useCallback } from 'react';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';

import { useGetMenuCategories } from 'src/api/menu-categories';

import FoodList from 'src/components/food-list';
import { useSettingsContext } from 'src/components/settings';
import HomeHeader from 'src/components/home-header/home-header';
import HomeSidebar from 'src/components/home-sidebar/home-sidebar';
import OrderSidebar from 'src/components/order-sidebar/order-sidebar';

// ----------------------------------------------------------------------

export default function HomeView() {
  const settings = useSettingsContext();
  // const [reservationList, setReservationList] = useState(false);
  // const [newReservation, setNewReservation] = useState(false);
  // const [guestDetail, setGuestDetail] = useState(false);

  const { menuCategories, menuCategoriesLoading } = useGetMenuCategories();
  const [categoryId, seCategoryId]: any = useState('');

  useEffect(() => {
    if (!menuCategoriesLoading && menuCategories.length) {
      seCategoryId(menuCategories[0]?._id as string);
    } else {
      seCategoryId('');
    }
  }, [menuCategoriesLoading, menuCategories]);

  const handleCategoryId = useCallback((event: React.SyntheticEvent, newValue: string) => {
    seCategoryId(newValue);
  }, []);

  const [searchInput, setSearchInput] = useState('');

  // <Container maxWidth={settings.themeStretch ? false : 'xl'}>
  // <Button onClick={() => setReservationDrawer(true)}>Open Drawer</Button>
  // <ReservationList open={reservationDrawer} hide={() => setReservationDrawer(false)} />

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
        <HomeSidebar categoryId={categoryId} handleCategoryId={handleCategoryId} />
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
          <FoodList searchInput={searchInput} categoryId={categoryId} />
        </Container>
      </Grid>
      <Grid item xs={15} sm={5} md={4} lg={3} sx={{ borderTop: 1, borderColor: '#E4E4E4' }}>
        <OrderSidebar />
      </Grid>
    </Grid>
    /*  <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Page Home </Typography>
        <Button onClick={() => setReservationList(true)}>Reservation</Button>
    const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <>
      <Container maxWidth={settings.themeStretch ? false : 'xl'}>
        <Typography variant="h4"> Page Home </Typography>
        <Button onClick={() => setOpenDrawer(true)}>Open Drawer</Button>        
        <Box
          sx={{
            mt: 5,
            width: 1,
            height: 320,
            borderRadius: 2,
            bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
            border: (theme) => `dashed 1px ${theme.palette.divider}`,
          }}
        />
      </Container>
      <NewReservation open={reservationDialog} hide={() => setReservationDialog(false)} />
      <ReservationList open={reservationDrawer} hide={() => setReservationDrawer(false)} />
        </> 
      <GuestDetail open={guestDetail} hide={() => setGuestDetail(false)} />
      <ReservationList
        open={reservationList}
        hide={() => setReservationList(false)}
        newReservation={() => setNewReservation(true)}
      />
      <NewReservation
        open={newReservation}
        hide={() => setNewReservation(false)}
        guestDetail={() => setGuestDetail(true)}
      />
      <GuestDetail
        open={guestDetail}
        hide={() => setGuestDetail(false)}
        stepBack={() => setNewReservation(true)}
      />
      <RunningOrders open={openDrawer} hide={() => setOpenDrawer(false)} />
    </> */
  );
}
