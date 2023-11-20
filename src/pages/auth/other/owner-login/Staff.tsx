import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Stack,
  Table,
  Modal,
  Alert,
  Button,
  Tooltip,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TextField,
  IconButton,
  Typography,
  TableContainer,
  InputAdornment,
} from '@mui/material';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
} from 'src/components/table';

type RowDataType = {
  nr: number;
  name: string;
  contact: number;
  email: string;
  status: any;
};

const StatusData = [
  { name: 'Active', status: true },
  { name: 'Inactive', status: false },
];

function createData(nr: number, name: string, contact: number, email: string, status: boolean) {
  return { nr, name, contact, email, status };
}

const TABLE_DATA = [
  createData(1246, 'Robert Fox', 6295550129, 'robertfox@example.com', false),
  createData(1247, 'Ronald Richards', 7025550122, 'ronaldrichards@example.com', true),
  createData(1248, 'Savannah Nguyen', 2085550112, 'savannah@example.com', false),
  createData(1249, 'Darlene Robertson', 3035550105, 'darlene.r@example.com', true),
  createData(1250, 'Kristin Watson', 6295550129, 'kristin.watson@example.com', true),
  createData(1251, 'Dianne Russell', 6295550129, 'dianne.r@example.com', false),
  createData(1252, 'Darrell Steward', 6295550129, 'darrell.steward@example.com', true),
];

const TABLE_HEAD = [
  { id: 'nr', label: 'Staff ID', align: 'left' },
  { id: 'name', label: 'Member Name', align: 'left' },
  { id: 'contact', label: 'Contact Number', align: 'left' },
  { id: 'email', label: 'Email Address', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'action', label: 'Action', align: 'center' },
];

export default function JwtLoginView() {
  const [tableData, setTableData] = useState<RowDataType[]>([]);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const table = useTable({
    defaultOrderBy: 'calories',
  });
  const denseHeight = table.dense ? 34 : 54;

  useEffect(() => {
    setTableData(TABLE_DATA);
  }, []);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const LoginSchema = Yup.object().shape({
    dishName: Yup.string(),
    category: Yup.string(),
    contact: Yup.number(),
    time: Yup.number(),
    status: Yup.object({
      name: Yup.string(),
      status: Yup.boolean(),
    }),
  });

  const defaultValues = {
    dishName: '',
    category: '',
    contact: 0,
    time: 0,
    status: { name: '', status: true },
  };

  const methods = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
    try {
      console.log('data', data);
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const renderForm = (
    <Stack spacing={2} sx={{ width: '100%' }}>
      {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

      <Typography variant="h4" fontWeight={600}>
        Add New Member
      </Typography>
      <Box
        style={{
          width: '100%',
          height: '1px',
          background: 'rgba(167, 161, 158, 0.10)',
        }}
      />
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        spacing={1}
        sx={{
          borderRadius: '8px',
        }}
      >
        <Logo />
      </Stack>

      <RHFTextField name="name" label="Enter Name" />
      <RHFTextField name="contact" label="Contact Number" />
      <RHFTextField name="email" label="Email Address" />
      <RHFAutocomplete
        name="status"
        label="Select Status"
        options={StatusData}
        getOptionLabel={(option: any) => option.name}
        defaultValue={StatusData.find((option) => option.name === defaultValues.status.name)}
      />

      <Stack direction="row" gap={1.5}>
        <Button
          variant="contained"
          fullWidth
          sx={{ backgroundColor: '#a7a19e1a', color: '#201A18', fontWeight: 400 }}
          onClick={handleClose}
        >
          Cancel
        </Button>

        <LoadingButton
          fullWidth
          color="primary"
          type="submit"
          variant="contained"
          loading={isSubmitting}
          sx={{ fontWeight: 400 }}
        >
          Add
        </LoadingButton>
      </Stack>
    </Stack>
  );

  return (
    <Box>
      <div>
        <Modal open={open} onClose={handleClose}>
          <Box
            sx={{
              position: 'absolute' as const,
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 400,
              borderRadius: 2,
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 2.5,
            }}
          >
            <FormProvider methods={methods} onSubmit={onSubmit}>
              {renderForm}
            </FormProvider>
          </Box>
        </Modal>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Stack
            spacing={2}
            alignItems="center"
            direction={{
              xs: 'row',
              md: 'row',
            }}
            sx={{ py: 3 }}
          >
            <TextField
              fullWidth
              placeholder="Search"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                ),
              }}
              sx={{ width: '344px' }}
            />
          </Stack>
          <Stack direction="row" sx={{}}>
            <Button
              variant="contained"
              color="error"
              sx={{ width: '250px', height: '60px', mr: 2 }}
              onClick={handleOpen}
            >
              <Iconify icon="ic:baseline-plus" />
              <Typography> Add New Member</Typography>
            </Button>
          </Stack>
        </Stack>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={tableData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                tableData.map((row) => row.name)
              )
            }
            action={
              <Tooltip title="Delete">
                <IconButton color="primary">
                  <Iconify icon="solar:trash-bin-trash-bold" />
                </IconButton>
              </Tooltip>
            }
          />

          <Scrollbar>
            <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={tableData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                onSelectAllRows={(checked) =>
                  table.onSelectAllRows(
                    checked,
                    tableData.map((row) => row.name)
                  )
                }
              />

              <TableBody>
                {dataFiltered
                  .slice(
                    table.page * table.rowsPerPage,
                    table.page * table.rowsPerPage + table.rowsPerPage
                  )
                  .map((row) => (
                    <TableRow hover key={row.name} selected={table.selected.includes(row.name)}>
                      <TableCell padding="checkbox">
                        <Checkbox checked={table.selected.includes(row.name)} />
                      </TableCell>
                      <TableCell> {row.nr} </TableCell>
                      <TableCell> {row.name} </TableCell>

                      <TableCell align="left">{row.contact}</TableCell>
                      <TableCell align="left">{row.email}</TableCell>

                      <TableCell align="left">
                        <Typography color={row.status ? 'success.light' : 'error'}>
                          <Label variant="soft" color={row.status ? 'success' : 'error'}>
                            <Typography fontWeight={400} variant="caption">
                              {row.status ? 'Active' : 'Inactive'}{' '}
                            </Typography>
                          </Label>
                        </Typography>
                      </TableCell>

                      <TableCell align="right">
                        <Tooltip title="Filter list">
                          <IconButton sx={{ gap: 2 }}>
                            <Iconify icon="ph:eye-light" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter list">
                          <IconButton sx={{ gap: 2 }}>
                            <Iconify icon="iconoir:edit" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="Filter list">
                          <IconButton sx={{ gap: 2 }}>
                            <Iconify icon="solar:trash-bin-minimalistic-linear" />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  ))}

                <TableEmptyRows
                  height={denseHeight}
                  emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
      </div>
    </Box>
  );
}

function applyFilter({
  inputData,
  comparator,
}: {
  inputData: RowDataType[];
  comparator: (a: any, b: any) => number;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  return inputData;
}
