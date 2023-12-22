import { Box } from '@mui/material';

export const Table = (props: any) => (
  <Box
    sx={{
      ...(props?.minimal
        ? {
            width: 30,
            height: 30,
            borderRadius: 0.5,
          }
        : {
            width: 130,
            height: 130,
            borderRadius: 2,
          }),
      border: '1px solid #E4E4E4',
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%,-50%)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      ...props,
      background: '#fff',
    }}
  >
    <Box
      sx={{
        ...(props?.minimal
          ? {
              width: 20,
              height: 20,
              fontSize: 7,
            }
          : {
              width: 86,
              height: 86,
              fontSize: 14,
            }),
        background: props?.backgroundColor || '#ECF6FF',
        borderRadius: '50%',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontWeight: 400,
      }}
    >
      {props?.name}
    </Box>
  </Box>
);

export const TableCircle = (props: any) => (
  <Table borderRadius="50%" name={props?.name} minimal={props?.minimal} {...props} />
);
