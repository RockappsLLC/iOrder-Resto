import { useState, useEffect, ChangeEvent } from 'react';

import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import InputBase from '@mui/material/InputBase';
import Container from '@mui/material/Container';
import Pagination from '@mui/material/Pagination';
import Typography from '@mui/material/Typography';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useGetCustomers } from 'src/api/customers';
import { CustomerResponseSchema } from 'src/api/api-schemas';
import EditCustomerInfo from 'src/layouts/common/customers-popover/edit-customer-info';
import ViewCustomerOrders from 'src/layouts/common/customers-popover/view-customer-orders';

import Iconify from 'src/components/iconify';

import AddCustomerModal from '../add-costumers';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.white,
    color: '#9C9C9C',
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1px solid #E4E4E4',
}));

const ManageCustomer = ({ open, hide }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const [searchInput, setSearchInput] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const restaurantId = localStorage.getItem('restaurantId') || '';

  const { customers, customersLoading, totalLength } = useGetCustomers({
    restaurantId,
    offset: currentPage,
    limit: 4,
    search: searchInput,
  });

  const [customersData, setCustomersData] = useState<CustomerResponseSchema[]>([]);

  useEffect(() => {
    if (!customersLoading && customers.length) {
      setCustomersData(customers);
    }
  }, [customersLoading, customers]);

  const [viewModal, setViewModal] = useState({
    openModal: false,
    id: '',
  });

  const handleOpenViewModal = (id?: string) => {
    setViewModal({
      openModal: true,
      id: id || '',
    });
  };

  const [editModal, setEditModal] = useState({
    openModal: false,
    id: '',
  });

  const handleOpenEditModal = (id?: string) => {
    setEditModal({
      openModal: true,
      id: id || '',
    });
  };

  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <>
      <ViewCustomerOrders
        viewCustomerModal={viewModal}
        setViewCustomerModal={(openModal, id) => setViewModal({ openModal, id })}
      />

      <EditCustomerInfo
        viewEditModal={editModal}
        setViewEditModal={(openModal, id) => setEditModal({ openModal, id })}
      />

      <AddCustomerModal showModal={showAddModal} setShowModal={() => setShowAddModal(false)} />

      <Dialog maxWidth="xl" open={open} onClose={hide}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            borderBottom: '1px solid #E4E4E4',
          }}
        >
          <DialogTitle sx={{ py: 2 }}>Manage Customer</DialogTitle>
          <Button onClick={hide}>
            <Iconify icon="tabler:x" />
          </Button>
        </div>
        <InputBase
          fullWidth
          autoFocus
          placeholder="Search customer..."
          value={searchInput}
          onChange={(e: any) => setSearchInput(e.target.value)}
          sx={{ p: 2, borderBottom: '1px solid #E4E4E4' }}
          startAdornment={
            <InputAdornment position="start">
              <Iconify icon="eva:search-fill" width={26} sx={{ color: 'text.disabled' }} />
            </InputAdornment>
          }
          inputProps={{
            sx: { fontSize: '16px' },
          }}
        />
        <Container
          sx={{
            height: '100%',
            width: matches ? '100vw' : '100%',
            py: '24px',
            bgcolor: 'white',
          }}
        >
          {customersData.length === 0 ? (
            <Typography>No customers found.</Typography>
          ) : (
            <TableContainer sx={{ bgcolor: 'white' }} component={Paper}>
              <Table aria-label="simple tableId">
                <TableHead>
                  <StyledTableRow>
                    <StyledTableCell>CUSTOMER NAME</StyledTableCell>
                    <StyledTableCell align="center">PHONE NUMBER</StyledTableCell>
                    <StyledTableCell>EMAIL ADDRESS</StyledTableCell>
                    <StyledTableCell>ACTIONS</StyledTableCell>
                  </StyledTableRow>
                </TableHead>
                <TableBody>
                  {customersData !== undefined &&
                    customersData.map((customer: CustomerResponseSchema) => (
                      <StyledTableRow
                        key={customer._id}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell>
                          <Typography fontSize={14}>{customer.name}</Typography>
                        </TableCell>
                        <TableCell align="center">
                          <Typography fontSize={14}>{customer.contactNumber}</Typography>
                        </TableCell>
                        <TableCell>
                          <Typography>{customer.email}</Typography>
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{
                            display: 'flex',
                            flexDirection: matches ? 'column' : 'row',
                            gap: 1,
                            width: matches ? '250px' : '100%',
                          }}
                        >
                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ py: '8px', px: '20px', borderRadius: '58px' }}
                            onClick={() => handleOpenViewModal(customer._id)}
                          >
                            <Typography fontSize={14} fontWeight={600}>
                              View orders
                            </Typography>
                          </Button>

                          <Button
                            variant="outlined"
                            color="primary"
                            sx={{ py: '8px', px: '20px', borderRadius: '58px' }}
                            onClick={() => handleOpenEditModal(customer._id)}
                          >
                            <Typography fontSize={14} fontWeight={600}>
                              Edit info
                            </Typography>
                          </Button>
                        </TableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Container>
        <DialogActions
          sx={{
            display: 'flex',
            justifyContent: totalLength > 6 ? 'space-between' : 'flex-end',
            width: '100%',
            p: matches ? '10px' : '24px',
          }}
        >
          {totalLength > 6 && (
            <Pagination
              page={currentPage}
              onChange={(event: ChangeEvent<unknown>, page: number) => setCurrentPage(page)}
              size="large"
              color="primary"
              count={Math.ceil(totalLength / 6) || 1}
              sx={{
                display: 'flex',
                justifyContent: 'flex-start',
                my: 1,
                width: matches ? '50%' : '400px',
              }}
            />
          )}
          <Box
            display="flex"
            flexDirection={matches ? 'column' : 'row'}
            justifyContent="flex-end"
            gap={2}
          >
            <Button
              onClick={hide}
              color="primary"
              variant="outlined"
              sx={{ borderRadius: '58px', width: matches ? '150px' : '184px', p: '12px' }}
            >
              <Typography fontSize={16} fontWeight={600}>
                Cancel
              </Typography>
            </Button>
            <Button
              color="primary"
              variant="contained"
              sx={{
                borderRadius: '58px',
                width: matches ? '150px' : '184px',
                p: '12px',
                ':hover': { bgcolor: '#f2734e' },
              }}
              onClick={() => {
                hide();
                setShowAddModal(true);
              }}
            >
              <Typography fontSize={16} fontWeight={600}>
                New Customer
              </Typography>
            </Button>
          </Box>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ManageCustomer;
