import Lightbox from 'react-datatrans-light-box';

interface LightboxModalProps {
  showModal: boolean;
  setShowModal: (value: boolean) => void;
  transactionId: string;
}

const LightboxModal = ({ showModal, transactionId, setShowModal }: LightboxModalProps) => {
  const onLoaded = () => console.log('Loaded');
  const onOpened = () => console.log('Opened');
  const onCancelled = () => setShowModal(false);
  const onError = (data: any) => {
    console.log('Error:', data);
    setShowModal(false);
  };

  return (
    showModal &&
    transactionId && (
      <Lightbox
        transactionId={transactionId}
        production={false}
        onLoaded={onLoaded}
        onOpened={onOpened}
        onCancelled={onCancelled}
        onError={onError}
      />
    )
  );
};

export default LightboxModal;
