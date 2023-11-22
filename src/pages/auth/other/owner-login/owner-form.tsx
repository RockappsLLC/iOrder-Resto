import React, { lazy, useState } from 'react';

import Button from '@mui/material/Button';
import { Box, Card, Stack, Divider, Typography } from '@mui/material';

import { Plus, Home, Staff, Money, RiceBowl, ArrowLeft, ArrowRight } from 'src/assets/icons';

import Logo from 'src/components/logo';

const HomeFloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/Home'));
const FloorPlanContent = lazy(() => import('src/pages/auth/other/owner-login/floor-plan'));
const StaffContent = lazy(() => import('src/pages/auth/other/owner-login/Staff'));
const PaymentContent = lazy(() => import('src/pages/auth/other/owner-login/Payment'));
const MenuContent = lazy(() => import('src/pages/auth/other/owner-login/Menu'));

const contentData = [
  {
    name: 'Home',
    active: true,
    icon: <Home />,
    contentComponent: HomeFloorPlanContent,
  },
  {
    name: 'Floor Plan',
    active: false,
    icon: <Plus />,
    contentComponent: FloorPlanContent,
  },
  {
    name: 'Staff',
    active: false,
    icon: <Staff />,
    contentComponent: StaffContent,
  },
  {
    name: 'Menu',
    active: false,
    icon: <RiceBowl />,
    contentComponent: MenuContent,
  },
  {
    name: 'Payment',
    active: false,
    icon: <Money />,
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
              {React.cloneElement(data.icon, {
                color: data.active ? '#F15F34' : '#828487',
              })}

              <Typography ml={1} color={data.active ? 'primary' : '#828487'}>
                {data.name}
              </Typography>
            </Button>
          ))}
        </Stack>

        <Divider
          sx={{
            width: '100%',
            height: '1px',
            backgroundColor: '#C2C2C2',
          }}
        />

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
              <ArrowLeft />
              <Typography mr={1} color="#fff">
                Back
              </Typography>
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
              <ArrowRight />
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
