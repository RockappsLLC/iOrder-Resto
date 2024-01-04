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
  Divider,
  TableRow,
  TableBody,
  TableCell,
  IconButton,
  Typography,
  TableContainer,
} from '@mui/material';

import { UserResponseSchema } from 'src/api/api-schemas';
import { EyeIcon, EditIcon, TrashIcon } from 'src/assets/icons';
import { deleteUser, createUser, useGetUsers, updateUserById } from 'src/api/users';

import Iconify from 'src/components/iconify';
import Label from 'src/components/label/label';
import Scrollbar from 'src/components/scrollbar';
import { ConfirmDialog } from 'src/components/custom-dialog';
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

import SearchTableToolbar from '../../../../components/table/search-table-toolbar';

const StatusData = [
  { name: 'Active', status: true },
  { name: 'Inactive', status: false },
];

const TABLE_HEAD = [
  { id: 'nr', label: 'Staff ID', align: 'left' },
  { id: 'name', label: 'Member Name', align: 'left' },
  { id: 'contact', label: 'Contact Number', align: 'left' },
  { id: 'email', label: 'Email Address', align: 'left' },
  { id: 'status', label: 'Status', align: 'left' },
  { id: 'action', label: 'Action', align: 'center' },
];

export type FormValuesProps = UserResponseSchema;

export default function JwtLoginView() {
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

  const [filterName, setFilterName] = useState('');

  const { users, usersLoading } = useGetUsers();

  const [usersData, setUsersData] = useState<UserResponseSchema[]>([]);

  useEffect(() => {
    if (!usersLoading && users.length) {
      setUsersData(users);
    }
  }, [usersLoading, users]);

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
  const rowsPerPage = usersData.length;

  const dataFiltered = applyFilter({
    inputData: usersData as any,
    comparator: getComparator(table.order, table.orderBy),
    filterName,
  });

  const handleDeleteRow = async () => {
    try {
      const id: any = deleteModal.idToDelete;

      await deleteUser(id);

      const deleteRow = usersData.filter((row: any) => row._id !== id);
      setUsersData(deleteRow);

      handleCloseDeleteModal();
    } catch (error) {
      console.log('error handleDeleteRow: ', error);
    }
  };

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
            <RenderForm
              openModal={openModal}
              handleCloseModal={handleCloseModal}
              isEdit={openModal.isEdit}
              isView={openModal.isView}
              usersData={usersData}
              setUsersData={setUsersData}
            />
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
              sx={{ paddingLeft: 0 }}
            />
          </Stack>
          <Stack direction="row" sx={{}}>
            <Button
              variant="contained"
              color="error"
              sx={{ width: '250px', height: '60px' }}
              onClick={() => handleOpenModal()}
            >
              <Iconify icon="ic:baseline-plus" />
              <Typography> Add Tax</Typography>
            </Button>
          </Stack>
        </Stack>

        <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
          <TableSelectedAction
            dense={table.dense}
            numSelected={table.selected.length}
            rowCount={usersData.length}
            onSelectAllRows={(checked) =>
              table.onSelectAllRows(
                checked,
                usersData.map((row: any) => row?.name)
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

          <Scrollbar sx={{ maxHeight: 400 }}>
            <Table stickyHeader size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
              <TableHeadCustom
                order={table.order}
                orderBy={table.orderBy}
                headLabel={TABLE_HEAD}
                rowCount={usersData.length}
                numSelected={table.selected.length}
                onSort={table.onSort}
                // onSelectAllRows={(checked) =>
                //   table.onSelectAllRows(
                //     checked,
                //     usersData.map((row: any) => row?.firstName)
                //   )
                // }
              />

              <TableBody>
                {dataFiltered
                  .slice(table.page * rowsPerPage, table.page * rowsPerPage + rowsPerPage)
                  .map((row) => (
                    <TableRow
                      hover
                      key={row._id}
                      // selected={table.selected.includes(row?.firstName)}
                    >
                      {/* <TableCell padding="checkbox">
                        <Checkbox checked={table.selected.includes(row?.firstName)} />
                      </TableCell> */}
                      <TableCell> {row?._id} </TableCell>
                      <TableCell> {row.firstName} </TableCell>

                      <TableCell align="left">{row.contactNumber}</TableCell>
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
                  emptyRows={emptyRows(table.page, rowsPerPage, usersData.length)}
                />
              </TableBody>
            </Table>
          </Scrollbar>
        </TableContainer>
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
  openModal,
  handleCloseModal,
  isEdit,
  isView,
  usersData,
  setUsersData,
}: any) => {
  const [errorMsg, setErrorMsg] = useState('');

  const LoginSchema = Yup.object().shape({
    firstName: Yup.string(),
    email: Yup.string(),
    contactNumber: Yup.string(),
    status: Yup.boolean(),
  });

  const oneUser = usersData?.find((item: any) => item._id === openModal?.idToEdit);

  const defaultValues = {
    firstName: oneUser?.firstName || '',
    email: oneUser?.email || '',
    contactNumber: oneUser?.contactNumber || '',
    status: oneUser?.status || true,
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      if (isEdit) {
        await updateUserById(openModal?.idToEdit, {
          firstName: data.firstName || '',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          status: data.status,
        });

        const updatedUsersData = usersData.map((user: any) => {
          if (user._id === openModal?.idToEdit) {
            return {
              ...user,
              firstName: data.firstName || user.firstName,
              contactNumber: data.contactNumber || user.contactNumber,
              email: data.email || user.email,
              status: data.status,
            };
          }
          return user;
        });

        setUsersData(updatedUsersData);
        handleCloseModal();
      } else {
        await createUser({
          firstName: data.firstName || '',
          lastName: 'asd',
          contactNumber: data.contactNumber || '',
          email: data.email || '',
          restaurantId: '653590bec665979a76591c9a',
          password: 'asd',
          role: 1,
          status: data.status || true,
        });

        handleCloseModal();
      }
      console.log('data', data);
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  const getFormTitle = () => {
    if (isEdit) {
      return 'Edit member';
    }
    if (isView) {
      return 'View member';
    }
    return ' Add New Tax';
  };

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
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

        <RHFTextField name="firstName" label="Enter Name" />

        <RHFTextField name="contactNumber" label="Contact Number" />

        <RHFTextField name="email" label="Email Address" />

        <RHFAutocomplete
          name="status"
          label="Select Status"
          options={StatusData}
          getOptionLabel={(option: any) => option.name || option.status}
          value={StatusData.find((option) => option.status) || null}
          onChange={(event: any, newValue: any) => {
            const selectedStatus = newValue.status;
            setValue('status', selectedStatus);
          }}
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
  inputData: UserResponseSchema[];
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
        (item.firstName && item.firstName.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) ||
        (item.email && item.email.toLowerCase().indexOf(filterName.toLowerCase()) !== -1) ||
        (item.contactNumber &&
          item.contactNumber.toString().toLowerCase().indexOf(filterName.toLowerCase()) !== -1)
    );
  }

  return inputData;
}
