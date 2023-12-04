import Drawer from '@mui/material/Drawer';
import Card from '@mui/material/Card';

import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Iconify from 'src/components/iconify';

function createData(customerName: string, time: string, table: string, guestNr: number) {
  return { customerName, time, table, guestNr };
}

const rows = [
  createData('Frozen yoghurt', '159', '6.0', 24),
  createData('Ice cream sandwich', '237', '9.0', 37),
  createData('Eclair', '262', '16', 234),
  createData('Cupcake', '305', '3.7', 342),
  createData('Gingerbread', '356', '16', 49),
];

const ReservationList = ({ open, hide }: any) => {
  return (
    <Drawer open={open} onClose={hide} anchor="right">
      <Card>
        <Typography>Select date</Typography>
      </Card>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Customer Name</TableCell>
              <TableCell align="center">Time</TableCell>
              <TableCell align="center">Table</TableCell>
              <TableCell align="center">Guest Nr.</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={row.customerName}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.customerName}
                </TableCell>
                <TableCell align="center">{row.time}</TableCell>
                <TableCell align="center">{row.table}</TableCell>
                <TableCell align="center" sx={{display: "flex", alignItems: "center", justifyContent: "center", gap: 1}}>
                  <Iconify icon="tabler:user" width="16px" height="16px" />
                  <Typography>{row.guestNr}</Typography>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Button fullWidth color="primary" sx={{ p: "12px", borderRadius: "58px", mx: "10px" }}>Add New Reservation</Button>
    </Drawer>
  );
};

export default ReservationList;
