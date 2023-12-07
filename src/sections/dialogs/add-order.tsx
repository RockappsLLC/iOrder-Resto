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

import { useGetMenuItem } from 'src/api/menu-items';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import { useOrderContext } from 'src/components/order-sidebar/context';

// ----------------------------------------------------------------------

const extrasSample = [
  {
    _id: '1',
    name: 'Rice',
    price: 3,
    count: 0,
  },
  {
    _id: '2',
    name: 'Egg',
    price: 1.2,
    count: 0,
  },
];

const defaultOrder = {
  count: 1,
  extras: extrasSample,
};

export default function AddOrderDialog({ value, hide, foodId }: any) {
  const { orders, addOrder, setOrdered } = useOrderContext();

  const { menuItem, menuItemLoading } = useGetMenuItem(foodId);
  const [order, setOrder] = useState<
    MenuItemResponseSchema & { count: number; extras: typeof extrasSample }
  >(defaultOrder);

  useEffect(() => {
    if (!menuItemLoading) {
      setOrder(menuItem ? { ...defaultOrder, ...menuItem } : defaultOrder);
    }
  }, [menuItemLoading, menuItem]);

  const handleAddOrder = () => {
    if (orders.find((_order: any) => _order._id === order?._id)) {
      hide();
      return;
    }
    addOrder(order);
    setOrdered(true);
    hide();
  };

  const handleDecreaseExtra = (id: string) => {
    const extras = order.extras.map((extra) => {
      if (extra._id === id) {
        return { ...extra, count: extra.count - 1 };
      }
      return extra;
    });
    setOrder({ ...order, extras });
  };

  const handleIncreaseExtra = (id: string) => {
    const extras = order.extras.map((extra) => {
      if (extra._id === id) {
        return { ...extra, count: extra.count + 1 };
      }
      return extra;
    });
    setOrder({ ...order, extras });
  };

  if (!menuItem) return null;

  const extrasTotal = order.extras.reduce(
    (acc, obj) => acc + Number(obj.price || 0) * Number(obj.count || 0),
    0
  );
  const price = Number(order.price || 0);

  const total = (price + extrasTotal) * Number(order.count || 0);

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
              {menuItem.name}
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
                  $ {menuItem.price}
                </Typography>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                <Fab
                  onClick={() => setOrder({ ...order, count: order.count - 1 })}
                  disabled={order.count === 1}
                  sx={{ width: '36px', height: '36px' }}
                  color="default"
                  aria-label="add"
                >
                  <Iconify icon="tabler:minus" width={20} />
                </Fab>
                <Typography fontSize={16} fontWeight={600}>
                  {order.count}
                </Typography>
                <Fab
                  onClick={() => setOrder({ ...order, count: order.count + 1 })}
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

        {order.extras.map((extra) => (
          <div
            key={extra._id}
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
                {extra.name}
              </Typography>
              <Typography fontSize={14} variant="body2">
                $ {extra.price}
              </Typography>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              {extra.count > 0 && (
                <>
                  <Fab
                    onClick={() => handleDecreaseExtra(extra._id)}
                    sx={{ width: '36px', height: '36px' }}
                    color="default"
                    aria-label="add"
                  >
                    <Iconify icon="tabler:minus" width={20} />
                  </Fab>
                  <Typography fontSize={16} fontWeight={600}>
                    {extra.count}
                  </Typography>
                </>
              )}
              <Fab
                onClick={() => handleIncreaseExtra(extra._id)}
                sx={{ width: '36px', height: '36px' }}
                color="inherit"
                aria-label="add"
              >
                <Iconify icon="tabler:plus" width={20} />
              </Fab>
            </div>
          </div>
        ))}

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
          disabled={orders.find((o: any) => o._id === order._id)}
          onClick={handleAddOrder}
          sx={{ borderRadius: '58px', px: 6, py: 1.5, ':hover': { bgcolor: '#f2734e' } }}
          color="primary"
          variant="contained"
        >
          {orders.find((o: any) => o._id === order._id) ? 'Already ordered' : 'Add to order'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}