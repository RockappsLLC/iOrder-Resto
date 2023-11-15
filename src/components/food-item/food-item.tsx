import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardActionArea from '@mui/material/CardActionArea';

import { FoodItemProps } from './types';

const FoodItem = ({ food }: FoodItemProps) => {
  const { name, price } = food;
  return (
    <Link href="/">
      <Card
        sx={{
          maxWidth: 345,
          textAlign: 'center',
        }}
      >
        <CardActionArea>
          <CardMedia component="img" height="140" image="/assets/images/food.png" alt="food" />
          <CardContent>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }} gutterBottom component="div">
              {name}
            </Typography>
            <Typography sx={{ fontSize: 16, fontWeight: 600 }} variant="body2" color="#F15F34">
              $ {price}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Link>
  );
};

export default FoodItem;
