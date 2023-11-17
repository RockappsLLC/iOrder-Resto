import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { getMenuItems } from 'src/api/menu-items';

import AddOrderDialog from 'src/sections/dialogs/add-order';

import FoodItem from '../food-item';

const dummy_data = [
  { id: 1, name: 'Beef', price: '21.2' },
  { id: 2, name: 'Beef', price: '21.2' },
  { id: 3, name: 'Beef', price: '21.2' },
  { id: 4, name: 'Beef', price: '21.2' },
  { id: 5, name: 'Beef', price: '21.2' },
  { id: 6, name: 'Beef', price: '21.2' },
  { id: 7, name: 'Beef', price: '21.2' },
  { id: 8, name: 'Beef', price: '21.2' },
];

const FoodList = () => {
  const [modal, setModal] = useState(false);
  // const [menuItems, setMenuItems] = useState();

  const fetcher = async () => {
    try {
      await getMenuItems();
      // setMenuItems(response.data.data?.menuItems);
      // console.log(response.data.data?.menuItems);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: 0 }}>
        {dummy_data.map((food: any) => (
          <Grid key={food.id} item xs={12} sm={6} md={4} lg={3}>
            <FoodItem
              food={food}
              onClick={() => {
                setModal(true);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <AddOrderDialog
        value={modal}
        hide={() => {
          setModal(false);
        }}
      />
    </>
  );
};

export default FoodList;
