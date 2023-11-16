import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useState, useEffect, useCallback } from 'react';

import Fab from '@mui/material/Fab';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import InputBase from '@mui/material/InputBase';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { getMenuCategories } from 'src/api/menu-categories';

import Iconify from 'src/components/iconify';
import SvgColor from 'src/components/svg-color';
import FoodList from 'src/components/food-list';
import { useSettingsContext } from 'src/components/settings';

// ----------------------------------------------------------------------

const TABS = [
  {
    value: 'one',
    icon: <SvgColor src="/assets/icons/home/coffee.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Coffee',
  },
  {
    value: 'two',
    icon: <SvgColor src="/assets/icons/home/beverages.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Beverages',
  },
  {
    value: 'three',
    icon: <SvgColor src="/assets/icons/home/food.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Food',
  },
  {
    value: 'four',
    icon: <SvgColor src="/assets/icons/home/appetizer.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Appetizer',
  },
  {
    value: 'five',
    icon: <SvgColor src="/assets/icons/home/bread.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Bread',
  },
  {
    value: 'six',
    icon: <SvgColor src="/assets/icons/home/snack.svg" sx={{ width: 32, height: 32 }} />,
    label: 'Snack',
  },
];

const defaultValues = {
  name: '',
  code: '',
};

const showErrors = (field: string, valueLen: number, min: number) => {
  if (valueLen === 0) {
    return `${field} is required`;
  }
  if (valueLen > 0 && valueLen < min) {
    return `${field} must be at least ${min} characters`;
  }
  return '';
};

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, (obj) => showErrors('Customer Name', obj.value.length, obj.min))
    .required(),
  code: yup
    .string()
    .min(3, (obj) => showErrors('Code', obj.value.length, obj.min))
    .required(),
});

export default function HomeView() {
  const settings = useSettingsContext();
  // const [menuCategories, setMenuCategories] = useState([]);
  const [currentTab, setCurrentTab] = useState('three');
  const [currentTab2, setCurrentTab2] = useState('buy');

  const {
    // reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  const handleChangeTab2 = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab2(newValue);
  }, []);

  const fetcher = async () => {
    try {
      await getMenuCategories();
      // setMenuCategories(response.data.data?.menuCategories);
      // console.log(response.data.data?.menuCategories);
    } catch (error) {
      console.warn(error);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  const renderSwitch = () => {
    switch (currentTab) {
      case 'one':
        return <div>Coffee</div>;
      case 'two':
        return <div>Beverages</div>;
      case 'three':
        return <FoodList />;
      case 'four':
        return <div>Appetizer</div>;
      case 'five':
        return <div>Bread</div>;
      case 'six':
        return <div>Snack</div>;
      default:
        return <FoodList />;
    }
  };

  const onSubmit = (data: any) => {
    // addData(data)
  };

  return (
    <Grid container columns={15}>
      <Grid
        item
        xs={4}
        sm={2}
        md={2}
        lg={1}
        sx={{
          borderTop: 1,
          borderColor: '#E4E4E4',
        }}
      >
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          orientation="vertical"
          centered
          variant="standard"
        >
          {TABS.map((tab: any) => (
            <Tab
              sx={{
                mx: 'auto',
                my: '6px',
                px: '6px',
                py: '12px',
                fontSize: '12px',
                width: '77px',
                height: '78px',
                borderRadius: '8px',
                background:
                  currentTab === tab.value
                    ? 'linear-gradient(218.57deg, #FFAB18 -6.67%, #FF2197 137.69%)'
                    : '',
                color: currentTab === tab.value ? 'white' : '',
              }}
              iconPosition="top"
              key={tab.value}
              icon={tab.icon}
              label={tab.label}
              value={tab.value}
            />
          ))}
        </Tabs>
      </Grid>
      <Grid
        item
        xs={11}
        sm={12}
        md={10}
        lg={11}
        sx={{ bgcolor: '#F8F9FD', border: 1, borderBottom: 0, borderColor: '#E4E4E4' }}
      >
        <div
          style={{
            backgroundColor: 'white',
          }}
        >
          {' '}
          <Typography fontWeight={500} color="#F15F34" padding="10px" paddingLeft={3}>
            {' '}
            Dashboard / <span style={{ color: '#828487' }}>Food</span>
          </Typography>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            height: 55,
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
                  <Iconify icon="eva:search-fill" width={22} sx={{ color: 'text.disabled' }} />
                </InputAdornment>
              }
              inputProps={{
                sx: { fontSize: '16px' },
              }}
            />
            {/* <Iconify icon="material-symbols:search" />
            <TextField variant="standard" placeholder="Search Menu..." sx={{ pl: 1 }} /> */}
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
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>{renderSwitch()}</Container>
      </Grid>
      <Grid item xs={0} md={3} sx={{ borderTop: 1, borderColor: '#E4E4E4' }}>
        <div style={{ marginLeft: '20px', marginRight: '20px' }}>
          <Tabs
            value={currentTab2}
            onChange={handleChangeTab2}
            sx={{
              bgcolor: '#F8F9FD',
              borderRadius: '80px',
              my: 2,
            }}
          >
            <Tab
              value="buy"
              label="Buy"
              sx={{
                px: 6,
                mx: 'auto',
                // ml: '6px',
                my: '6px',
                borderRadius: '80px',
                bgcolor: currentTab2 === 'buy' ? 'white' : '',
              }}
            />
            <Tab
              value="reservation"
              label="Reservation"
              sx={{
                px: 6,
                mx: 'auto',
                my: '6px',
                borderRadius: '80px',
                bgcolor: currentTab2 === 'reservation' ? 'white' : '',
              }}
            />
          </Tabs>
          {currentTab2 === 'buy' ? (
            <Box sx={{ pb: 4 }}>
              <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>
                Customer Information
              </Typography>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                  <Controller
                    name="name"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="Costumer Name"
                        value={value}
                        onChange={onChange}
                        placeholder="Leonard"
                        error={Boolean(errors.name)}
                        aria-describedby="validation-schema-name"
                        {...(errors.name && { helperText: errors.name.message })}
                      />
                    )}
                  />
                  <Controller
                    name="code"
                    control={control}
                    rules={{ required: true }}
                    render={({ field: { value, onChange } }) => (
                      <TextField
                        fullWidth
                        label="T-08"
                        value={value}
                        onChange={onChange}
                        placeholder="T-08"
                        error={Boolean(errors.code)}
                        aria-describedby="validation-schema-code"
                        {...(errors.code && { helperText: errors.code.message })}
                      />
                    )}
                  />
                </div>
                <Fab
                  type="submit"
                  size="small"
                  color="default"
                  variant="soft"
                  sx={{ width: '100%', borderRadius: '58px', marginTop: '16px' }}
                >
                  <Typography color="#9C9C9C" fontWeight={600} fontSize="16px">
                    Add Note
                  </Typography>
                </Fab>
              </form>
            </Box>
          ) : (
            <Box
              sx={{
                p: 2,
                borderRadius: 1,
                bgcolor: 'background.neutral',
              }}
            >
              Reservation
            </Box>
          )}
        </div>
        <Divider />
      </Grid>
    </Grid>
  );
}
