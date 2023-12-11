import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import InputAdornment from '@mui/material/InputAdornment';

import Iconify from '../iconify';

const HomeHeader = ({ searchInput, setSearchInput }: any) => {
  const theme = useTheme();
  const md = useMediaQuery(theme.breakpoints.up('md'));
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
            value={searchInput}
            onChange={(e: any) => setSearchInput(e.target.value)}
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
        {md ? (
          <Container sx={{ display: 'flex', flexDirection: md ? 'row' : 'column', gap: 1 }}>
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
        ) : (
          <TextField defaultValue="all" select sx={{ width: '50%', p: 2 }}>
            <MenuItem value="all">All</MenuItem>
            <MenuItem value="chicken">Chicken</MenuItem>
            <MenuItem value="seafood">Seafood</MenuItem>
            <MenuItem value="pasta">Pasta</MenuItem>
            <MenuItem value="ricebowl">Rice bowl</MenuItem>
          </TextField>
        )}
      </div>
    </>
  );
};

export default HomeHeader;
