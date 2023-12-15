import { useState, useEffect, ChangeEvent } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';

import { useTranslate } from 'src/locales';
import { useGetMenuItems } from 'src/api/menu-items';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import AddOrderDialog from 'src/sections/dialogs/add-order';

import FoodItem from '../food-item';
// import { Button } from '@mui/material';

const FoodList = ({ searchInput, categoryId }: any) => {
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { t } = useTranslate();

  const restaurantId = localStorage.getItem('restaurantId') || '';

  const { menuItems, menuItemsLoading, totalLength } = useGetMenuItems({
    restaurantId,
    offset: currentPage,
    limit: 11,
    categoryId,
    search: searchInput,
  });

  const [menuItemsData, setMenuItemsData] = useState<MenuItemResponseSchema[]>([]);

  useEffect(() => {
    if (!menuItemsLoading && menuItems.length) {
      setMenuItemsData(menuItems);
      // console.log(menuItems, 'Menu Items');
    } else {
      setMenuItemsData([]);
    }
  }, [menuItemsLoading, menuItems]);

  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId]);

  // const fetcher = async () => {
  //   const data = {
  //     icon: 'egg',
  //     isAdditional: true,
  //     menuCategoryId: '657c1ed2d76971d5f7b56deb',
  //     name: 'Egg',
  //     preparationTime: 36000,
  //     price: 1.2,
  //     restaurantId: '653590bec665979a76591c9a',
  //     status: true,
  //   };

  //   const response = await updateMenuItemById('657b45d8d76971d5f7b56a38', data);
  //   console.log(response);
  // };

  return (
    <>
      {/* <Button onClick={fetcher}>update</Button> */}
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: 0, pt: 3 }}>
        {menuItemsData.length === 0 ? (
          <Typography fontSize={17} fontWeight={500} sx={{ m: 2 }}>
            {t('no_data_founded')}.
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
      {totalLength > 11 && (
        <Pagination
          page={currentPage}
          onChange={(event: ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
          size="large"
          color="primary"
          count={Math.ceil(totalLength / 11) || 1}
          sx={{ display: 'flex', justifyContent: 'flex-end', my: 3 }}
        />
      )}
      <AddOrderDialog open={modal} foodId={foodId} hide={() => setModal(false)} />
    </>
  );
};

export default FoodList;
