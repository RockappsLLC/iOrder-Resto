import * as yup from 'yup';
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Button, CardMedia, IconButton } from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { getMe } from 'src/api/users';
import { useTranslate } from 'src/locales';
import { ChevronRight } from 'src/assets/icons';
import { createOrder, updateOrderById } from 'src/api/orders';
import { useHomeContext } from 'src/pages/dashboard/home/home-context';

import AddNote from 'src/sections/dialogs/add-note';
import { OrderPaymentDrawer } from 'src/sections/modals';
import AddOrderDialog from 'src/sections/dialogs/add-order';
import { useDiningOptionsContext } from 'src/sections/dining-options';

import Iconify from '../iconify';
import { useOrderContext } from './context';
import OrderReservations from './reservations';

interface OrderSidebarProps {
  showOrderMore?: boolean;
  showPayNow?: boolean;
  showPlaceOrder?: boolean;
}

const defaultValues = {
  name: '',
  code: '',
};

const TAX = 0.1;

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} is required`;
  }
  if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  }
  return '';
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, (obj) => showErrors('Customer Name', obj.value.length, obj.min))
    .required(),
  code: yup
    .string()
    .min(3, (obj) => showErrors('Code', obj.value.length, obj.min))
    .required(),
});

const OrderSidebar = ({
  showOrderMore = false,
  showPayNow = false,
  showPlaceOrder = false,
}: OrderSidebarProps) => {
  const {
    menuItems,
    updateMenuItem,
    removeMenuItem,
    ordered,
    orders,
    addOrder,
    total,
    subTotal,
    activeTable,
    note,
  } = useOrderContext();

  const { setActiveTab } = useHomeContext();

  const { diningOption } = useDiningOptionsContext();

  const [currentTab, setCurrentTab] = useState('buy');
  const [addNote, setAddNote] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const [foodId, setFoodId] = useState('');
  const [modal, setModal] = useState(false);

  const { t } = useTranslate();

  const theme = useTheme();
  // const sm = useMediaQuery(theme.breakpoints.down('sm'));
  const xl = useMediaQuery(theme.breakpoints.only('xl'));

  const {
    // reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleChangeTab2 = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const taxTotal = Math.round(Number(subTotal * TAX) * 10) / 10;

  const restaurantId = localStorage.getItem('restaurantId') || '';
  const router = useRouter();

  const onSubmit = async () => {
    const { data } = await getMe();
    const staffId = data.data._id;

    try {
      if (orders[0]?._id !== undefined) {
        await updateOrderById(orders[0]._id, {
          menuItems,
        });

        setActiveTab('tables');
      } else {
        const response = await createOrder({
          customer: {
            _id: '6581d253922a13b580a038ea',
            name: 'asd',
            email: 'asd@gmail.com',
            contactNumber: '1111',
            restaurantId,
          },
          staffId,
          restaurantId,
          menuItems,
          price: total,
          status: 1,
          diningOption,
          notes: note,
          tableId: activeTable._id as string,
        });

        addOrder(response);
        setActiveTab('tables');
      }
    } catch (error) {
      console.log('create order error', error);
    }
  };

  const handleClickItem = () => {
    setActiveTab('home');
  };

  return (
    <div style={{ height: '90%' }}>
      {diningOption !== 'takeaway' && (
        <Tabs
          value={currentTab}
          onChange={handleChangeTab2}
          sx={{
            bgcolor: '#F8F9FD',
            borderRadius: '80px',
            mt: 2,
            mx: '20px',
            px: 1,
          }}
        >
          <Tab
            value="buy"
            label={t('buy')}
            sx={{
              width: '50%',
              mx: 'auto',
              my: '6px',
              borderRadius: '80px',
              bgcolor: currentTab === 'buy' ? 'white' : '',
            }}
          />
          <Tab
            value="reservation"
            label={t('reservation')}
            sx={{
              width: '50%',
              // px: 5,
              mx: 'auto',
              my: '6px',
              borderRadius: '80px',
              bgcolor: currentTab === 'reservation' ? 'white' : '',
            }}
          />
        </Tabs>
      )}
      {currentTab === 'buy' ? (
        <Box
          sx={{
            mt: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <form
              onSubmit={handleSubmit(onSubmit)}
              style={{ marginLeft: '20px', marginRight: '20px' }}
            >
              <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                {t('customer_information')}
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label={t('customer_name')}
                      value={value}
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(errors.name)}
                      {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
                {diningOption !== 'takeaway' && activeTable && (
                  <Controller
                    name="code"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Table"
                        value={activeTable.name}
                        onChange={onChange}
                        placeholder={activeTable.name}
                        disabled
                        error={Boolean(errors.code)}
                        {...(errors.code && { helperText: errors.code.message })}
                        InputProps={{
                          endAdornment: (
                            <IconButton disabled>
                              <ChevronRight />
                            </IconButton>
                          ),
                        }}
                      />
                    )}
                  />
                )}
              </div>
              {note ? (
                <TextField fullWidth multiline rows={2} sx={{ mt: 2 }} label="Note" value={note} />
              ) : (
                <Fab
                  onClick={() => setAddNote(true)}
                  // disabled={!ordered}
                  size="small"
                  variant="outlined"
                  sx={{ width: '100%', borderRadius: '58px', marginTop: '16px' }}
                >
                  <Typography color="#e06842" fontWeight={600} fontSize="16px">
                    {t('add_note')}
                  </Typography>
                </Fab>
              )}
            </form>
            <Divider sx={{ mt: 2, mb: 1 }} />
            {menuItems.length > 0 && (
              <>
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  sx={{ marginLeft: '20px', marginRight: '20px', marginBottom: 1 }}
                >
                  {t('already_ordered')}
                </Typography>
                <div
                  style={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    overflowY: 'scroll',
                    height: xl ? '380px' : '200px',
                  }}
                >
                  {menuItems.map((order: any, index: number) => (
                    <div key={order._id}>
                      <div
                        style={{
                          display: 'flex',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }}
                      >
                        <CardMedia
                          sx={{ width: '74px', borderRadius: '12px' }}
                          component="img"
                          height="74px"
                          image="/assets/images/food.png"
                          alt="food"
                          onClick={() => {
                            setModal(true);
                            setFoodId(order._id);
                          }}
                        />

                        <div style={{ width: '100%', paddingLeft: 10 }}>
                          <Typography fontSize={16} fontWeight={600} gutterBottom component="div">
                            {order.name}
                          </Typography>
                          <Typography fontSize={12}>
                            Note:{' '}
                            {order?.notes?.length > 10
                              ? `${order?.notes?.slice(0, 15)}...`
                              : order?.notes}
                          </Typography>
                          <div
                            style={{
                              display: 'flex',
                              justifyContent: 'space-between',
                              width: '100%',
                            }}
                          >
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
                              <Typography
                                fontSize={16}
                                fontWeight={600}
                                variant="body2"
                                color="#F15F34"
                              >
                                $ {order?.price?.toFixed(2)}
                              </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Fab
                                onClick={() => {
                                  updateMenuItem(order._id, { count: order.count - 1 });
                                  if (order.count === 1) removeMenuItem(order._id);
                                }}
                                // disabled={order.count === 1}
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
                                onClick={() =>
                                  updateMenuItem(order._id, { count: order.count + 1 })
                                }
                                sx={{ width: '36px', height: '36px' }}
                                color="inherit"
                                aria-label="add"
                              >
                                <Iconify icon="tabler:plus" width={20} />
                              </Fab>
                            </div>
                          </div>
                        </div>
                      </div>
                      {index + 1 !== menuItems.length && <Divider />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {menuItems.length > 0 && (
              <>
                <Divider sx={{ mb: '12px' }} />
                <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Typography fontSize={16} fontWeight={400} color="#828487" mb="10px">
                        {t('sub_total')}
                      </Typography>
                      <Typography fontSize={16} fontWeight={400} color="#828487">
                        {t('tax')} ({100 * TAX}%)
                      </Typography>
                    </div>
                    <div>
                      <Typography fontSize={16} fontWeight={600} mb="12px">
                        $ {subTotal?.toFixed(2)}
                      </Typography>
                      <Typography fontSize={16} fontWeight={600}>
                        $ {taxTotal}
                      </Typography>
                    </div>
                  </div>
                  <Divider sx={{ border: '1px dashed #E4E4E4', my: 1 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={16} fontWeight={400} color="#828487">
                      {t('total')}
                    </Typography>

                    <Typography fontSize={16} fontWeight={600} color="#F15F34">
                      $ {total.toFixed(2)}
                    </Typography>
                  </div>

                  {showOrderMore && (
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      onClick={() => handleClickItem()}
                      sx={{
                        borderRadius: '58px',
                        my: 1,
                        mt: 3,
                        bgcolor: '#FEE3D0',
                        color: '#F15F34',
                        ':hover': { bgcolor: '#f26f49', color: '#FFF' },
                      }}
                    >
                      Order more
                    </Button>
                  )}

                  {showPayNow && (
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={() => setShowOrderModal(true)}
                      sx={{ borderRadius: '58px', my: '5px', ':hover': { bgcolor: '#f26f49' } }}
                    >
                      Pay Now
                    </Button>
                  )}

                  {showPlaceOrder && (
                    <Button
                      size="large"
                      fullWidth
                      variant="contained"
                      color="primary"
                      // onClick={() => setShowOrderModal(true)}
                      onClick={onSubmit}
                      sx={{ borderRadius: '58px', my: '15px', ':hover': { bgcolor: '#f26f49' } }}
                    >
                      {t('place_order')}
                    </Button>
                  )}
                </div>
              </>
            )}
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            // p: 2,
            borderRadius: 1,
            // bgcolor: 'background.neutral',
          }}
        >
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '20px',
              mr: '20px',
              ml: '20px',
              mt: 2,
            }}
          >
            {t('reservations')}
          </Typography>
          <OrderReservations />
        </Box>
      )}
      <AddNote open={addNote} hide={() => setAddNote(false)} />

      <OrderPaymentDrawer
        showModal={showOrderModal}
        setShowModal={() => setShowOrderModal(false)}
      />

      <AddOrderDialog open={modal} foodId={foodId} hide={() => setModal(false)} />
    </div>
  );
};

export default OrderSidebar;
