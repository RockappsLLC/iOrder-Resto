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

import { useTranslate } from 'src/locales';
import { useGetMenuItem } from 'src/api/menu-items';
import { MenuItemResponseSchema } from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import { useOrderContext } from 'src/components/order-sidebar/context';

// ----------------------------------------------------------------------

const defaultOrder = {
  name: '',
  price: 0,
  restaurantId: '',
  menuCategoryId: '',
  icon: '',
  status: true,
  preparationTime: 0,
  isAdditional: false,
  count: 1,
};

export default function AddOrderDialog({ open, hide, foodId }: any) {
  const { menuItems, addOrder, setOrdered, updateOrder, addMenuItem } = useOrderContext();

  const [notes, setNotes] = useState('');

  const { t } = useTranslate();

  const { menuItem, menuItemLoading } = useGetMenuItem(foodId);
  const [order, setOrder] = useState<MenuItemResponseSchema & { count: number }>(defaultOrder);
  const orderObject = menuItems.find((o: any) => o._id === order._id);

  useEffect(() => {
    if (!menuItemLoading) {
      // console.log(defaultOrder);
      setOrder(menuItem ? { ...menuItem, count: 1 } : defaultOrder);
    }
  }, [menuItemLoading, menuItem]);

  const handleAddOrder = () => {
    if (orderObject !== undefined && orderObject.count > 0) {
      updateOrder(order._id, { notes });
      hide();
    } else {
      if (menuItems.find((_order: any) => _order._id === order?._id)) {
        hide();
        return;
      }
      const newOrder = { ...order, notes };
      addMenuItem([...menuItems, newOrder || []]);
      setOrdered(true);
      hide();
    }
  };

  if (!menuItem) return null;

  const price = Number(order.price || 0);
  const total = price * Number(order.count || 0);

  return (
    <Dialog fullWidth open={open} onClose={hide}>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <DialogTitle sx={{ py: 2 }}>{t('add_order')}</DialogTitle>
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
                  {t('price')}
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

        <Divider sx={{ my: '24px' }} />

        <Typography color="#828487" fontSize={12} fontWeight={500}>
          {t('add_note')}
        </Typography>

        <TextField
          fullWidth
          multiline
          rows={4}
          sx={{ mt: '5px' }}
          placeholder={`${t('type_your_note_here')}'...`}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </DialogContent>

      <DialogActions sx={{ justifyContent: 'space-between' }}>
        <div>
          <Typography color="#828487" fontSize={14}>
            {t('total')}
          </Typography>
          <Typography color="#19191C" fontSize={16} fontWeight={600}>
            $ {total.toFixed(2)}
          </Typography>
        </div>
        <Button
          // disabled={orderObject !== undefined && orderObject.count > 0}
          onClick={handleAddOrder}
          sx={{ borderRadius: '58px', px: 6, py: 1.5, ':hover': { bgcolor: '#f2734e' } }}
          color="primary"
          variant="contained"
        >
          {t(
            orderObject !== undefined && orderObject.count > 0 ? 'already_ordered' : 'add_to_order'
          )}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
