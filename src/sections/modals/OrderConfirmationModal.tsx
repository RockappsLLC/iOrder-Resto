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

import Scrollbar from 'src/components/scrollbar';
import { TableHeadCustom } from 'src/components/table';
import { useOrderContext } from 'src/components/order-sidebar/context';

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
  const handleCloseModal = () => {
    setShowOrderModal(false);
  };

  const { inputAmount, subTotal, total, orders, paymentMethod } = useOrderContext();

  let change;

  if (inputAmount !== '') {
    change = inputAmount - total;
  } else {
    change = 0;
  }

  return (
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
                {orders.map((order: any, index: number) => (
                  <TableRow key={order._id}>
                    <TableCell>{order.name}</TableCell>
                    <TableCell align="right">{order.count}</TableCell>
                    <TableCell align="right">${order.price}</TableCell>
                    <TableCell align="right">${order.carbs}</TableCell>
                    <TableCell align="right">${order.price * order.count}</TableCell>
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
            <Typography variant="caption">
              Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an
              unknown printer took a galley of type and scrambled it to make a type specimen book.
            </Typography>
          </Stack>

          <Stack width="50%" ml={5}>
            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography color="#9C9C9C">SUBTOTAL</Typography>
              <Typography>${subTotal}</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography color="#9C9C9C">SUBCHARGE</Typography>
              <Typography>$0</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography color="#9C9C9C">ORDER DISCOUNT</Typography>
              <Typography>$0</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography color="#9C9C9C">TAX</Typography>
              <Typography>$0</Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography>BILL AMOUNT</Typography>
              <Typography color="#F15F34" fontWeight={600}>
                ${total}
              </Typography>
            </Stack>

            <Stack direction="row" justifyContent="space-between" mb={1.5}>
              <Typography>CHANGE</Typography>
              <Typography color="#F15F34" fontWeight={600}>
                ${change}
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
              <Typography>{paymentMethod}</Typography>
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
            >
              Confirm
            </Button>
          </Stack>
        </Stack>
      </Box>
    </Modal>
  );
};

export default OrderConfirmationModal;
