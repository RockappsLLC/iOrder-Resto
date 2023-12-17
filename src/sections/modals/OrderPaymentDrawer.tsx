import { useState } from 'react';

import { Box, Stack, Drawer, Button, Divider, Container, Typography } from '@mui/material';

import {
  Money,
  GiftCard,
  VisaIcon,
  Backspace,
  CheckIcon,
  CloseIcon,
  EmailIcon,
  MoneyIcon,
  Mastercard,
  PrinterIcon,
} from 'src/assets/icons';

const iconArray = [MoneyIcon, Mastercard, VisaIcon, GiftCard];

const bottomIconsArray = [
  { icon: Money, text: 'Tip amount' },
  { icon: PrinterIcon, text: 'Gift receipt' },
  { icon: EmailIcon, text: 'Email' },
  { icon: CheckIcon, text: 'Done' },
];

interface OrderPaymentProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const OrderPaymentDrawer = ({ showModal, setShowModal }: OrderPaymentProps) => {
  const [selectedBox, setSelectedBox] = useState(null);

  const handleBoxClick = (index: any) => {
    setSelectedBox(index);
  };

  return (
    <Drawer open={showModal} onClose={() => setShowModal(false)} anchor="right">
      <Container
        sx={{
          // height: '100vh',
          // display: 'flex',
          // flexDirection: 'column',
          // justifyContent: 'space-between',
          // py: '24px',
          // bgcolor: 'white',

          // height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          bgcolor: 'white',
        }}
      >
        <Box>
          <Stack mt="auto" direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between">
            <Typography variant="h5"> Order payment</Typography>
            <CloseIcon onClick={() => setShowModal(false)} />
          </Stack>

          <Typography variant="subtitle2" fontWeight={400}>
            Order #nr
          </Typography>

          <Divider
            sx={{
              width: '100%',
              height: '1px',
              backgroundColor: '#E4E4E4',
            }}
          />

          <Stack
            mt={3}
            direction={{ xs: 'column', sm: 'column' }}
            sx={{ backgroundColor: '#F8F9FD', padding: 2 }}
            gap={1}
          >
            <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={400}>
                Tip Amount
              </Typography>

              <Typography variant="subtitle1">$nr</Typography>
            </Stack>

            <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between">
              <Typography variant="subtitle1" fontWeight={400}>
                Total Amount
              </Typography>

              <Typography variant="h5" color="#F15F34">
                $nr
              </Typography>
            </Stack>
          </Stack>

          <Stack mt={1}>
            <Typography variant="subtitle1">Payment method</Typography>

            <Stack direction={{ xs: 'row', sm: 'row' }} gap={1}>
              {iconArray.map((IconComponent, index) => (
                <Box
                  key={index}
                  p={2}
                  border={1}
                  borderColor={selectedBox === index ? 'red' : '#E4E4E4'}
                  width={100}
                  height={80}
                  borderRadius={3}
                  mt={1}
                  onClick={() => handleBoxClick(index)}
                >
                  <IconComponent />
                </Box>
              ))}
            </Stack>

            <Stack mt={1}>
              <Typography variant="subtitle1">Input amount</Typography>

              <input
                type="password"
                // value={pin}
                // disabled={!activeUser}
                placeholder="Input amount"
                style={{
                  backgroundColor: 'transparent',
                  borderWidth: '1px',
                  // borderColor: '#E4E4E4',
                  color: '#E4E4E4',
                  marginBottom: 10,
                  textAlign: 'center',
                  outline: 'none',
                  fontSize: '20px',
                  borderRadius: '20px',
                  padding: 7,
                }}
              />

              <Box
                mt={2}
                mb={5}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 10,
                }}
              >
                {[1, 2, 3, 10, 4, 5, 6, 20, 7, 8, 9].map((item) => (
                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: item === 10 || item === 20 ? '#0B57A0' : '#19191C',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: item === 10 || item === 20 ? '#ECF6FF' : '#F8F9FD',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </Button>
                ))}

                <Button
                  variant="outlined"
                  style={{
                    border: 'none',
                    backdropFilter: `blur(8px)`,
                    borderRadius: 160,
                    backgroundColor: '#FFF1EF',
                    fontSize: '28px',
                    fontWeight: 600,
                  }}
                >
                  <Backspace />
                </Button>

                {['C', 0, '.', 'Add'].map((item) => (
                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: item === 'C' ? '#F15F34' : '#19191C',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: item === 'C' ? '#FFF5EE' : '#F8F9FD',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                  >
                    {item}
                  </Button>
                ))}
              </Box>
            </Stack>

            <Stack direction={{ xs: 'row', sm: 'row' }} gap={1} mb={1}>
              {bottomIconsArray.map(({ icon: IconComponent, text }, index) => (
                <Box
                  key={index}
                  p={2}
                  width={100}
                  height={80}
                  borderRadius={3}
                  mt={1}
                  onClick={() => handleBoxClick(index)}
                  sx={{
                    background:
                      index === bottomIconsArray.length - 1
                        ? `linear-gradient(219deg, #FFAB18 -6.67%, #FF2197 137.69%)`
                        : 'black',
                  }}
                >
                  <Stack direction="column" alignItems="center">
                    <IconComponent color="#fff" />
                    <Typography color="#fff" variant="caption" sx={{ whiteSpace: 'nowrap' }}>
                      {text}
                    </Typography>
                  </Stack>
                </Box>
              ))}
            </Stack>
          </Stack>
        </Box>
      </Container>
    </Drawer>
  );
};

export default OrderPaymentDrawer;
