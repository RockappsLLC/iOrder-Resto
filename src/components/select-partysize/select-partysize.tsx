import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const SelectPartySize = ({ partySize, setPartySize }: any) => {
  return (
    <Container sx={{ p: 3, pb: 0, borderRadius: 0 }}>
      <Typography color="#828487" fontSize={14}>
        Select party size
      </Typography>
      <Grid
        container
        sx={{
          pt: 2,
          pb: 2,
          width: '100%',
          justifyContent: 'center',
          borderRadius: '58px',
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map((number) => (
          <Grid
            item
            key={number}
            onClick={() => setPartySize(number)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              width: '68px',
              bgcolor: partySize === number ? '#FFF5EE' : '',
              color: partySize === number ? '#F15F34' : 'black',
              '&:hover': { bgcolor: '#FFF5EE', color: '#F15F34', cursor: 'pointer' },
              border: '1px solid #E4E4E4',
              p: 2,
              '&:first-of-type': {
                borderTopLeftRadius: '16px',
                borderBottomLeftRadius: '16px',
              },
              '&:last-of-type': {
                borderTopRightRadius: '16px',
                borderBottomRightRadius: '16px',
              },
            }}
          >
            <Typography
              fontSize={16}
              fontWeight={600}
              sx={{ display: 'flex', justifyContent: 'center' }}
            >
              {number}
              {number === 8 && '+'}
            </Typography>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default SelectPartySize;
