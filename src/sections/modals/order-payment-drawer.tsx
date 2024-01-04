import { useState, useEffect, useCallback } from 'react';

import { Box, Stack, Alert, Drawer, Button, Divider, Container, Typography } from '@mui/material';

import {
  Money,
  Backspace,
  CheckIcon,
  CloseIcon,
  MoneyIcon,
  Mastercard,
  PrinterIcon,
} from 'src/assets/icons';

import { useOrderContext } from 'src/components/order-sidebar/context';

import TipAmountModal from './tip-amount-modal';
import OrderConfirmationModal from './order-confirmation-modal';

const iconArray = [
  { icon: MoneyIcon, type: 'cash' },
  { icon: Mastercard, type: 'online' },
];

const bottomIconsArray = [
  { icon: Money, text: 'Tip amount', action: 'tip' },
  { icon: PrinterIcon, text: 'Print', action: 'other' },
  { icon: CheckIcon, text: 'Done', action: 'close' },
];

interface OrderPaymentProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const OrderPaymentDrawer = ({ showModal, setShowModal }: OrderPaymentProps) => {
  const [selectedBox, setSelectedBox] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  const [selectedPaymentBox, setSelectedPaymentBox] = useState(0);
  const [showTipModal, setShowTipModal] = useState(false);

  const {
    total,
    tipAmount,
    paymentMethod,
    setPaymentMethod,
    inputAmount,
    setInputAmount,
    setTotalWithTip,
    totalWithTip,
  } = useOrderContext();

  const [showOrderConfirmModal, setShowOrderConfirmModal] = useState(false);

  const handlePaymentBoxClick = (index: any) => {
    const selectedItem = iconArray[index];

    setPaymentMethod(selectedItem.type);
    setSelectedPaymentBox(index);
  };

  const handleBoxClick = (index: any) => {
    const selectedItem = bottomIconsArray[index];

    if (selectedItem.action === 'tip') {
      setShowTipModal(true);
    } else if (selectedItem.action === 'close') {
      if (inputAmount >= totalWithTip || paymentMethod === 'online') {
        setShowModal(false);
        setShowOrderConfirmModal(true);
      } else {
        setErrorMsg('Input amput is less than total amount.');
      }
    }
    setSelectedBox(index);
  };

  const handleKeyPress = useCallback(
    (value: any) => {
      if (!showTipModal) setInputAmount((prevPin: any) => prevPin + value);
    },
    [setInputAmount, showTipModal]
  );

  const handleBackspace = useCallback(() => {
    const newPin = inputAmount.slice(0, -1);
    setInputAmount(newPin);
  }, [inputAmount, setInputAmount]);

  const handleClear = () => {
    setInputAmount('');
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key >= '0' && event.key <= '9') {
        handleKeyPress(event.key);
      } else if (event.key === 'Backspace') {
        handleBackspace();
      } else if (event.key === 'Enter') {
        setShowModal(false);
        setShowOrderConfirmModal(true);
      } else if (event.key === 'C' || event.key === 'c') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [handleKeyPress, handleBackspace]);

  useEffect(() => {
    const result = parseFloat(total) + parseFloat(tipAmount);

    setTotalWithTip(result);
  }, [total, tipAmount, setTotalWithTip]);

  return (
    <>
      <TipAmountModal
        showTipsModal={showTipModal}
        setShowTipsModal={() => setShowTipModal(false)}
      />

      <OrderConfirmationModal
        showOrderModal={showOrderConfirmModal}
        setShowOrderModal={() => setShowOrderConfirmModal(false)}
      />

      <Drawer open={showModal} onClose={() => setShowModal(false)} anchor="right">
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            bgcolor: 'white',
          }}
        >
          <Box>
            <Stack
              mt="auto"
              direction={{ xs: 'row', sm: 'row' }}
              justifyContent="space-between"
              marginTop={1}
              alignItems="center"
            >
              <Typography variant="h5"> Order payment</Typography>
              <CloseIcon onClick={() => setShowModal(false)} />
            </Stack>

            <Typography variant="subtitle2" fontWeight={400} color="#828487">
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
                <Typography variant="subtitle1" fontWeight={400} color="#828487">
                  Tip Amount
                </Typography>

                <Typography variant="subtitle1">${tipAmount}</Typography>
              </Stack>

              <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="space-between">
                <Typography variant="subtitle1" fontWeight={400} color="#828487">
                  Total Amount
                </Typography>

                <Typography variant="h5" color="#F15F34">
                  $ {total.toFixed(2)}
                </Typography>
              </Stack>
            </Stack>

            <Stack mt={1}>
              <Typography variant="subtitle1">Payment method</Typography>
              <Stack direction={{ xs: 'row', sm: 'row' }} gap={2} justifyContent="center">
                {iconArray.map(({ icon: IconComponent }, index) => (
                  <Box
                    key={index}
                    p={2}
                    border={1}
                    borderColor={selectedPaymentBox === index ? 'red' : '#E4E4E4'}
                    width="100%"
                    height={80}
                    borderRadius={3}
                    mt={1}
                    onClick={() => handlePaymentBoxClick(index)}
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <IconComponent />
                  </Box>
                ))}
              </Stack>

              {!!errorMsg && (
                <Alert sx={{ mt: 2 }} severity="error">
                  {errorMsg}
                </Alert>
              )}

              <Stack mt={2}>
                <Typography variant="subtitle1">Input amount</Typography>

                <input
                  type="number"
                  value={inputAmount}
                  placeholder="Input amount"
                  style={{
                    backgroundColor: 'transparent',
                    borderWidth: '1px',
                    marginBottom: 10,
                    textAlign: 'center',
                    outline: 'none',
                    fontSize: '20px',
                    borderRadius: '20px',
                    padding: 15,
                    marginTop: 5,
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
                      onClick={() => handleKeyPress(item)}
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
                    onClick={handleBackspace}
                  >
                    <Backspace />
                  </Button>

                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: '#F15F34',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: '#FFF5EE',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                    onClick={handleClear}
                  >
                    C
                  </Button>

                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: '#19191C',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: '#F8F9FD',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                    onClick={() => handleKeyPress(0)}
                  >
                    0
                  </Button>

                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: '#19191C',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: '#F8F9FD',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                    onClick={() => handleKeyPress('.')}
                  >
                    .
                  </Button>

                  <Button
                    variant="outlined"
                    style={{
                      border: 'none',
                      color: '#19191C',
                      backdropFilter: `blur(8px)`,
                      borderRadius: 160,
                      backgroundColor: '#F8F9FD',
                      fontSize: '28px',
                      fontWeight: 600,
                    }}
                  >
                    Add
                  </Button>
                </Box>
              </Stack>

              <Stack direction={{ xs: 'row', sm: 'row' }} justifyContent="center" gap={2} mb={1}>
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
                        // eslint-disable-next-line no-nested-ternary
                        index === selectedBox
                          ? 'linear-gradient(219deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                          : index === bottomIconsArray.length - 1
                          ? 'linear-gradient(219deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                          : 'black',
                      ':hover': {
                        opacity: 0.8,
                      },
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
    </>
  );
};

export default OrderPaymentDrawer;
