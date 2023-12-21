import * as yup from 'yup';
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Button } from '@mui/material';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTranslate } from 'src/locales';

import AddNote from 'src/sections/dialogs/add-note';
import { OrderPaymentDrawer } from 'src/sections/modals';
import { useDiningOptionsContext } from 'src/sections/dining-options';

import Iconify from '../iconify';
import { useOrderContext } from './context';
import OrderReservations from './reservations';

interface OrderSidebarProps {}

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

const OrderSidebar = (props: OrderSidebarProps) => {
  const { orders, ordered, updateOrder, removeOrder, total, subTotal, activeTable } =
    useOrderContext();

  const { diningOption } = useDiningOptionsContext();

  const [currentTab, setCurrentTab] = useState('buy');
  const [addNote, setAddNote] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

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

  const onSubmit = (data: any) => {
    // addData(data)
  };

  const taxTotal = Math.round(Number(subTotal * TAX) * 10) / 10;

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
                      />
                    )}
                  />
                )}
              </div>
              <Fab
                onClick={() => setAddNote(true)}
                disabled={!ordered}
                size="small"
                color={ordered ? 'error' : 'default'}
                variant="soft"
                sx={{ width: '100%', borderRadius: '58px', marginTop: '16px' }}
              >
                <Typography color="#9C9C9C" fontWeight={600} fontSize="16px">
                  {t('add_note')}
                </Typography>
              </Fab>
            </form>
            <Divider sx={{ mt: 2, mb: 1 }} />
            {ordered && orders.length > 0 && (
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
                    overflowY: orders.length < 5 ? 'hidden' : 'scroll',
                    height: xl ? '380px' : '200px',
                  }}
                >
                  {orders.map((order: any, index: number) => (
                    <div key={order._id}>
                      <div
                        style={{
                          display: 'flex',
                          paddingTop: '10px',
                          paddingBottom: '10px',
                        }}
                      >
                        <img
                          style={{ width: '74px', borderRadius: '12px' }}
                          height="74px"
                          src="/assets/images/food.png"
                          alt="food"
                        />
                        <div style={{ width: '100%', paddingLeft: 10 }}>
                          <Typography fontSize={16} fontWeight={600} gutterBottom component="div">
                            {order.name}
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
                                $ {order.price}
                              </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                              <Fab
                                onClick={() => {
                                  updateOrder(order._id, { count: order.count - 1 });
                                  if (order.count === 1) removeOrder(order._id);
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
                                onClick={() => updateOrder(order._id, { count: order.count + 1 })}
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
                      {index + 1 !== orders.length && <Divider />}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {ordered && orders.length > 0 && (
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
                        $ {subTotal}
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
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={() => setShowOrderModal(true)}
                    sx={{ borderRadius: '58px', my: '15px', ':hover': { bgcolor: '#f26f49' } }}
                  >
                    {t('place_order')}
                  </Button>
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
    </div>
  );
};

export default OrderSidebar;
