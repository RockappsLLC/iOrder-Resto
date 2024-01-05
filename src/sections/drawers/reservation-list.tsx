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
import { Stack, Tooltip, IconButton } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';

import { getTables } from 'src/api/tables';
import { EyeIcon, EditIcon, TrashIcon } from 'src/assets/icons';
import { getReservations, deleteReservation } from 'src/api/reservations';
import { TableResponseSchema, ReservationResponseSchema } from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import { ConfirmDialog } from 'src/components/custom-dialog';
import SelectDate from 'src/components/select-date/select-date';

import { useReservationContext } from '../reservation';
import ReservationViewEdit from '../dialogs/reservation-view-edit';

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

type ReservationWithTable = ReservationResponseSchema & {
  table?: TableResponseSchema;
  _id: string;
};

const ReservationList = ({ open }: any) => {
  const { setReservationTab, setReservation, reservationTab, createdReservationId } =
    useReservationContext();

  const [reservationsData, setReservationsData] = useState<ReservationWithTable[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const reservationsResponse = await getReservations();
        const tablesResponse = await getTables();

        const updatedReservationsData = reservationsResponse.data.data.reservations.map(
          (reservation: any) => {
            const table = tablesResponse.data.data.tables.find(
              (_table: any) => _table._id === reservation.tableId
            );
            return { ...reservation, table } as ReservationWithTable;
          }
        );

        setReservationsData(updatedReservationsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [reservationTab]);

  const handleClose = () => {
    setReservation(null);
    setReservationTab(null);
  };

  const [deleteModal, setDeleteModal] = useState({
    open: false,
    idToDelete: null,
  });

  const handleOpenDeleteModal = (id: any) => {
    setDeleteModal({ open: true, idToDelete: id });
  };

  const handleCloseDeleteModal = () => {
    setDeleteModal({ open: false, idToDelete: null });
  };

  const handleDeleteRow = async () => {
    try {
      const id: any = deleteModal.idToDelete;

      await deleteReservation(id);

      const deleteRow = reservationsData.filter((row: any) => row._id !== id);
      setReservationsData(deleteRow);

      handleCloseDeleteModal();
    } catch (error) {
      console.log('error handleDeleteRow: ', error);
    }
  };

  const [openModal, setOpenModa] = useState({
    open: false,
    idToEdit: '',
    isEdit: false,
    isView: false,
  });

  const handleCloseModal = () => {
    setOpenModa({ open: false, idToEdit: '', isEdit: false, isView: false });
  };

  const handleOpenModal = (id?: string, isViewItem?: boolean) => {
    setOpenModa({
      open: true,
      idToEdit: id || '',
      isEdit: isViewItem ? false : !!id,
      isView: isViewItem || false,
    });
  };

  return (
    <>
      <Drawer open={open} onClose={handleClose} anchor="right">
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
                  <StyledTableCell align="center">ACTION</StyledTableCell>
                </StyledTableRow>
              </TableHead>
              <TableBody>
                {reservationsData.map((reservation) => (
                  <StyledTableRow
                    key={reservation._id}
                    sx={{
                      backgroundColor:
                        createdReservationId === reservation._id ? '#C3E6BA' : 'inherit',
                      '&:last-child td, &:last-child th': { border: 0 },
                    }}
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

                    <TableCell align="center">{reservation.table?.name || ''}</TableCell>
                    <TableCell align="center">
                      <Stack
                        direction="row"
                        sx={{ justifyContent: 'center', alignItems: 'center' }}
                      >
                        <Iconify icon="tabler:user" width="16px" height="16px" />
                        <Typography>{reservation.guestNumber}</Typography>
                      </Stack>
                    </TableCell>

                    <TableCell align="center">
                      <Tooltip title="View">
                        <IconButton
                          sx={{ gap: 2 }}
                          onClick={() => handleOpenModal(reservation._id, true)}
                        >
                          <EyeIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Edit">
                        <IconButton
                          sx={{ gap: 2 }}
                          onClick={() => handleOpenModal(reservation._id)}
                        >
                          <EditIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete">
                        <IconButton
                          sx={{ gap: 2 }}
                          onClick={() => handleOpenDeleteModal(reservation._id)}
                        >
                          <TrashIcon />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Button
            fullWidth
            onClick={() => {
              setReservationTab('new');
            }}
            color="primary"
            variant="contained"
            sx={{ borderRadius: '58px', p: '10px', mt: 2, ':hover': { bgcolor: '#f2734e' } }}
          >
            <Typography fontSize={16} fontWeight={600}>
              Add new reservation
            </Typography>
          </Button>
        </Container>
      </Drawer>

      <ReservationViewEdit
        showReservationModal={openModal}
        setShowReservationModal={handleCloseModal}
      />

      <ConfirmDialog
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        title="Delete"
        content="Are you sure want to delete reservation?"
        action={
          <Button variant="contained" color="error" onClick={() => handleDeleteRow()}>
            Delete
          </Button>
        }
      />
    </>
  );
};

export default ReservationList;
