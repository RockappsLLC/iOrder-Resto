import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';

import { LoadingButton } from '@mui/lab';
import { Box, Alert, Modal, Stack, Button, Divider, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';
import { CustomerResponseSchema } from 'src/api/api-schemas';
import { useGetCustomers, updateCustomerById } from 'src/api/customers';

import FormProvider, { RHFTextField } from 'src/components/hook-form';

interface EditCustomerInfoProps {
  viewEditModal: { openModal: boolean; id: string };
  setViewEditModal: (openModal: boolean, id: string) => void;
}

export type FormValuesProps = CustomerResponseSchema;

const EditCustomerInfo = ({ viewEditModal, setViewEditModal }: EditCustomerInfoProps) => {
  const restaurantId = localStorage.getItem('restaurantId') || '';

  const { customers, customersLoading } = useGetCustomers({
    restaurantId,
  });

  const [customersData, setCustomersData] = useState<CustomerResponseSchema[]>([]);

  useEffect(() => {
    if (!customersLoading && customers.length) {
      setCustomersData(customers);
    }
  }, [customersLoading, customers]);

  const handleCloseModal = () => {
    setViewEditModal(false, '');
  };

  return (
    <Modal open={viewEditModal?.openModal} onClose={handleCloseModal}>
      <Box
        sx={{
          position: 'absolute' as const,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: 2,
          bgcolor: 'background.paper',
          boxShadow: 24,
          minWidth: 700,
          p: 2.5,
        }}
      >
        <RenderForm
          customersData={customersData}
          viewEditModal={viewEditModal}
          handleCloseModal={handleCloseModal}
          setCustomersData={setCustomersData}
        />
      </Box>
    </Modal>
  );
};

const RenderForm = ({ handleCloseModal, viewEditModal, customersData, setCustomersData }: any) => {
  const [errorMsg, setErrorMsg] = useState('');

  const CustomerSchema = Yup.object().shape({
    // name: Yup.string(),
    // email: Yup.string(),
  });

  const selectedCustomer = customersData.filter((item: any) => item._id === viewEditModal.id);
  const customerData = selectedCustomer[0];

  const defaultValues = {
    _id: customerData?._id || '',
    name: customerData?.name || '',
    email: customerData?.email || '',
    contactNumber: customerData?.contactNumber || '',
    dateOfBirth: customerData?.dateOfBirth || Date,
    sex: customerData?.sex || '',
    street: customerData?.street || '',
    city: customerData?.city || '',
    canton: customerData?.canton || '',
    restaurantId: customerData?.restaurantId || '',
  };

  const methods = useForm<FormValuesProps>({
    resolver: yupResolver(CustomerSchema),
    defaultValues,
  });

  const {
    reset,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await updateCustomerById(viewEditModal?.id, {
        name: data?.name || '',
        email: data?.email || '',
        contactNumber: data?.contactNumber || '',
        street: data?.street || '',
        city: data?.city || '',
        canton: data?.canton || '',
      });

      handleCloseModal();
    } catch (error) {
      console.error('error', error);
      reset();
      setErrorMsg(typeof error === 'string' ? error : error.message);
    }
  });

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Stack spacing={1} sx={{ width: '100%' }}>
        <Stack
          mt="auto"
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          marginY={2}
        >
          <Typography variant="h5"> Edit customer info</Typography>
          <CloseIcon onClick={handleCloseModal} />
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
            marginBottom: 2,
          }}
        />

        {!!errorMsg && <Alert severity="error">{errorMsg}</Alert>}

        <Stack direction="row" gap={1}>
          <RHFTextField name="name" label="Name" />
          <RHFTextField name="email" label="Email Address" />
        </Stack>

        <Stack direction="row" gap={1}>
          <RHFTextField name="contactNumber" label="Contact Number" />
          <RHFTextField name="street" label="Street" />
        </Stack>

        <Stack direction="row" gap={1}>
          <RHFTextField name="city" label="City" />
          <RHFTextField name="canton" label="Canton" />
        </Stack>

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
          >
            Confirm
          </LoadingButton>
        </Stack>
      </Stack>
    </FormProvider>
  );
};

export default EditCustomerInfo;
