import { lazy, useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Card, Stack, Typography } from '@mui/material';

import Logo from 'src/components/logo';
import Iconify from 'src/components/iconify';

const HomeFloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/Home'));
const FloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/FloorPlan'));
const StaffContent = lazy(() => import('src/pages/auth/other/owner-login/Staff'));
const PaymentContent = lazy(() => import('src/pages/auth/other/owner-login/Payment'));
const MenuContent = lazy(() => import('src/pages/auth/other/owner-login/Menu'));

const contentData = [
  {
    name: 'Home',
    active: true,
    icon: 'mdi:home',
    contentComponent: HomeFloorPlanContent,
  },
  {
    name: 'Floor Plan',
    active: false,
    icon: 'mdi:plus',
    contentComponent: FloorPlanContent,
  },
  {
    name: 'Staff',
    active: false,
    icon: 'mdi:account-multiple',
    contentComponent: StaffContent,
  },
  {
    name: 'Menu',
    active: false,
    icon: 'mdi:rice',
    contentComponent: MenuContent,
  },
  {
    name: 'Payment',
    active: false,
    icon: 'mdi:cash',
    contentComponent: PaymentContent,
  },
];

export default function OwnerForm() {
  const [currentContentIndex, setCurrentContentIndex] = useState(0);

  const handleLinkClick = (content: any, index: any) => {
    contentData.forEach((data, i) => {
      data.active = i === index;
    });
    setCurrentContentIndex(index);
  };

  const handleNext = () => {
    const nextIndex = currentContentIndex + 1;
    if (nextIndex < contentData.length) {
      const nextContent = contentData[nextIndex];
      handleLinkClick(nextContent.name, nextIndex);
    }
  };

  const handleBack = () => {
    const previousIndex = currentContentIndex - 1;
    if (previousIndex >= 0) {
      const previousContent = contentData[previousIndex];
      handleLinkClick(previousContent.name, previousIndex);
    }
  };

  return (
    <Box
      component="main"
      sx={{
        py: 5,
        display: 'flex',
        minHeight: '100vh',
        textAlign: 'center',
        px: { xs: 2, md: 0 },
        position: 'relative',
        alignItems: 'center',
        justifyContent: 'center',
        '&:before': {
          width: 1,
          height: 1,
          zIndex: -1,
          content: "''",
          position: 'absolute',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center center',
          backgroundImage: 'url(/assets/background/overlay_5.png)',
        },
      }}
    >
      <Card
        sx={{
          py: 6,
          px: 10,
          width: '90%',
          minHeight: 600,
        }}
      >
        <Stack spacing={2} sx={{ mb: 5 }}>
          <Stack direction="row" alignItems="center" justifyContent="center" spacing={1}>
            <Logo />
            <Typography fontWeight={600} variant="subtitle1">
              iOrder
            </Typography>
          </Stack>
        </Stack>

        <Stack
          flexGrow={1}
          direction="row"
          alignItems="center"
          justifyContent="center"
          spacing={{ xs: 0.5, sm: 2 }}
        >
          {contentData.map((data, index) => (
            <Button
              key={data.name}
              onClick={() => handleLinkClick(data.name, index)}
              disabled={data.active}
            >
              <Iconify icon={data.icon} width={24} color={data.active ? '#F15F34' : '#9C9C9C'} />
              <Typography ml={1} color={data.active ? 'primary' : '#9C9C9C'}>
                {data.name}
              </Typography>
            </Button>
          ))}
        </Stack>

        <hr style={{ color: '#e3e3e3' }} />

        {contentData.map(
          (data, index) =>
            data.active &&
            data.contentComponent && (
              <Box key={index} sx={{ minHeight: 400 }}>
                <data.contentComponent />
              </Box>
            )
        )}

        <Box display="flex" justifyContent="space-between">
          {currentContentIndex >= 0 && currentContentIndex < 4 && (
            <Button
              variant="contained"
              onClick={handleBack}
              disabled={currentContentIndex === 0}
              color="error"
              sx={{ borderRadius: 5 }}
            >
              <Iconify icon="mdi:arrow-left-thin" width={20} color="#fff" mr={1} />
              <Typography mr={1}>Back</Typography>
            </Button>
          )}

          {currentContentIndex < 4 && (
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={currentContentIndex === contentData.length - 1}
              color="error"
              sx={{ borderRadius: 5 }}
            >
              <Typography ml={1}>Next</Typography>
              <Iconify icon="mdi:arrow-right-thin" width={20} color="#000" ml={1} />
            </Button>
          )}
        </Box>

        <Typography variant="subtitle1" color="#828487" fontWeight={400} mt={3}>
          End user agreement
        </Typography>
      </Card>
    </Box>
  );
}
