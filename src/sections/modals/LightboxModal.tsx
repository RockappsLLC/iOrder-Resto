import { useState } from 'react';
import Lightbox from 'react-datatrans-light-box';

import { Button } from '@mui/material';

interface LightboxModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
}

const LightboxModal = ({ showModal, setShowModal }: LightboxModalProps) => {
  const [transactionId, setTransactionId] = useState();

  const onLoaded = () => console.log('Loaded');
  const onOpened = () => console.log('Opened');
  const onCancelled = () => setShowModal(false);
  const onError = (data: any) => {
    console.log('Error:', data);
    setShowModal(false);
  };

  const handleClick = () => {
    const myHeaders = new Headers();
    myHeaders.append(
      'Authorization',
      'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTY0YWRhMjgxZWU4OTY5ZjBkOTNiNmYiLCJpYXQiOjE3MDI0NjUzNDAsImV4cCI6MTcwMjU1MTc0MH0.8OIbQurV20IXzbL9bH-tbphjtN0pgdtrNlug98ISXNM'
    );
    myHeaders.append('Content-Type', 'application/json');

    const raw = JSON.stringify({
      orderId: '65799401a47e1a5495925265',
    });

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://backend.iorder.ch/api/v1/payments', requestOptions as any)
      .then((response) => response.json())
      .then((result) => {
        // console.log(JSON.parse(result));
        setTransactionId(result.data.transactionId);
        setShowModal(true);
      })
      .catch((error) => console.log('error', error));
  };
  return showModal && transactionId ? (
    <Lightbox
      transactionId={transactionId}
      production={false}
      onLoaded={onLoaded}
      onOpened={onOpened}
      onCancelled={onCancelled}
      onError={onError}
    />
  ) : (
    <Button onClick={handleClick}>Show Lightbox Modal</Button>
  );
};

export default LightboxModal;
