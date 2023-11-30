import * as yup from 'yup';
import { useState, useCallback } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import Iconify from '../iconify/iconify';

interface OrderSidebarProps {
  ordered: boolean;
  orderDetails: {
    name: string;
    price: number;
  };
  foodCount: number;
  setFoodCount: (prevCount: any) => void;
  allOrders: Array<object>;
}

const defaultValues = {
  name: '',
  code: '',
};

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
  const { ordered, allOrders } = props;

  const [itemCounts, setItemCounts] = useState<{ _id: string; count: number }[]>([]);
  const [currentTab, setCurrentTab] = useState('buy');

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

  const handleIncrement = (itemId: string) => {
    setItemCounts((prevCounts) => {
      const existingItem = prevCounts.find((countItem) => countItem._id === itemId);

      if (existingItem) {
        return prevCounts.map((countItem) =>
          countItem._id === itemId ? { ...countItem, count: countItem.count + 1 } : countItem
        );
      }

      return [...prevCounts, { _id: itemId, count: 1 }];
    });
  };

  const handleDecrement = (itemId: string) => {
    setItemCounts((prevCounts) => {
      const existingItem = prevCounts.find((countItem) => countItem._id === itemId);

      if (existingItem && existingItem.count > 0) {
        return prevCounts.map((countItem) =>
          countItem._id === itemId ? { ...countItem, count: countItem.count - 1 } : countItem
        );
      }

      return prevCounts;
    });
  };

  const subTotal = allOrders.reduce((accumulator: number, currentItem: any) => {
    const countObj = itemCounts.find((countItem) => countItem._id === currentItem._id);
    const count = countObj ? countObj.count : 1;

    return accumulator + (currentItem?.price ?? 0) * count;
  }, 0);

  const totalPrice = subTotal + 1.87;
  // const total = subTotal + 1.87;

  return (
    <div style={{ height: '90%' }}>
      <Tabs
        value={currentTab}
        onChange={handleChangeTab2}
        sx={{
          bgcolor: '#F8F9FD',
          borderRadius: '80px',
          my: 2,
          mx: '20px',
        }}
      >
        <Tab
          value="buy"
          label="Buy"
          sx={{
            px: 6,
            mx: 'auto',
            // ml: '6px',
            my: '6px',
            borderRadius: '80px',
            bgcolor: currentTab === 'buy' ? 'white' : '',
          }}
        />
        <Tab
          value="reservation"
          label="Reservation"
          sx={{
            px: 6,
            mx: 'auto',
            my: '6px',
            borderRadius: '80px',
            bgcolor: currentTab === 'reservation' ? 'white' : '',
          }}
        />
      </Tabs>
      {currentTab === 'buy' ? (
        <Box
          sx={{
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
                Customer Information
              </Typography>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 15, marginTop: 15 }}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="Costumer Name"
                      value={value}
                      onChange={onChange}
                      placeholder="Leonard"
                      error={Boolean(errors.name)}
                      aria-describedby="validation-schema-name"
                      {...(errors.name && { helperText: errors.name.message })}
                    />
                  )}
                />
                <Controller
                  name="code"
                  control={control}
                  rules={{ required: true }}
                  render={({ field: { value, onChange } }) => (
                    <TextField
                      fullWidth
                      label="T-08"
                      value={value}
                      onChange={onChange}
                      placeholder="T-08"
                      error={Boolean(errors.code)}
                      aria-describedby="validation-schema-code"
                      {...(errors.code && { helperText: errors.code.message })}
                    />
                  )}
                />
              </div>
              <Fab
                size="small"
                color="default"
                variant="soft"
                sx={{ width: '100%', borderRadius: '58px', marginTop: '16px' }}
              >
                <Typography color="#9C9C9C" fontWeight={600} fontSize="16px">
                  Add Note
                </Typography>
              </Fab>
            </form>
            <Divider sx={{ my: 3 }} />
            {ordered && (
              <>
                <Typography
                  fontSize={20}
                  fontWeight={600}
                  sx={{ marginLeft: '20px', marginRight: '20px', marginBottom: 1 }}
                >
                  Already ordered
                </Typography>
                <div
                  style={{
                    marginLeft: '20px',
                    marginRight: '20px',
                    overflowY: allOrders.length > 2 ? 'scroll' : 'hidden',
                    height: '250px',
                  }}
                >
                  {allOrders.map((order: any) => (
                    <div key={order._id}>
                      <div
                        style={{
                          display: 'flex',
                          paddingTop: '16px',
                          paddingBottom: '16px',
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
                            {order?.name}
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
                                Price
                              </Typography>
                              <Typography
                                fontSize={16}
                                fontWeight={600}
                                variant="body2"
                                color="#F15F34"
                              >
                                $ {order?.price}
                              </Typography>
                            </div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                              <Fab
                                onClick={() => handleDecrement(order._id)}
                                disabled={
                                  itemCounts.find((countItem) => countItem._id === order._id)
                                    ?.count === 1
                                }
                                sx={{ width: '36px', height: '36px' }}
                                color="default"
                                aria-label="add"
                              >
                                <Iconify icon="tabler:minus" width={20} />
                              </Fab>
                              <Typography fontSize={16} fontWeight={600}>
                                {itemCounts.find((countItem) => countItem._id === order._id)
                                  ?.count || 1}
                              </Typography>
                              <Fab
                                onClick={() => handleIncrement(order._id)}
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
                      <Divider />
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
          <div>
            {ordered && (
              <>
                <Divider sx={{ my: '16px' }} />
                <div style={{ paddingLeft: '24px', paddingRight: '24px' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                    }}
                  >
                    <div>
                      <Typography fontSize={16} fontWeight={400} color="#828487" mb="12px">
                        Sub Total
                      </Typography>
                      <Typography fontSize={16} fontWeight={400} color="#828487">
                        Tax (10%)
                      </Typography>
                    </div>
                    <div>
                      <Typography fontSize={16} fontWeight={600} mb="12px">
                        $ {subTotal}
                      </Typography>
                      <Typography fontSize={16} fontWeight={600}>
                        $ 1.87
                      </Typography>
                    </div>
                  </div>
                  <Divider sx={{ border: '1px dashed #E4E4E4', my: 2 }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography fontSize={16} fontWeight={400} color="#828487">
                      Total
                    </Typography>

                    <Typography fontSize={16} fontWeight={600} color="#F15F34">
                      $ {totalPrice.toFixed(2)}
                    </Typography>
                  </div>
                  <Button
                    size="large"
                    fullWidth
                    variant="contained"
                    color="primary"
                    sx={{ borderRadius: '58px', my: '20px', ':hover': { bgcolor: '#f26f49' } }}
                  >
                    Place Order
                  </Button>
                </div>
              </>
            )}
          </div>
        </Box>
      ) : (
        <Box
          sx={{
            p: 2,
            borderRadius: 1,
            bgcolor: 'background.neutral',
          }}
        >
          Reservation
        </Box>
      )}
    </div>
  );
};

export default OrderSidebar;
