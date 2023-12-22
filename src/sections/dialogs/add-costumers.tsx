import * as Yup from 'yup';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import Box from '@mui/material/Box';
import { LoadingButton } from '@mui/lab';
import Button from '@mui/material/Button';
import { Alert, Modal, Stack, Divider, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';
import { CreateCustomerRequestSchema } from 'src/api/api-schemas';
import { createCustomer, useGetCustomers } from 'src/api/customers';

import Scrollbar from 'src/components/scrollbar';
import FormProvider, { RHFTextField } from 'src/components/hook-form';
import RHFAutocomplete from 'src/components/hook-form/rhf-autocomplete';

// export type FormValuesProps = CreateCustomerRequestSchema;

interface FormValuesProps extends CreateCustomerRequestSchema {
  year: string;
  month: string;
  day: string;
}

const Gender = ['male', 'female'];
const Cantons = [
  'Canton 1',
  'Canton 2',
  'Canton 3',
  'Canton 4',
  'Canton 5',
  'Canton 6',
  'Canton 7',
  'Canton 8',
  'Canton 9',
  'Canton 10',
];

interface AddCustomerModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const AddCustomerModal = ({ showModal, setShowModal }: AddCustomerModalProps) => {
  const asd = useGetCustomers();
  console.log('asd', asd);

  const handleCloseAddCustomer = () => {
    setShowModal(false);
  };

  return (
    <Modal open={showModal} onClose={handleCloseAddCustomer}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 700,
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          p: 2.5,
        }}
      >
        <RenderForm handleCloseAddCustomer={handleCloseAddCustomer} />
      </Box>
    </Modal>
  );
};

const RenderForm = ({ handleCloseAddCustomer }: any) => {
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const Days = Array.from({ length: 31 }, (_, i) => (i + 1).toString());
  const Months = Array.from({ length: 12 }, (_, i) => (i + 1).toString());
  const Years = Array.from({ length: 100 }, (_, i) => (2023 - i).toString());

  const AddCustomerSchema: Yup.ObjectSchema<FormValuesProps> = Yup.object()
    .shape({
      name: Yup.string().required('Name is a required field'),
      email: Yup.string().required('Email is a required field'),
      contactNumber: Yup.string().required('Contact nummber is a required field'),
      sex: Yup.mixed<FormValuesProps['sex']>()
        .oneOf(['male', 'female'])
        .required('Sex is a required field'),
      restaurantId: Yup.string().required(),
      street: Yup.string(),
      city: Yup.string(),
      canton: Yup.string(),
      dateOfBirth: Yup.date(),
      year: Yup.string().required('Year is a required field'),
      month: Yup.string().required('Month is a required field'),
      day: Yup.string().required('Day is a required field'),
      initials: Yup.string(),
      pagerNumber: Yup.number(),
      tag: Yup.string(),
      visitNote: Yup.string(),
    })
    .defined();

  const defaultValues: FormValuesProps = {
    name: '',
    email: '',
    contactNumber: '',
    sex: 'male',
    pagerNumber: 0,
    restaurantId: '',
    street: '',
    city: '',
    canton: '',
    year: '',
    month: '',
    day: '',
    dateOfBirth: new Date(),
    tag: '',
    visitNote: '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(AddCustomerSchema),
    defaultValues,
  });

  const localStorageId = localStorage.getItem('restaurantId') || '';

  const {
    reset,
    handleSubmit,
    watch,
    setValue,
    formState: { isSubmitting },
  } = methods;

  function convertDate(originalDateString: any) {
    const parts = originalDateString.split('-');
    const year = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const day = parseInt(parts[2], 10);

    const dateObject = new Date(year, month, day);

    return dateObject;
  }

  const onSubmit = handleSubmit(async (data) => {
    const date = `${data.year}-${data.month}-${data.day}`;
    const finalDate = convertDate(date);

    try {
      await createCustomer({
        name: data.name,
        email: data.email,
        contactNumber: data.contactNumber,
        sex: data.sex,
        restaurantId: localStorageId,
        street: data.street,
        city: data.city,
        canton: data.canton,
        dateOfBirth: finalDate,
      });

      setSuccessMsg('Customer is added successfully');

      setTimeout(() => {
        handleCloseAddCustomer();
      }, 3000);
      console.log('data', data);
    } catch (error) {
      console.error('error asd asd asd ', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Scrollbar sx={{ maxHeight: 600 }}>
        <Stack spacing={2} sx={{ width: '100%' }}>
          <Stack direction="row" justifyContent="space-between">
            <Typography variant="h5">Add customers</Typography>
            <CloseIcon onClick={handleCloseAddCustomer} />
          </Stack>

          {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}
          {!!successMsg && <Alert severity="success">{successMsg}</Alert>}

          <Divider
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: '#C2C2C2',
            }}
          />

          <RHFTextField
            name="name"
            label="Name"
            placeholder="Enter name"
            InputProps={{
              inputProps: {
                pattern: '^[A-Za-züöäÜÖÄ]+$',
                title: 'Only characters from A to Z are allowed',
              },
            }}
          />

          <RHFTextField
            name="contactNumber"
            label="Phone Number"
            placeholder="Enter phone number"
            InputProps={{
              inputProps: {
                pattern: '^[0-9+]*$',
                title: 'Only + and 0-9 numbers are allowed',
              },
            }}
          />

          <RHFTextField name="email" label="Email" placeholder="Enter email" />

          <Stack direction="row" gap={1}>
            <RHFAutocomplete
              fullWidth
              name="sex"
              label="Select Sex"
              options={Gender}
              getOptionLabel={(option: any) => option}
              value={watch('sex') || null}
              onChange={(event: any, newValue: any) => {
                setValue('sex', newValue);
              }}
            />

            <RHFTextField fullWidth name="street" label="Street" placeholder="Enter street" />
          </Stack>

          <Stack direction="row" gap={1}>
            <Stack direction="row" gap={1} width="50%">
              <RHFAutocomplete fullWidth name="day" label="Day" options={Days} />
              <RHFAutocomplete fullWidth name="month" label="Month" options={Months} />
              <RHFAutocomplete fullWidth name="year" label="Year" options={Years} />
            </Stack>

            <RHFTextField sx={{ width: '50%' }} name="city" label="City" placeholder="Enter city" />
          </Stack>

          <RHFAutocomplete
            fullWidth
            name="canton"
            label="Select Canton"
            options={Cantons}
            getOptionLabel={(option: any) => option}
            value={watch('canton') || null}
            onChange={(event: any, newValue: any) => {
              setValue('canton', newValue);
            }}
          />

          <Stack direction="row" gap={1.5}>
            <Button
              variant="outlined"
              color="error"
              fullWidth
              sx={{
                borderRadius: 20,
              }}
              onClick={handleCloseAddCustomer}
            >
              Cancel
            </Button>

            <LoadingButton
              fullWidth
              color="primary"
              type="submit"
              variant="contained"
              loading={isSubmitting}
              sx={{ borderRadius: 20 }}
            >
              Save
            </LoadingButton>
          </Stack>
        </Stack>
      </Scrollbar>
    </FormProvider>
  );
};

export default AddCustomerModal;
