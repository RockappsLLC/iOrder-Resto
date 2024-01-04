import { useState, useEffect } from 'react';

import {
  Box,
  Modal,
  Stack,
  Table,
  Button,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
  TableContainer,
} from '@mui/material';

import { useRouter } from 'src/routes/hooks';

import { createPayment } from 'src/api/payments';
import { updateOrderById } from 'src/api/orders';
import { updateTableById } from 'src/api/tables';
import { MoneyIcon, Mastercard } from 'src/assets/icons';

import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { ConfirmDialog } from 'src/components/custom-dialog';
import { useOrderContext } from 'src/components/order-sidebar/context';

import LightboxModal from './lightbox-modal';

const TABLE_HEAD = [
  { id: 'item-name', label: 'Item Name' },
  { id: 'qty', label: 'Qty', align: 'right' },
  { id: 'price', label: 'Price', align: 'right' },
  { id: 'tax', label: 'Tax', align: 'right' },
  { id: 'subtotal', label: 'Subtotal', align: 'right' },
];

interface OrderConfirmationProps {
  showOrderModal: boolean;
  setShowOrderModal: (value: boolean) => void;
}

const OrderConfirmationModal = ({ showOrderModal, setShowOrderModal }: OrderConfirmationProps) => {
  const [showLightbox, setShowLightbox] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  function formatSwissFrancs(number: any) {
    const formattedNumber = new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return `${formattedNumber}.-`;
  }

  const [transacId, setTransactionId] = useState('');

  const router = useRouter();

  const {
    inputAmount,
    subTotal,
    orders,
    paymentMethod,
    totalWithTip,
    tipAmount,
    orderId,
    menuItems,
    activeTable,
    setOrderId,
    resetOrders,
    resetMenuItems,
  } = useOrderContext();

  const handleCloseModal = () => {
    setShowOrderModal(false);
  };

  console.log('orders', orders);

  let change;

  if (inputAmount !== '') {
    change = inputAmount - totalWithTip;
  } else {
    change = 0;
  }

  const TAX = 0.1;
  const taxTotal = Math.round(Number(subTotal * TAX) * 10) / 10;

  const onSubmit = async () => {
    try {
      await updateOrderById(orderId, {
        status: 2,
      });

      await updateTableById(activeTable?._id, {
        name: activeTable?.name,
        status: 0,
        restaurantId: activeTable?.restaurantId,
      });

      setShowOrderModal(false);
      resetOrders();
      resetMenuItems();

      if (paymentMethod === 'cash') {
        setShowMessage(true);
      }
    } catch (error) {
      console.log('create order error', error);
    }
  };

  const handleClickLightbox = async () => {
    try {
      if (orderId) {
        const response = await createPayment({
          orderId,
        });

        const { transactionId } = response.data.data;
        setTransactionId(transactionId);
        setShowLightbox(true);
      } else {
        console.log('orderId is null');
      }
    } catch (error) {
      console.log('handle click error', error);
    }
  };

  useEffect(() => {
    if (showMessage) {
      const timer = setTimeout(() => {
        setShowMessage(false);

        router.push('/');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [showMessage, router]);

  return (
    <>
      <LightboxModal
        showModal={showLightbox}
        transactionId={transacId}
        setShowModal={() => setShowLightbox(false)}
      />

      <ConfirmDialog
        open={showMessage}
        onClose={() => setShowMessage(false)}
        title="Confirmation"
        content="Order is added successfully."
        action={
          <Button variant="contained" color="success" onClick={() => setShowMessage(false)}>
            Done
          </Button>
        }
      />

      <Modal open={showOrderModal} onClose={handleCloseModal}>
        <Box
          sx={{
            position: 'absolute' as const,
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: 2,
            bgcolor: 'background.paper',
            boxShadow: 24,
            minWidth: 700,
            p: 2.5,
          }}
        >
          <Typography textAlign="center" variant="h5" fontWeight={600}>
            Order confirmation
          </Typography>

          <Typography textAlign="center" variant="subtitle2" color="#828487" fontWeight={400}>
            Please confirm the order below to completed payment
          </Typography>

          <TableContainer sx={{ mt: 3, overflow: 'unset' }}>
            <Scrollbar>
              <Table sx={{ minWidth: 400 }}>
                <TableHeadCustom headLabel={TABLE_HEAD} sx={{ textTransform: 'uppercase' }} />

                <TableBody>
                  {menuItems?.map((order: any, index: number) => (
                    <TableRow key={order._id}>
                      <TableCell>{order.name}</TableCell>
                      <TableCell align="right">{order.count}</TableCell>
                      <TableCell align="right">{order.price}</TableCell>
                      <TableCell align="right">{order.carbs}</TableCell>
                      <TableCell align="right">{order.price * order.count}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <Stack direction="row">
            <Stack width="50%" sx={{ backgroundColor: '#F8F9FD' }} padding={3}>
              <Typography variant="subtitle2" mb={1}>
                NOTES
              </Typography>
              <Typography variant="caption">{orders[0]?.notes}</Typography>
            </Stack>

            <Stack width="50%" ml={5}>
              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography color="#9C9C9C">SUBTOTAL</Typography>
                <Typography>{formatSwissFrancs(subTotal)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography color="#9C9C9C">ORDER DISCOUNT</Typography>
                <Typography>{formatSwissFrancs(0)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography color="#9C9C9C">TAX</Typography>
                <Typography>{formatSwissFrancs(taxTotal)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography color="#9C9C9C">TIP</Typography>
                <Typography>{formatSwissFrancs(tipAmount)}</Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography>CHANGE</Typography>
                <Typography color="#F15F34" fontWeight={600}>
                  {formatSwissFrancs(change)}
                </Typography>
              </Stack>

              <Stack direction="row" justifyContent="space-between" mb={1.5}>
                <Typography>BILL AMOUNT</Typography>
                <Typography color="#F15F34" fontWeight={600}>
                  {formatSwissFrancs(totalWithTip)}
                </Typography>
              </Stack>
            </Stack>
          </Stack>

          <Divider
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: '#E4E4E4',
              mt: 3,
            }}
          />

          <Stack direction="row" mt={2.5}>
            <Stack width="60%">
              <Typography>Payment method</Typography>
              <Stack direction="row">
                {paymentMethod === 'cash' ? (
                  <MoneyIcon sx={{ width: '31px', height: '24px' }} />
                ) : (
                  <Mastercard sx={{ width: '31px', height: '24px' }} />
                )}
                <Typography ml={1}>
                  {paymentMethod.charAt(0).toUpperCase() + paymentMethod.slice(1)}
                </Typography>
              </Stack>
            </Stack>

            <Stack direction="row" width="40%" gap={3}>
              <Button
                variant="outlined"
                color="error"
                sx={{ height: '50px', borderRadius: 10, px: 5 }}
                onClick={handleCloseModal}
              >
                Cancel
              </Button>

              <Button
                variant="contained"
                color="error"
                sx={{ height: '50px', borderRadius: 10, px: 5 }}
                onClick={() => {
                  if (paymentMethod === 'online') {
                    onSubmit();
                    handleClickLightbox();
                  } else {
                    onSubmit();
                  }
                }}
              >
                Confirm
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Modal>
    </>
  );
};

export default OrderConfirmationModal;
