import { Box, Stack, Drawer, Button, Divider, Container, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';

import Label from 'src/components/label';

interface UpcomingOrdersDrawerProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const data = [
  {
    orderId: '#256873',
    status: 0,
    name: 'John wick',
    address: 'Test 555, Alimps Campus, Binaker',
    time: '14 mins',
  },
  {
    orderId: '#256873',
    status: 1,
    name: 'Chintya lin',
    address: 'Test 555, Alimps Campus, Binaker',
    time: '14 mins',
  },
  {
    orderId: '#256873',
    status: 0,
    name: 'Brandon po',
    address: 'Test 555, Alimps Campus, Binaker',
    time: '14 mins',
  },
  {
    orderId: '#256873',
    status: 1,
    name: 'Amanda',
    address: 'Test 555, Alimps Campus, Binaker',
    time: '14 mins',
  },
  {
    orderId: '#256873',
    status: 0,
    name: 'Michael luck',
    address: 'Test 555, Alimps Campus, Binaker',
    time: '14 mins',
  },
];

const UpcomingOrdersDrawer = ({ showModal, setShowModal }: UpcomingOrdersDrawerProps) => {
  const handleRejectButton = () => {
    console.log('Reject button clicked');
  };

  const handleDeliveryButton = () => {
    console.log('Delivery button clicked');
  };

  return (
    <Drawer
      open={showModal}
      onClose={() => setShowModal(false)}
      anchor="right"
      PaperProps={{
        style: {
          backgroundColor: 'white',
        },
      }}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}
      >
        <Stack
          mt="auto"
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          marginY={2}
        >
          <Stack direction="row" justifyContent="center" alignItems="center">
            <Typography variant="h5"> Upcoming Orders</Typography>
            <Label color="error" ml={1} sx={{ borderRadius: 5 }}>
              1
            </Label>
          </Stack>

          <CloseIcon onClick={() => setShowModal(false)} />
        </Stack>

        <Divider />

        <Stack>
          <Typography variant="body1" marginY={2} color="#828487">
            Additional order are almost ready. Would you like to take them with you?
          </Typography>
        </Stack>

        <Stack>
          {data.map((item) => (
            <Stack
              sx={{ backgroundColor: '#fff', border: '1px solid #E4E4E4' }}
              borderRadius={3}
              mb={2}
            >
              <Stack direction="row" padding={2}>
                <Box
                  borderRadius={30}
                  width={50}
                  height={50}
                  sx={{
                    backgroundColor: '#FDF3DE',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                />

                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Stack direction="column" ml={1}>
                    <Stack direction="row">
                      <Typography variant="body2" color="#828487">
                        Order ID {item.orderId}
                      </Typography>

                      <Label
                        color={item.status === 0 ? 'success' : 'error'}
                        ml={1}
                        sx={{ borderRadius: 10 }}
                        fontWeight={400}
                      >
                        {item.status === 0 ? 'Paid' : 'Unpaid'}
                      </Label>
                    </Stack>

                    <Typography variant="subtitle1">{item.name}</Typography>
                  </Stack>

                  <Stack direction="row" gap={1}>
                    <Button
                      variant="outlined"
                      color="error"
                      sx={{ borderRadius: 5, height: '30px' }}
                      onClick={handleRejectButton}
                    >
                      Reject
                    </Button>

                    <Button
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: 5, height: '30px' }}
                      onClick={handleDeliveryButton}
                    >
                      Delivery
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              <Divider sx={{ color: '#fff', backgroundColor: '#fff' }} />

              <Stack direction="row" my={2} justifyContent="space-between" px={2}>
                <Stack direction="row">
                  <i className="fi fi-tr-map-pin" />
                  <Typography>{item.address}</Typography>
                </Stack>

                <Label>
                  <i className="fi fi-tr-clock-seven" />
                  <Typography ml={1} variant="caption">
                    {item.time}
                  </Typography>
                </Label>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Drawer>
  );
};

export default UpcomingOrdersDrawer;
