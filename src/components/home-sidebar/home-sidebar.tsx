import { useState, useEffect } from 'react';

import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

import { useGetMenuCategories } from 'src/api/menu-categories';
import { MenuCategoryResponseSchema } from 'src/api/api-schemas';

// import SvgColor from 'src/components/svg-color';
// import Iconify from '../iconify';

// const TABS = [
//   {
//     value: 'one',
//     icon: <SvgColor src="/assets/icons/home/coffee.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Coffee',
//   },
//   {
//     value: 'two',
//     icon: <SvgColor src="/assets/icons/home/beverages.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Beverages',
//   },
//   {
//     value: 'three',
//     icon: <SvgColor src="/assets/icons/home/food.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Food',
//   },
//   {
//     value: 'four',
//     icon: <SvgColor src="/assets/icons/home/appetizer.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Appetizer',
//   },
//   {
//     value: 'five',
//     icon: <SvgColor src="/assets/icons/home/bread.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Bread',
//   },
//   {
//     value: 'six',
//     icon: <SvgColor src="/assets/icons/home/snack.svg" sx={{ width: 32, height: 32 }} />,
//     label: 'Snack',
//   },
// ];

const HomeSidebar = ({ categoryId, handleCategoryId }: any) => {
  const { menuCategories, menuCategoriesLoading } = useGetMenuCategories();

  const [menuCategoriesData, setMenuCategoriesData] = useState<MenuCategoryResponseSchema[]>([]);

  useEffect(() => {
    if (!menuCategoriesLoading && menuCategories.length) {
      setMenuCategoriesData(menuCategories);
      // console.log(menuCategories, 'MENU CATEGORIES');
    } else {
      setMenuCategoriesData([]);
    }
  }, [menuCategoriesLoading, menuCategories]);

  return (
    <Tabs
      value={categoryId}
      onChange={handleCategoryId}
      orientation="vertical"
      centered
      variant="standard"
      sx={{ mt: '12px' }}
    >
      {menuCategoriesData.map((tab: any) => (
        <Tab
          sx={{
            mx: 'auto',
            my: '6px',
            px: '6px',
            py: '10px',
            fontSize: '12px',
            width: '80px',
            height: '85px',
            borderRadius: '8px',
            background:
              categoryId === tab._id
                ? 'linear-gradient(218.57deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                : '',
            color: categoryId === tab._id ? 'white' : '',
          }}
          iconPosition="top"
          key={tab._id}
          // icon={<SvgColor src="/assets/icons/home/food.svg" sx={{ width: 32, height: 32 }} />}
          // icon={<Iconify icon={`mdi:${tab.icon}`} width={36} height={32} />}
          icon={<i className={`fi fi-tr-${tab.icon}`} style={{ fontSize: '32px' }} />}
          label={tab.name}
          value={tab._id}
        />
      ))}
    </Tabs>
  );
};

export default HomeSidebar;
