import * as Yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';

import Menu from '@mui/material/Menu';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Table,
  Modal,
  Alert,
  Switch,
  Button,
  Tooltip,
  Divider,
  TableRow,
  MenuItem,
  TableBody,
  TableCell,
  IconButton,
  Typography,
  TableContainer,
  InputAdornment,
} from '@mui/material';

import { MenuItemResponseSchema } from 'src/api/api-schemas';
import { Filter, EyeIcon, EditIcon, TrashIcon } from 'src/assets/icons';
import {
  createMenuItem,
  deleteMenuItem,
  useGetMenuItems,
  updateMenuItemById,
} from 'src/api/menu-items';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
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

const TABLE_HEAD = [
  { id: 'nr', label: 'Sr No.', align: 'left' },
  { id: 'name', label: 'Dish Name', align: 'left' },
  { id: 'price', label: 'Price', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'action', label: 'Action', align: 'center' },
];

export type FormValuesProps = MenuItemResponseSchema;

export default function MenuPage() {
  const [openModal, setOpenModal] = useState({
    open: false,
    idToEdit: '',
    isEdit: false,
    isView: false,
  });

  const handleOpenModal = (id?: string, isViewItem?: boolean) => {
    setOpenModal({
      open: true,
      idToEdit: id || '',
      isEdit: isViewItem ? false : !!id,
      isView: isViewItem || false,
    });
  };

  const handleCloseModal = () => {
    setOpenModal({ open: false, idToEdit: '', isEdit: false, isView: false });
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

  const dataItem = useGetMenuItems();
  const { menuItems, menuItemsLoading } = dataItem as any;

  const [menuItemsData, setMenuItemsData] = useState<MenuItemResponseSchema[]>([]);

  useEffect(() => {
    if (!menuItemsLoading && menuItems.length) {
      setMenuItemsData(menuItems as any);
    }
  }, [menuItemsLoading, menuItems]);

  const [filterName, setFilterName] = useState('');

  const handleFilterName = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterName(event.target.value);
  };

  const handleResetFilter = () => {
    setFilterName('');
  };

  const handleDeleteRow = async () => {
    try {
      const id: any = deleteModal.idToDelete;

      await deleteMenuItem(id);

      const deleteRow = (menuItemsData as any).filter((row: any) => row._id !== id);
      setMenuItemsData(deleteRow);

      handleCloseDeleteModal();
    } catch (error) {
      console.log('error handleDeleteRow: ', error);
    }
  };

  const isFiltered = !!filterName;

  const table = useTable({
    defaultOrderBy: 'name',
  });
  const denseHeight = table.dense ? 34 : 54;

  const [openMenu, setOpenMenu] = useState<null | HTMLElement>(null);
  const [sortOrder, setSortOrder] = useState('asc');

  const dataFiltered = applyFilter({
    inputData: menuItemsData,
    comparator: getComparator(sortOrder as any, 'name'),
    filterName,
  });

  const handleSort = (option: any) => {
    handleCloseFilterMenu();
    setSortOrder(option);
    setMenuItemsData(dataFiltered);
  };

  const handleOpenFilterMenu = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    setOpenMenu(event.currentTarget);
  }, []);

  const handleCloseFilterMenu = useCallback(() => {
    setOpenMenu(null);
  }, []);

  return (
    <Box>
      <div>
        <Modal open={openModal.open} onClose={handleCloseModal}>
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
            {!menuItemsLoading && (
              <RenderForm
                isEdit={openModal.isEdit}
                menuItemsData={menuItemsData}
                openModal={openModal}
                handleCloseModal={handleCloseModal}
                setMenuItemsData={setMenuItemsData}
                isView={openModal.isView}
              />
            )}
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
            sx={{ py: 3, paddingLeft: 0, marginLeft: 0 }}
          >
            <SearchTableToolbar
              isFiltered={isFiltered}
              filterName={filterName}
              onFilterName={handleFilterName}
              onResetFilter={handleResetFilter}
              sx={{ paddingLeft: 0 }}
            />
          </Stack>

          <Stack direction="row" sx={{}}>
            <Button
              variant="contained"
              color="error"
              sx={{ width: '250px', height: '60px', mr: 2 }}
              onClick={() => handleOpenModal()}
            >
              <Iconify icon="ic:baseline-plus" />
              <Typography> Add New Dish</Typography>
            </Button>

            <Box>
              <Button variant="outlined" onClick={handleOpenFilterMenu} sx={{ height: '60px' }}>
                <Typography mr={1}>Filter</Typography>
                <Filter />
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={openMenu}
                onClose={handleCloseFilterMenu}
                open={Boolean(openMenu)}
              >
                {['asc', 'desc'].map((option) => (
                  <MenuItem
                    key={option}
                    selected={sortOrder === option}
                    onClick={() => {
                      handleSort(option);
                    }}
                  >
                    {option === 'asc' ? 'A-Z' : 'Z-A'}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Stack>
        </Stack>

        <Card>
          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={table.dense}
              numSelected={table.selected.length}
              rowCount={menuItemsData.length}
              onSelectAllRows={(checked) =>
                table.onSelectAllRows(
                  checked,
                  menuItemsData.map((row: any) => row.name)
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
                  rowCount={menuItemsData.length}
                  numSelected={table.selected.length}
                  onSort={table.onSort}
                  // onSelectAllRows={(checked) =>
                  //   table.onSelectAllRows(
                  //     checked,
                  //     menuItemsData.map((row: any) => row.name)
                  //   )
                  // }
                  sx={{ backgroundColor: (theme) => theme.palette.grey[500] }}
                />

                <TableBody>
                  {dataFiltered
                    .slice(
                      table.page * table.rowsPerPage,
                      table.page * table.rowsPerPage + table.rowsPerPage
                    )
                    .map((row: any, index: number) => (
                      <TableRow hover key={row._id} selected={table.selected.includes(row.name)}>
                        <TableCell> {index + 1} </TableCell>
                        <TableCell> {row.name} </TableCell>

                        <TableCell align="center">${row.price}</TableCell>

                        <TableCell align="center">
                          <Switch checked={row.status} color="success" />
                        </TableCell>

                        <TableCell align="center">
                          <Tooltip title="View">
                            <IconButton
                              sx={{ gap: 2 }}
                              onClick={() => handleOpenModal(row._id, true)}
                            >
                              <EyeIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Edit">
                            <IconButton sx={{ gap: 2 }} onClick={() => handleOpenModal(row._id)}>
                              <EditIcon />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton
                              sx={{ gap: 2 }}
                              onClick={() => handleOpenDeleteModal(row._id)}
                            >
                              <TrashIcon />
                            </IconButton>
                          </Tooltip>
                        </TableCell>
                      </TableRow>
                    ))}

                  <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(table.page, table.rowsPerPage, menuItemsData.length)}
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
        </Card>
      </div>

      <ConfirmDialog
        open={deleteModal.open}
        onClose={handleCloseDeleteModal}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={() => handleDeleteRow()}>
            Delete
          </Button>
        }
      />
    </Box>
  );
}

const RenderForm = ({
  isEdit,
  menuItemsData,
  openModal,
  handleCloseModal,
  setMenuItemsData,
  isView,
}: any) => {
  const LoginSchema = Yup.object().shape({
    dishName: Yup.string(),
    category: Yup.string(),
    price: Yup.number(),
    time: Yup.number(),
    status: Yup.boolean(),
  });

  const [errorMsg, setErrorMsg] = useState('');

  const oneMenuItem = (menuItemsData as any)?.find((item: any) => item._id === openModal?.idToEdit);

  const defaultValues = {
    name: oneMenuItem?.name || '',
    price: oneMenuItem?.price || 0,
    restaurantId: oneMenuItem?.restaurantId || '',
    menuCategoryId: oneMenuItem?.menuCategoryId || '',
    icon: oneMenuItem?.icon || '',
    status: oneMenuItem?.status,
    preparationTime: oneMenuItem?.preparationTime || 0,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = async (data: FormValuesProps) => {
    try {
      if (isEdit) {
        const asd = await updateMenuItemById(openModal?.idToEdit as any, {
          name: data.name || '',
          price: data.price || 0,
          restaurantId: data.restaurantId || '',
          menuCategoryId: data.menuCategoryId || '',
          icon: 'icon',
          status: data.status || false,
          preparationTime: data.preparationTime || 0,
        });

        setMenuItemsData((prevMenuItems: any) => {
          const updatedMenuItems = prevMenuItems.map((item: any) => {
            if (item.id === openModal?.idToEdit) {
              return asd;
            }
            return item;
          });
          return updatedMenuItems;
        });

        handleCloseModal();
      } else {
        await createMenuItem({
          name: data.name || '',
          price: data.price || 0,
          restaurantId: '653590bec665979a76591c9a',
          // restaurantId: data.restaurantId || '',
          // menuCategoryId: '6535919fc665979a76591ca1',
          menuCategoryId: data.menuCategoryId || '',
          icon: 'icon',
          status: data.status || false,
          preparationTime: data.preparationTime || 0,
        });
        handleCloseModal();
      }
    } catch (error) {
      console.error('error addin item', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  };

  const getFormTitle = () => {
    if (isEdit) {
      return 'Edit dish';
    }
    if (isView) {
      return 'View dish';
    }
    return 'Add new dish';
  };

  return (
    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2} sx={{ width: '100%' }}>
        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Typography variant="h4" fontWeight={600}>
          {getFormTitle()}
        </Typography>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
          }}
        />

        <RHFTextField name="name" label="Enter Dish Name" />
        <RHFTextField name="menuCategoryId" label="Category" />

        <Stack direction="row" gap={1}>
          <RHFTextField
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

          <RHFTextField
            name="preparationTime"
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

        <Controller
          name="status"
          control={control}
          defaultValue={false}
          render={({ field }) => (
            <Switch {...field} onChange={(value) => field.onChange(value)} checked={field.value} />
          )}
        />

        <Stack direction="row" gap={1.5}>
          <Button
            variant="contained"
            fullWidth
            sx={{ backgroundColor: '#a7a19e1a', color: '#201A18', fontWeight: 400 }}
            onClick={handleCloseModal}
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
            disabled={isView}
          >
            Add
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

function applyFilter({
  inputData,
  filterName,
  comparator,
}: {
  inputData: MenuItemResponseSchema[];
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
        (item.price && item.price.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
    );
  }
  return inputData;
}
