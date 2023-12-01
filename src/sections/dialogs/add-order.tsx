import { useState, useEffect } from 'react';

import Fab from '@mui/material/Fab';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { getMenuItem } from 'src/api/menu-items';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';

// ----------------------------------------------------------------------

export default function AddOrderDialog({
  value,
  hide,
  foodId,
  setOrdered,
  allOrders,
  setAllOrders,
  foodCount,
  setFoodCount,
  itemCounts,
  setItemCounts,
  handleIncrement,
  handleDecrement,
}: any) {
  const [foodItem, setFoodItem] = useState<MenuItemResponseSchema>();

  const [additionalCount1, setAdditionalCount1] = useState(0);
  const [additionalCount2, setAdditionalCount2] = useState(0);
  const [additionalCount3, setAdditionalCount3] = useState(0);

  useEffect(() => {
    const resetInputs = () => {
      setFoodCount(1);
      setAdditionalCount1(0);
      setAdditionalCount2(0);
      setAdditionalCount3(0);
    };

    const fetchData = async () => {
      try {
        const response = await getMenuItem(foodId);
        setFoodItem(response.data.data);
        resetInputs();
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [foodId, setFoodCount]); // Include resetInputs in the dependency array

  const handleOrder = () => {
    setAllOrders([...allOrders, foodItem]);
    setOrdered(true);
    hide();
  };

  const total =
    foodItem?.price !== undefined &&
    foodItem.price * foodCount +
      4 * additionalCount1 +
      2 * additionalCount2 +
      0.87 * additionalCount3;

  return (
    <Dialog fullWidth open={value} onClose={hide}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ py: 2 }}>Add Order</DialogTitle>
        <Button onClick={hide}>
          <Iconify icon="tabler:x" />
        </Button>
      </div>

      <Divider />
      <DialogContent>
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            bgcolor: '#F8F9FD',
            px: 2,
            my: 3,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '74px', borderRadius: '12px' }}
            component="img"
            height="74px"
            image="/assets/images/food.png"
            alt="food"
          />
          <CardContent sx={{ width: '100%', pr: 0 }}>
            <Typography fontSize={16} fontWeight={600} gutterBottom component="div">
              {foodItem?.name}
            </Typography>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
              <div>
                <Typography
                  fontSize={12}
                  fontWeight={400}
                  color="#9C9C9C"
                  sx={{ mb: 0 }}
                  component="div"
                >
                  Price
                </Typography>
                <Typography fontSize={16} fontWeight={600} variant="body2" color="#F15F34">
                  $ {foodItem?.price}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Fab
                  onClick={() => setFoodCount((prevCount: number) => prevCount - 1)}
                  disabled={
                    itemCounts.find((countItem: any) => countItem._id === foodItem?._id)?.count ===
                    1
                  }
                  sx={{ width: '36px', height: '36px' }}
                  color="default"
                  aria-label="add"
                >
                  <Iconify icon="tabler:minus" width={20} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  {/* {itemCounts.find((countItem: any) => countItem._id === foodItem?._id)?.count || 1} */}
                  {foodCount}
                </Typography>
                <Fab
                  onClick={() => setFoodCount((prevCount: number) => prevCount + 1)}
                  sx={{ width: '36px', height: '36px' }}
                  color="inherit"
                  aria-label="add"
                >
                  <Iconify icon="tabler:plus" width={20} />
                </Fab>
              </div>
            </div>
          </CardContent>
        </Card>
        <Typography fontSize={16} fontWeight={600}>
          Additional
        </Typography>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Rice
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 4
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {additionalCount1 > 0 && (
              <>
                <Fab
                  onClick={() => setAdditionalCount1((prevCount: number) => prevCount - 1)}
                  sx={{ width: '36px', height: '36px' }}
                  color="default"
                  aria-label="add"
                >
                  <Iconify icon="tabler:minus" width={20} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  {additionalCount1}
                </Typography>
              </>
            )}
            <Fab
              onClick={() => setAdditionalCount1((prevCount: number) => prevCount + 1)}
              sx={{ width: '36px', height: '36px' }}
              color="inherit"
              aria-label="add"
            >
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Extra sauce
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 2
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {additionalCount2 > 0 && (
              <>
                <Fab
                  onClick={() => setAdditionalCount2((prevCount: number) => prevCount - 1)}
                  sx={{ width: '36px', height: '36px' }}
                  color="default"
                  aria-label="add"
                >
                  <Iconify icon="tabler:minus" width={20} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  {additionalCount2}
                </Typography>
              </>
            )}

            <Fab
              onClick={() => setAdditionalCount2((prevCount: number) => prevCount + 1)}
              sx={{ width: '36px', height: '36px' }}
              color="inherit"
              aria-label="add"
            >
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            paddingLeft: 2,
            paddingRight: 2,
            marginTop: 16,
          }}
        >
          {/* //  <CardActionArea */}
          <CardMedia
            sx={{ width: '44px', borderRadius: '12px' }}
            component="img"
            height="44px"
            image="/assets/images/food.png"
            alt="food"
          />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '100%',
              paddingLeft: 20,
            }}
          >
            <Typography
              sx={{ display: 'flex', alignItems: 'center' }}
              fontSize={14}
              fontWeight={600}
            >
              Egg
            </Typography>
            <Typography fontSize={14} variant="body2">
              $ 0.87
            </Typography>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            {additionalCount3 > 0 && (
              <>
                <Fab
                  onClick={() => setAdditionalCount3((prevCount: number) => prevCount - 1)}
                  sx={{ width: '36px', height: '36px' }}
                  color="default"
                  aria-label="add"
                >
                  <Iconify icon="tabler:minus" width={20} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  {additionalCount3}
                </Typography>
              </>
            )}

            <Fab
              onClick={() => setAdditionalCount3((prevCount: number) => prevCount + 1)}
              sx={{ width: '36px', height: '36px' }}
              color="inherit"
              aria-label="add"
            >
              <Iconify icon="tabler:plus" width={20} />
            </Fab>
          </div>
        </div>

        <Divider sx={{ my: '24px' }} />

        <Typography color="#828487" fontSize={12} fontWeight={500}>
          Add Note
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: '5px' }}
          placeholder="Type your note here..."
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography color="#828487" fontSize={14}>
            Total
          </Typography>
          <Typography color="#19191C" fontSize={16} fontWeight={600}>
            $ {total}
          </Typography>
        </div>
        <Button
          onClick={handleOrder}
          disabled={allOrders.find((order: any) => order._id === foodItem?._id)}
          sx={{ borderRadius: '58px', px: 6, py: 1.5, ':hover': { bgcolor: '#f2734e' } }}
          color="primary"
          variant="contained"
        >
          {allOrders.find((order: any) => order._id === foodItem?._id)
            ? 'Already ordered'
            : 'Add to order'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
