import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { getMenuItems } from 'src/api/menu-items';
// import { getMenuCategories } from 'src/api/menu-categories';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import AddOrderDialog from 'src/sections/dialogs/add-order';

import FoodItem from '../food-item';

const FoodList = ({
  setOrdered,
  setOrderDetails,
  foodCount,
  setFoodCount,
  searchInput,
  allOrders,
  setAllOrders,
}: any) => {
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState('');

  // const [menuCategories, setMenuCategories] = useState<MenuCategoryResponseSchema[]>();
  const [menuItems, setMenuItems] = useState<MenuItemResponseSchema[]>();

  // const data2 = {
  //   name: 'Pizza',
  //   icon: 'pizza',
  //   restaurantId: '65359426c665979a76591cae',
  // };

  // const addMenuCategory = async () => {
  //   const response = await createMenuCategory(data2);

  //   console.log(response.data);
  // };

  // const data = {
  //   name: 'Steak',
  //   price: 11,
  //   restaurantId: '655fa5fe4cc301f373a33a7b',
  //   menuCategoryId: '788a4ac6-8d35-43ea-8122-72068aa6e5gt',
  //   icon: 'icon',
  //   status: true,
  //   preparationTime: 3600000,
  // };

  // const addMenuItem = async () => {
  //   const response = await createMenuItem(data);

  //   console.log(response);
  // };

  const fetcher = async (query: string) => {
    try {
      // const response = await getMenuCategories();
      // const searchQuery = query?.length > 2 ? `search=${query}` : '';
      // console.log(query);

      const res = await getMenuItems();
      // setMenuCategories(response.data.data?.menuCategories);
      setMenuItems(res.data.data?.menuItems);
      // console.log(response.data.data?.menuCategories);
      // console.log(res.data.data?.menuItems);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher(searchInput);
  }, [searchInput]);

  return (
    <>
      {/* <Button onClick={addMenuItem}>addMenuItem</Button> */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: 0 }}>
        {menuItems?.map((food: any) => (
          <Grid key={food._id} item xs={12} sm={6} md={4} lg={3}>
            <FoodItem
              food={food}
              onClick={() => {
                setModal(true);
                setFoodId(food._id);
              }}
            />
          </Grid>
        ))}
      </Grid>
      <AddOrderDialog
        value={modal}
        foodId={foodId}
        hide={() => setModal(false)}
        setOrdered={setOrdered}
        setOrderDetails={setOrderDetails}
        foodCount={foodCount}
        setFoodCount={setFoodCount}
        allOrders={allOrders}
        setAllOrders={setAllOrders}
      />
    </>
  );
};

export default FoodList;
