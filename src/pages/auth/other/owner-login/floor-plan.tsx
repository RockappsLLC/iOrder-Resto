import { useGetMenuItems } from 'src/api/menu-items';

import TablesView from 'src/sections/tables/view';

export default function FloorPlanView() {
  const { menuItems, menuItemsLoading } = useGetMenuItems();
  console.log(menuItems);
  return <TablesView />;
}
