export interface FoodItemProps {
  food: {
    id: string;
    name: string;
    price: number;
    restaurantId: string;
    menuCategoryId: string;
    icon: string;
    status: boolean;
  };
  onClick: () => void;
}
