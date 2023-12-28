import { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';

import { LoadingButton } from '@mui/lab';
import {
  Box,
  Grid,
  Alert,
  Modal,
  Stack,
  Button,
  Divider,
  TextField,
  Typography,
} from '@mui/material';

import { ReservationResponseSchema } from 'src/api/api-schemas';
import { useGetCustomers, updateCustomerById } from 'src/api/customers';
import { useGetReservations, updateReservationById } from 'src/api/reservations';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

// createCustomer
//   const { reservation, setReservation, setReservationTab } = useReservationContext();

export type FormValuesProps = [];

interface ReservationModalProps {
  showReservationModal: any;
  setShowReservationModal: any;
}

const ReservationViewEdit = ({
  showReservationModal,
  setShowReservationModal,
}: ReservationModalProps) => {
  const { reservations, reservationsLoading } = useGetReservations();
  const [reservationsData, setReservationsData] = useState<ReservationResponseSchema[]>([]);

  useEffect(() => {
    if (!reservationsLoading && reservations.length) {
      setReservationsData(reservations);
    }
  }, [reservationsLoading, reservations]);

  const { customers, customersLoading } = useGetCustomers();
  const [customersData, setCustomersData] = useState<ReservationResponseSchema[]>([]);

  useEffect(() => {
    if (!customersLoading && customers.length) {
      setCustomersData(customers);
    }
  }, [customersLoading, customers]);

  return (
    <Modal open={showReservationModal.open} onClose={setShowReservationModal}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 600,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2.5,
        }}
      >
        <RenderForm
          isEdit={showReservationModal.isEdit}
          isView={showReservationModal.isView}
          handleCloseModal={setShowReservationModal}
          openModal={showReservationModal}
          reservationsData={reservationsData}
          setReservationsData={setReservationsData}
          customersData={customersData}
          setCustomersData={setCustomersData}
        />
      </Box>
    </Modal>
  );
};

const tags = ['VIP', 'Birthday', 'Anniversary', 'Private Dining', 'First time'];

const RenderForm = ({
  openModal,
  handleCloseModal,
  isEdit,
  isView,
  reservationsData,
  setReservationsData,
  customersData,
  setCustomersData,
}: any) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [tagName, setTagName] = useState('');
  const [selectedTime, setSelectedTime] = useState('');

  // const LoginSchema = Yup.object().shape({
  //   firstName: Yup.string(),
  //   email: Yup.string(),
  //   contactNumber: Yup.string(),
  //   status: Yup.boolean(),
  // });

  //     open: false,
  // idToEdit: '',
  // isEdit: false,
  // isView: false,

  const reservationWithCustomer = reservationsData?.find(
    (item: any) => item._id === openModal?.idToEdit
  );

  const matchingCustomer = customersData.find(
    (customer: any) => customer._id === reservationWithCustomer.userId
  );

  const customerId = matchingCustomer?._id;

  const combinedObject = {
    reservation: reservationWithCustomer,
    customer: matchingCustomer,
  };

  console.log('combinedObject', combinedObject);

  useEffect(() => {
    setTagName(matchingCustomer?.tag || '');
    setSelectedTime(reservationWithCustomer?.startTime || ''); // Set initial time here
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [matchingCustomer, reservationWithCustomer]);

  const defaultValues = {
    name: matchingCustomer?.name,
    email: matchingCustomer?.email,
    contactNumber: matchingCustomer?.contactNumber,
    tag: tagName,
    visitNote: matchingCustomer?.visitNote,
    startTime: selectedTime,
  };

  console.log('defaultValues', defaultValues);

  const methods = useForm<FormValuesProps>({
    // resolver: yupResolver(LoginSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    control,
    // setValue,
    formState: { isSubmitting, errors },
  } = methods;

  function formatToISOStringWithMilliseconds(dateString: any) {
    const date = new Date(dateString);
    const isoString = date.toISOString();
    return `${isoString.slice(0, 19)}.000Z`;
  }

  // const asd = formatToISOStringWithMilliseconds(selectedTime);
  // console.log('asdasd', asd);

  const onSubmit = handleSubmit(async (data: any) => {
    try {
      if (isEdit) {
        console.log('data 111', data);
        const restaurantId = await localStorage.getItem('restaurantId');

        console.log('customerId', customerId);

        await updateCustomerById(String(customerId), {
          // ...matchingCustomer,
          name: data.name,
          email: data.email,
          contactNumber: data.contactNumber,
          visitNote: data?.visitNote,
        });

        console.log('formated', formatToISOStringWithMilliseconds(data.startTime) as any);
        await updateReservationById(openModal?.idToEdit, {
          // ...reservationWithCustomer,
          startTime: formatToISOStringWithMilliseconds(data.startTime) as any,
          // restaurantId: String(restaurantId),
        });

        handleCloseModal();
      } else {
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
      return 'Edit reservation';
    }
    return 'View reservation';
  };

  // const [selectedTime, setSelectedTime] = useState(''); // Set initial time here

  const handleTimeChange = (event: any) => {
    setSelectedTime(event.target.value);
  };

  // const formattedTime = new Date(selectedTime)?.toISOString()?.slice(0, 16);

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

        <RHFTextField fullWidth name="name" label="Full name" />

        <Stack direction="row" gap={1}>
          <RHFTextField name="email" label="Email" />
          <RHFTextField name="contactNumber" label="Phone number" />
        </Stack>

        <Stack direction="row" gap={1}>
          {/* <RHFTextField name="email" label="Date" /> */}
          {/* <TextField
            fullWidth
            label="Select Time"
            type="datetime-local"
            name="startTime"
            value={selectedTime}
            onChange={handleTimeChange}
            InputLabelProps={{
              shrink: true,
            }}
          /> */}

          <TextField
            label="Select Time"
            type="datetime-local"
            fullWidth
            value={selectedTime}
            onChange={(e) => setSelectedTime(e.target.value)}
            InputLabelProps={{
              shrink: true,
            }}
          />
          {/* <RHFTextField name="email" label="Time" /> */}
        </Stack>

        <Grid item display="flex" alignItems="center" gap={1}>
          {tags.map((tag: string) => (
            <Button
              key={tag}
              onClick={() => setTagName(tag)}
              sx={{
                borderRadius: '40px',
                fontWeight: 400,
                bgcolor: tag === tagName ? '#FFF5EE' : 'inherit',
              }}
              variant="outlined"
              color={tag === tagName ? 'primary' : 'inherit'}
            >
              {tag}
            </Button>
          ))}
        </Grid>

        <Controller
          control={control}
          name="visitNote"
          render={({ field }) => (
            <TextField
              fullWidth
              // name="visitNote"
              label="Visit note"
              placeholder="Write reservation note here..."
              multiline
              rows={5}
              {...field}
              InputProps={{
                inputProps: {
                  pattern: '^[A-Za-züöäÜÖÄ., ]+$',
                  title: 'Only characters from A to Z are allowed',
                },
              }}
              //   error={Boolean(errors.visitNote)}
              //   {...(errors.visitNote && { helperText: errors.visitNote.message })}
            />
          )}
        />

        {/* <RHFTextField name="contactNumber" label="Contact Number" /> */}

        {/* 
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
        /> */}

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

export default ReservationViewEdit;
