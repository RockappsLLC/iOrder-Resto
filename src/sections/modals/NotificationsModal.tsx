import { Box, Stack, Drawer, Button, Divider, Container, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';

import Label from 'src/components/label';

interface NotificationsModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

// available -1 - blue
// reserved -2 - orange
// billed-3 - green
// available soon-4 - yellow

const data = [
  {
    tableName: 'Table 06',
    tableStatus: 'Paid',
    status: 2,
    orderID: '#256434',
    tableDec: 'New order',
    time: 'time',
    tableButton: 'View order',
  },
  {
    tableName: 'Table 08',
    tableStatus: 'Paid',
    status: 3,
    orderID: '#256873',
    tableDec: 'New call from the table',
    time: 'time',
    tableButton: 'View order',
  },
  {
    tableName: 'Table 11',
    tableStatus: 'Paid',
    status: 4,
    orderID: '#256873',
    tableDec: 'Failed payment. Offer help',
    time: 'time',
    tableButton: 'View order',
  },
];

const NotificationsModal = ({ showModal, setShowModal }: NotificationsModalProps) => {
  return (
    <Drawer open={showModal} onClose={() => setShowModal(false)} anchor="right">
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'white',
        }}
      >
        <Stack
          mt="auto"
          direction={{ xs: 'row', sm: 'row' }}
          justifyContent="space-between"
          marginY={2}
        >
          <Stack direction="row">
            <Typography variant="h5"> Notifications</Typography>
            <Label color="error">asd</Label>
          </Stack>

          <CloseIcon onClick={() => setShowModal(false)} />
        </Stack>

        <Divider />

        <Stack>
          <Typography variant="body1" marginY={2} color="#828487">
            All notifications are listed here
          </Typography>
        </Stack>

        <Stack>
          {data.map((item) => (
            <Stack
              sx={{ backgroundColor: '#fff', border: '1px solid #E4E4E4' }}
              borderRadius={3}
              mb={2}
            >
              <Stack direction="row" padding={2} justifyContent="space-between">
                <Box
                  borderRadius={30}
                  width={50}
                  height={50}
                  sx={{
                    backgroundColor:
                      // eslint-disable-next-line no-nested-ternary
                      item.status === 2 ? '#FEE9DA' : item.status === 3 ? '#D9F6DB' : '#FDF3DE',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <i className="fi fi-tr-restaurant" style={{ fontSize: '20px' }} />
                </Box>
                <Stack direction="column">
                  <Stack direction="row">
                    <Typography>{item.tableName}</Typography>
                    <Label color="error" ml={1} sx={{ borderRadius: 10 }}>
                      {item.tableStatus}
                    </Label>
                  </Stack>
                  <Typography>{item.tableDec}</Typography>
                </Stack>
                <Button variant="contained" color="error" sx={{ borderRadius: 5, height: '30px' }}>
                  {item.tableButton}
                </Button>
              </Stack>

              <Divider sx={{ color: '#fff', backgroundColor: '#fff' }} />

              <Stack direction="row" my={2} justifyContent="space-between">
                <Typography marginLeft={2}>Order id {item.orderID}</Typography>
                <Label marginRight={2}>asd</Label>
              </Stack>
            </Stack>
          ))}
        </Stack>
      </Container>
    </Drawer>
  );
};

export default NotificationsModal;
