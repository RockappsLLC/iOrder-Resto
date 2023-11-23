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
  Switch,
  Button,
  Tooltip,
  Divider,
  TableRow,
  Checkbox,
  TableBody,
  TableCell,
  TextField,
  IconButton,
  Typography,
  TableContainer,
  InputAdornment,
  FormControlLabel,
} from '@mui/material';

import { useGetMenuItems } from 'src/api/menu-items';
import { EyeIcon, EditIcon, TrashIcon } from 'src/assets/icons';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from 'src/components/table';

import SearchTableToolbar from '../../../../components/table/search-table-toolbar';

type RowDataType = {
  nr: number;
  name: string;
  price: number;
  status: boolean;
};

function createData(nr: number, name: string, price: number, status: boolean) {
  return { nr, name, price, status };
}

const TABLE_DATA = [
  createData(1, 'Cupcake', 305, true),
  createData(2, 'Donut', 452, false),
  createData(3, 'Eclair', 262, true),
  createData(4, 'Frozen yoghurt', 159, false),
  createData(5, 'Gingerbread', 356, true),
  createData(6, 'Honeycomb', 408, false),
  createData(7, 'Ice cream sandwich', 237, true),
  createData(8, 'Jelly Bean', 375, false),
  createData(9, 'KitKat', 518, true),
  createData(10, 'Lollipop', 392, false),
  createData(11, 'Marshmallow', 318, true),
  createData(12, 'Nougat', 360, false),
];

const TABLE_HEAD = [
  { id: 'nr', label: 'Sr No.', align: 'left' },
  { id: 'name', label: 'Dish Name', align: 'left' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

export default function JwtLoginView() {
  const [filterName, setFilterName] = useState('');
  const [tableData, setTableData] = useState<RowDataType[]>([]);
  const [open, setOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dataItem = useGetMenuItems();
  const { menuItems, menuItemsLoading } = dataItem;

  console.log('menuItems', menuItems);
  console.log('menuItemsLoading', menuItemsLoading);

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };
  const handleResetFilter = () => {
    setFilterName('');
  };

  const isFiltered = !!filterName;

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
    filterName,
  });

  const LoginSchema = Yup.object().shape({
    dishName: Yup.string(),
    category: Yup.string(),
    price: Yup.number(),
    time: Yup.number(),
    status: Yup.boolean(),
  });

  const defaultValues = {
    dishName: '',
    category: '',
    price: 0,
    time: 0,
    status: true,
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
        Add new dish
      </Typography>

      <Divider
        sx={{
          width: '100%',
          height: '1px',
          backgroundColor: '#C2C2C2',
        }}
      />

      <RHFTextField name="dishName" label="Enter Dish Name" />
      <RHFTextField name="category" label="Category" />

      <Stack direction="row" gap={1}>
        <TextField
          name="price"
          label="Price"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Iconify icon="lucide:circle-dollar-sign" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />

        <TextField
          name="time"
          label="Preparation time"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton edge="end">
                  <Iconify icon="wi:time-7" />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <FormControlLabel
        control={<Switch size="small" color="success" checked name="status" />}
        label="Status"
        labelPlacement="top"
        sx={{ textAlign: 'center', alignSelf: 'flex-start' }}
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
            <SearchTableToolbar
              isFiltered={isFiltered}
              filterName={filterName}
              onFilterName={handleFilterName}
              onResetFilter={handleResetFilter}
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
              <Typography> Add New Dish</Typography>
            </Button>

            <Tooltip title="Filter list">
              <IconButton sx={{ gap: 2 }}>
                <Typography>Filter</Typography>
                <Iconify icon="ic:round-filter-list" />
              </IconButton>
            </Tooltip>
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
                sx={{ backgroundColor: (theme) => theme.palette.grey[500] }}
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

                      <TableCell align="center">{row.price}</TableCell>

                      <TableCell align="center">
                        <Switch checked={row.status} color="success" />
                      </TableCell>

                      <TableCell align="center">
                        <Tooltip title="eye">
                          <IconButton sx={{ gap: 2 }}>
                            <EyeIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="edit">
                          <IconButton sx={{ gap: 2 }}>
                            <EditIcon />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="delete">
                          <IconButton sx={{ gap: 2 }}>
                            <TrashIcon />
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

        <TablePaginationCustom
          count={dataFiltered.length}
          page={table.page}
          rowsPerPage={table.rowsPerPage}
          onPageChange={table.onChangePage}
          onRowsPerPageChange={table.onChangeRowsPerPage}
          labelRowsPerPage="Showing"
          dense={table.dense}
          onChangeDense={table.onChangeDense}
        />
      </div>
    </Box>
  );
}

function applyFilter({
  inputData,
  filterName,
  comparator,
}: {
  inputData: RowDataType[];
  comparator: (a: any, b: any) => number;
  filterName: string;
}) {
  const stabilizedThis = inputData.map((el, index) => [el, index] as const);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (item) =>
        (item.name && item.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) ||
        (item.nr && item.nr.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1) ||
        (item.price && item.price.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
    );
  }
  return inputData;
}
