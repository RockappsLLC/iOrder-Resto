import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../iconify';

const HomeHeader = () => {
  return (
    <>
      <div
        style={{
          backgroundColor: 'white',
        }}
      >
        <Typography fontWeight={500} color="#F15F34" padding="10px" paddingLeft={3}>
          Dashboard / <span style={{ color: '#828487' }}>Food</span>
        </Typography>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          height: '68px',
          marginBottom: '30px',
          backgroundColor: 'white',
          borderTop: '1px #E4E4E4 solid',
          borderBottom: '1px #E4E4E4 solid',
        }}
      >
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            height: '100%',
            borderRight: 1,
            borderColor: '#E4E4E4',
          }}
        >
          <InputBase
            fullWidth
            autoFocus
            placeholder="Search menu..."
            // value={searchQuery}
            // onChange={handleSearch}
            startAdornment={
              <InputAdornment position="start">
                <Iconify icon="eva:search-fill" width={26} sx={{ color: 'text.disabled' }} />
              </InputAdornment>
            }
            inputProps={{
              sx: { fontSize: '16px' },
            }}
          />
        </Container>
        <Container sx={{ display: 'flex', gap: 1 }}>
          <Button sx={{ borderRadius: '40px' }} variant="outlined">
            All
          </Button>
          <Button sx={{ borderRadius: '40px' }} variant="outlined">
            Chicken
          </Button>
          <Button sx={{ borderRadius: '40px' }} variant="outlined">
            Seafood
          </Button>
          <Button sx={{ borderRadius: '40px' }} variant="outlined">
            Pasta
          </Button>
          <Button sx={{ borderRadius: '40px' }} variant="outlined">
            Rice bowl
          </Button>
        </Container>
      </div>
    </>
  );
};

export default HomeHeader;
