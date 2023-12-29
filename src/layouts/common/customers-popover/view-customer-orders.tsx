import { useState, useEffect } from 'react';

import {
  Box,
  Modal,
  Stack,
  Table,
  Divider,
  TableRow,
  TableBody,
  TableCell,
  Typography,
} from '@mui/material';

import { CloseIcon } from 'src/assets/icons';
import { useGetOrders } from 'src/api/orders';
import { OrderResponseSchema } from 'src/api/api-schemas';

import Label from 'src/components/label';
import Scrollbar from 'src/components/scrollbar';
import { useTable, emptyRows, TableEmptyRows, TableHeadCustom } from 'src/components/table';

interface ViewCustomerOrdersProps {
  viewCustomerModal: { openModal: boolean; id: string };
  setViewCustomerModal: (openModal: boolean, id: string) => void;
}

const TABLE_HEAD = [
  { id: 'nr', label: 'Date', align: 'left' },
  { id: 'name', label: 'Price', align: 'left' },
  { id: 'contact', label: 'Payment type', align: 'left' },
  { id: 'email', label: 'Status', align: 'left' },
];

const ViewCustomerOrders = ({
  viewCustomerModal,
  setViewCustomerModal,
}: ViewCustomerOrdersProps) => {
  const { orders, ordersLoading } = useGetOrders();
  const [ordersData, setOrdersData] = useState<OrderResponseSchema[]>([]);

  useEffect(() => {
    if (!ordersLoading && orders.length) {
      setOrdersData(orders);
    }
  }, [ordersLoading, orders]);

  const userOrder = ordersData.filter((item) => item.customer?._id === viewCustomerModal.id);

  const table = useTable();
  const denseHeight = table.dense ? 34 : 54;
  const rowsPerPage = userOrder.length;

  const handleCloseModal = () => {
    setViewCustomerModal(false, '');
  };

  return (
    <Modal open={viewCustomerModal?.openModal} onClose={handleCloseModal}>
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
        <Stack
          mt="auto"
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          marginY={2}
        >
          <Typography variant="h5"> View orders</Typography>
          <CloseIcon onClick={handleCloseModal} />
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
            marginBottom: 2,
          }}
        />

        {userOrder.length === 0 ? (
          <>
            <Typography my={6}>No orders found.</Typography>
            <Box display="flex" flexDirection="row" justifyContent="flex-end" gap={2}>
              {/* <Button
                color="primary"
                variant="contained"
                sx={{
                  p: '12px',
                  ':hover': { bgcolor: '#f2734e' },
                }}
              >
                <Typography fontSize={16} fontWeight={600}>
                  Add new order
                </Typography>
              </Button> */}
            </Box>
          </>
        ) : (
          <Scrollbar sx={{ maxHeight: 400 }}>
            <Table stickyHeader size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 400 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={userOrder.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
              />

              <TableBody>
                {userOrder
                  .slice(table.page * rowsPerPage, table.page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow hover key={row._id}>
                      <TableCell align="left">asd</TableCell>
                      <TableCell> {row.price} </TableCell>
                      <TableCell align="left">
                        <Label variant="soft" color="success">
                          Online
                        </Label>
                      </TableCell>
                      <TableCell align="left">
                        <Label variant="soft" color="success">
                          Done
                        </Label>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, rowsPerPage, userOrder.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        )}
      </Box>
    </Modal>
  );
};

export default ViewCustomerOrders;
