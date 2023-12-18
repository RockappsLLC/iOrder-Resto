import { format } from 'date-fns';
import { useState, useEffect } from 'react';

import Table from '@mui/material/Table';
import Paper from '@mui/material/Paper';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import TableRow from '@mui/material/TableRow';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { useGetTables } from 'src/api/tables';
import { useGetReservations } from 'src/api/reservations';
import {
  // TableResponseSchema,
  // TablesResponseSchema,
  ReservationResponseSchema,
  // ReservationsResponseSchema,
} from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import SelectDate from 'src/components/select-date/select-date';

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

const ReservationList = ({ open, hide, newReservation }: any) => {
  const { reservations, reservationsLoading } = useGetReservations();

  const [reservationsData, setReservationsData] = useState<ReservationResponseSchema[]>([]);

  useEffect(() => {
    if (!reservationsLoading && reservations.length) {
      setReservationsData(reservations as any);
    }
  }, [reservationsLoading, reservations]);

  const { tables, tablesLoading } = useGetTables();

  const [tablesData, setTablesData] = useState<ReservationResponseSchema[]>([]);

  useEffect(() => {
    if (!tablesLoading && tables.length) {
      setTablesData(tables as any);
    }
  }, [tablesLoading, tables]);

  return (
    <Drawer open={open} onClose={hide} anchor="right">
      <SelectDate />
      <Container
        sx={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          py: '24px',
          bgcolor: 'white',
        }}
      >
        <TableContainer sx={{ bgcolor: 'white' }} component={Paper}>
          <Table sx={{ minWidth: 550 }} aria-label="simple tableId">
            <TableHead>
              <StyledTableRow>
                <StyledTableCell>CUSTOMER NAME</StyledTableCell>
                <StyledTableCell align="center">TIME</StyledTableCell>
                <StyledTableCell align="center">TABLE</StyledTableCell>
                <StyledTableCell align="center">GUEST NR.</StyledTableCell>
              </StyledTableRow>
            </TableHead>
            <TableBody>
              {reservationsData !== undefined &&
                reservationsData.map((reservation: ReservationResponseSchema) => (
                  <StyledTableRow
                    key={reservation._id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="reservation">
                      {reservation.name}
                    </TableCell>
                    <TableCell align="center">
                      {format(
                        new Date(reservation.startTime !== undefined ? reservation.startTime : ''),
                        'hh:mm a'
                      )}
                      {/* {format(new Date(), 'hh:mm a')} */}
                    </TableCell>

                    <TableCell align="center">
                      {tablesData.map((table: any) => {
                        if (table._id === reservation.tableId) {
                          return table.name;
                        }

                        return null;
                      })}
                    </TableCell>
                    <TableCell
                      align="center"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                      }}
                    >
                      <Iconify icon="tabler:user" width="16px" height="16px" />
                      <Typography>{reservation.guestNumber}</Typography>
                    </TableCell>
                  </StyledTableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Button
          fullWidth
          onClick={() => {
            hide();
            newReservation();
          }}
          color="primary"
          variant="contained"
          sx={{ borderRadius: '58px', p: '10px', ':hover': { bgcolor: '#f2734e' } }}
        >
          <Typography fontSize={16} fontWeight={600}>
            Add new reservation
          </Typography>
        </Button>
      </Container>
    </Drawer>
  );
};

export default ReservationList;
