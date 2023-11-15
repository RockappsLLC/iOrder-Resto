import { useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { getMenuItems } from 'src/api/menu-items';

import FoodItem from '../food-item/food-item';
// import { MenuItemResponseSchema } from 'src/api/api-schemas';

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
  // const [menuItems, setMenuItems] = useState();

  const fetcher = async () => {
    try {
      const response = await getMenuItems();
      // setMenuItems(response.data.data?.menuItems);
      console.log(response.data.data?.menuItems);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  return (
    <Grid container spacing={{ xs: 2, md: 3 }}>
      {dummy_data.map((food: any) => (
        <Grid key={food.id} item xs={12} sm={6} md={4} lg={3}>
          <FoodItem food={food} />
        </Grid>
      ))}
    </Grid>
  );
};

export default FoodList;
