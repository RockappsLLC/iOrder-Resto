import { useState, useEffect, useCallback } from 'react';
// import Box from '@mui/material/Box';
// import { alpha } from '@mui/material/styles';

import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Grid from '@mui/material/Grid';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

import { getMenuCategories } from 'src/api/menu-categories';

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

export default function HomeView() {
  const settings = useSettingsContext();
  // const [menuCategories, setMenuCategories] = useState([]);
  const [currentTab, setCurrentTab] = useState('three');
  const [currentTab2, setCurrentTab2] = useState('buy');

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

  return (
    <Grid container columns={15} columnSpacing={3} sx={{ marginLeft: '10px', padding: 0 }}>
      <Grid item xs={4} sm={2} lg={1}>
        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
          orientation="vertical"
          centered
          variant="standard"
        >
          {TABS.map((tab: any) => (
            <Tab
              className=""
              sx={{
                padding: '10px',
                marginTop: '8px',
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
      <Grid item xs={11} sm={13} md={10.5}>
        <Container maxWidth={settings.themeStretch ? false : 'xl'}>
          <Typography fontWeight={500} color="#F15F34" padding={2}>
            {' '}
            Dashboard / <span style={{ color: '#828487' }}>Food</span>
          </Typography>

          {/* <Box
        sx={{
          mt: 5,
          width: 1,
          height: 320,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
      /> */}

          {renderSwitch()}
        </Container>
      </Grid>
      <Grid item xs={0} md={3} sx={{ borderLeft: 1, borderTop: 1, borderColor: '#E4E4E4' }}>
        <Tabs value={currentTab2} onChange={handleChangeTab2}>
          <Tab value="buy" label="Buy" sx={{ mr: 5 }} />
          <Tab value="reservation" label="Reservation" />
        </Tabs>
        {currentTab2 === 'buy' ? (
          <Box sx={{ pb: 4 }}>
            <Typography sx={{ fontWeight: 600, fontSize: '20px' }}>Customer Information</Typography>
            <form>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginTop: 20 }}>
                <TextField variant="outlined" fullWidth label="Customer Name" />
                <TextField variant="outlined" fullWidth label="T-08" />
              </div>
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
        <Divider />
      </Grid>
    </Grid>
  );
}
