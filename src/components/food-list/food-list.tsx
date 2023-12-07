import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';

import { useGetMenuItems } from 'src/api/menu-items';
// import { getMenuCategories } from 'src/api/menu-categories';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import AddOrderDialog from 'src/sections/dialogs/add-order';

import FoodItem from '../food-item';
import Typography from '@mui/material/Typography';

const FoodList = ({ searchInput }: any) => {
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState('');

  // const [menuCategories, setMenuCategories] = useState<MenuCategoryResponseSchema[]>();

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

  // const searchQuery = query?.length > 2 ? `search=${query}` : '';

  const { menuItems, menuItemsLoading } = useGetMenuItems({ search: searchInput });

  const [menuItemsData, setMenuItemsData] = useState<MenuItemResponseSchema[]>([]);

  useEffect(() => {
    if (!menuItemsLoading && menuItems.length) {
      setMenuItemsData(menuItems);
    } else {
      setMenuItemsData([]);
    }
  }, [menuItemsLoading, menuItems]);

  return (
    <>
      {/* <Button onClick={addMenuItem}>addMenuItem</Button> */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: 0 }}>
        {menuItemsData.length === 0 ? (
          <Typography fontSize={17} fontWeight={500} sx={{ m: 2 }}>
            No result for search "{searchInput}"
          </Typography>
        ) : (
          menuItemsData.map((food: any) => (
            <Grid key={food._id} item xs={12} sm={6} md={4} lg={3}>
              <FoodItem
                food={food}
                onClick={() => {
                  setModal(true);
                  setFoodId(food._id);
                }}
              />
            </Grid>
          ))
        )}
      </Grid>
      <AddOrderDialog value={modal} foodId={foodId} hide={() => setModal(false)} />
    </>
  );
};

export default FoodList;
