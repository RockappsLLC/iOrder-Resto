import { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import { Divider } from '@mui/material';
import Button from '@mui/material/Button';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { styled, useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useGetOrders } from 'src/api/orders';
// import { useGetTables } from 'src/api/tables';
import {
  // TableResponseSchema,
  OrderResponseSchema,
} from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: '#FFF',
    color: '#9C9C9C',
    fontWeight: 500,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  borderBottom: '1px solid #E4E4E4',
}));

const RunningOrders = ({ isBoxOpen, onHideBox }: any) => {
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('md'));

  const { orders, ordersLoading } = useGetOrders();

  const [ordersData, setOrdersData] = useState<OrderResponseSchema[]>([]);

  useEffect(() => {
    if (!ordersLoading && orders.length) {
      setOrdersData(orders);
      // console.log(orders);
    }
  }, [ordersLoading, orders]);

  // const { tables, tablesLoading } = useGetTables();

  // const [tablesData, setTablesData] = useState<TableResponseSchema[]>([]);

  // useEffect(() => {
  //   if (!tablesLoading && tables.length) {
  //     setTablesData(tables);
  //   }
  // }, [tablesLoading, tables]);

  const getStatusText = (status: number) => {
    switch (status) {
      case 0:
        return 'New order';
      case 1:
        return 'In Progress';
      case 2:
        return 'Completed';
      case 3:
        return 'Archived';
      default:
        return 'Done soon';
    }
  };

  const getStatusBgColor = (status: number) => {
    switch (status) {
      case 0:
        return '#E5EDFE';
      case 1:
        return '#FFF5EE';
      case 2:
        return '#EEFFEE';
      case 3:
        return '#FFF9EB';
      default:
        return '#EEFFEE';
    }
  };

  const getStatusColor = (status: number) => {
    switch (status) {
      case 0:
        return '#3071FF';
      case 1:
        return '#F15F34';
      case 2:
        return '#35C335';
      case 3:
        return '#F0B433';
      default:
        return '#35C335';
    }
  };

  function formatSwissFrancs(number: any) {
    const formattedNumber = new Intl.NumberFormat('de-CH', {
      style: 'currency',
      currency: 'CHF',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(number);

    return `${formattedNumber}.-`;
  }

  return (
    <>
      {isBoxOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
            bottom: 0,
            zIndex: 111,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            marginTop: '68px',
          }}
        >
          <Container
            sx={{
              height: '80vh',
              width: matches ? '100vw' : '1100px',
              bgcolor: 'white',
              backgroundColor: 'white',
              paddingLeft: '0px !important',
              paddingRight: '0px !important',
            }}
          >
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              bgcolor="white"
              p="24px"
            >
              <Typography fontSize={20} fontWeight={600} bgcolor="white">
                Running orders
              </Typography>
              <Button onClick={() => onHideBox(false)}>
                <Iconify icon="tabler:x" width="24px" height="24px" />
              </Button>
            </Box>

            <Divider
              sx={{
                width: '100%',
                height: '1px',
                backgroundColor: '#C2C2C2',
              }}
            />

            {ordersData.length === 0 ? (
              <Typography>No running orders.</Typography>
            ) : (
              <Scrollbar>
                <TableContainer sx={{ bgcolor: 'white' }} component={Paper}>
                  <Table aria-label="simple tableId">
                    <TableHead sx={{ backgroundColor: 'white' }}>
                      <StyledTableRow>
                        <StyledTableCell>TABLE NUMBER</StyledTableCell>
                        <StyledTableCell>ORDER NUMBER</StyledTableCell>
                        <StyledTableCell align="center">AMOUNT</StyledTableCell>
                        <StyledTableCell>STATUS</StyledTableCell>
                        <StyledTableCell align="center">DINING FOR</StyledTableCell>
                        <StyledTableCell align="center">ACTIONS</StyledTableCell>
                      </StyledTableRow>
                    </TableHead>
                    <TableBody>
                      {ordersData !== undefined &&
                        ordersData.map((order: OrderResponseSchema) => (
                          <StyledTableRow
                            key={order._id}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                          >
                            <TableCell component="th" scope="order">
                              <Chip
                                label="T-09"
                                color="primary"
                                variant="soft"
                                sx={{
                                  color: '#F15F34',
                                  borderRadius: '100%',
                                  width: '60px',
                                  height: '60px',
                                  fontSize: 14,
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell>
                              <Typography fontSize={14} fontWeight={600}>
                                # {order.orderId}
                              </Typography>
                              <Typography fontSize={12} color="#828487">
                                steak api bakar x 1.0...
                              </Typography>
                            </TableCell>
                            <TableCell align="center">
                              <Typography fontSize={14}>
                                {formatSwissFrancs(order.price?.toFixed(2))}
                              </Typography>
                            </TableCell>
                            <TableCell>
                              <Chip
                                label={getStatusText(order.status || 0)}
                                variant="soft"
                                sx={{
                                  bgcolor: getStatusBgColor(order.status || 0),
                                  color: getStatusColor(order.status || 0),
                                  borderRadius: '48px',
                                  fontSize: 12,
                                  fontWeight: 500,
                                  ':hover': { bgcolor: getStatusBgColor(order.status || 0) },
                                }}
                              />
                            </TableCell>
                            <TableCell align="center">35 minutes</TableCell>
                            <TableCell align="center">
                              <Box
                                sx={{
                                  display: 'flex',
                                  justifyContent: 'center',
                                  gap: '8px',
                                }}
                              >
                                <Button
                                  variant="outlined"
                                  color="primary"
                                  startIcon={<Iconify icon="mdi:printer-outline" />}
                                  sx={{ px: 3, py: 1, borderRadius: '58px', fontWeight: 600 }}
                                >
                                  Print bill
                                </Button>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  startIcon={<Iconify icon="mdi:cash" />}
                                  sx={{
                                    px: 3,
                                    py: 1,
                                    fontWeight: 600,
                                    borderRadius: '58px',
                                    ':hover': { bgcolor: '#F15F34' },
                                  }}
                                >
                                  Pay now
                                </Button>
                              </Box>
                            </TableCell>
                          </StyledTableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Scrollbar>
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default RunningOrders;
