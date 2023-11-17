export interface FoodItemProps {
  food: {
    name: string;
    price: number;
    restaurantId: string;
    menuCategoryId: string;
    icon: string;
    status: boolean;
  };
  onClick: () => void;
}
