import { Box, Stack, Drawer, Button, Divider, Container, Typography } from '@mui/material';

import { CloseIcon } from 'src/assets/icons';

import Label from 'src/components/label';

interface NotificationsModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const data = [
  {
    tableName: 'Table 06',
    tableStatus: 'Paid',
    status: 2,
    orderID: '#256434',
    tableDec: 'New order',
    time: '14min',
    tableButton: 'View order',
  },
  {
    tableName: 'Table 08',
    tableStatus: 'Paid',
    status: 3,
    orderID: '#256873',
    tableDec: 'New call from the table',
    time: '14min',
    tableButton: 'View order',
  },
  {
    tableName: 'Table 11',
    tableStatus: 'Paid',
    status: 4,
    orderID: '#256873',
    tableDec: 'Failed payment. Offer help',
    time: '14min',
    tableButton: 'View order',
  },
];

const NotificationsModal = ({ showModal, setShowModal }: NotificationsModalProps) => {
  const handleViewOrderButton = () => {
    console.log('view order button  clicked');
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

        <Stack
          sx={{ backgroundColor: '#F15F34', border: '1px solid #E4E4E4' }}
          borderRadius={3}
          mb={2}
        >
          <Stack direction="row" padding={2}>
            <Box
              borderRadius={30}
              width={50}
              height={50}
              sx={{
                backgroundColor: '#FFF',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <i className="fi fi-tr-beacon" style={{ fontSize: '20px' }} />
            </Box>

            <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
              <Stack direction="column" ml={1}>
                <Stack direction="row">
                  <Typography variant="body2" color="#FFF">
                    Table 08
                  </Typography>

                  <Label
                    ml={1}
                    sx={{ borderRadius: 10, backgroundColor: '#fff', color: '#F15F34' }}
                    fontWeight={400}
                  >
                    Unpaid
                  </Label>
                </Stack>

                <Typography variant="subtitle1" color="#fff">
                  New call from the table
                </Typography>
              </Stack>

              <Stack direction="row" gap={1}>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{
                    borderRadius: 5,
                    height: '30px',
                    backgroundColor: '#fff',
                    color: '#F15F34',
                  }}
                  onClick={handleViewOrderButton}
                >
                  Respond
                </Button>
              </Stack>
            </Stack>
          </Stack>

          <Divider sx={{ color: '#fff', backgroundColor: '#fff' }} />

          <Stack direction="row" my={2} justifyContent="space-between" px={2}>
            <Typography marginLeft={2} color="#FFF">
              Order ID #256873
            </Typography>

            <Label
              variant="filled"
              startIcon={<i className="fi fi-tr-clock-seven" style={{ color: '#fff' }} />}
              sx={{ backgroundColor: '#FFF' }}
            >
              <Typography ml={1} variant="caption" color="#000">
                18:12
              </Typography>
            </Label>
          </Stack>
        </Stack>

        <Stack>
          {data.map((item) => (
            <Stack
              key={item.orderID}
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

                <Stack direction="row" justifyContent="space-between" sx={{ width: '100%' }}>
                  <Stack direction="column" ml={1}>
                    <Stack direction="row">
                      <Typography variant="body2" color="#828487">
                        {item.tableName}
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

                    <Typography variant="subtitle1">{item.tableDec}</Typography>
                  </Stack>

                  <Stack direction="row" gap={1}>
                    <Button
                      variant="contained"
                      color="error"
                      sx={{ borderRadius: 5, height: '30px' }}
                      onClick={handleViewOrderButton}
                    >
                      View Order
                    </Button>
                  </Stack>
                </Stack>
              </Stack>

              <Divider sx={{ color: '#fff', backgroundColor: '#fff' }} />

              <Stack direction="row" my={2} justifyContent="space-between" px={2}>
                <Typography marginLeft={2} color="#828487">
                  Order ID {item.orderID}
                </Typography>

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

export default NotificationsModal;
