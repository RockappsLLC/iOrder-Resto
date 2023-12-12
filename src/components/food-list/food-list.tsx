import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { useGetMenuItems } from 'src/api/menu-items';
import { useGetMenuCategories } from 'src/api/menu-categories';
import { MenuItemResponseSchema, MenuCategoryResponseSchema } from 'src/api/api-schemas';

import { useTranslate } from 'src/locales';

import AddOrderDialog from 'src/sections/dialogs/add-order';

import FoodItem from '../food-item';

const FoodList = ({ searchInput, currentTab }: any) => {
  const [modal, setModal] = useState(false);
  const [foodId, setFoodId] = useState('');

  const { t } = useTranslate();

  const { menuCategories, menuCategoriesLoading } = useGetMenuCategories();

  const [menuCategoriesData, setMenuCategoriesData] = useState<MenuCategoryResponseSchema[]>([]);

  useEffect(() => {
    if (!menuCategoriesLoading && menuCategories.length) {
      setMenuCategoriesData(menuCategories);
      // console.log(menuCategories, 'Menu Categories');
    } else {
      setMenuCategoriesData([]);
    }
  }, [menuCategoriesLoading, menuCategories]);

  const { menuItems, menuItemsLoading } = useGetMenuItems({ search: searchInput });

  const [menuItemsData, setMenuItemsData] = useState<MenuItemResponseSchema[]>([]);

  useEffect(() => {
    if (!menuItemsLoading && menuItems.length) {
      setMenuItemsData(menuItems);
      // console.log(menuItems, 'Menu Items');
    } else {
      setMenuItemsData([]);
    }
  }, [menuItemsLoading, menuItems]);

  return (
    <>
      <Grid container spacing={{ xs: 2, md: 3 }} sx={{ pl: 0 }}>
        {menuItemsData.length === 0 ? (
          <Typography fontSize={17} fontWeight={500} sx={{ m: 2 }}>
            {t('no_result_for_search')} "{searchInput}".
          </Typography>
        ) : (
          menuItemsData
            .filter((food) => {
              return menuCategoriesData.some(
                (category) => category._id === currentTab && food.menuCategoryId === currentTab
              );
            })
            .map((food: any) => (
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
