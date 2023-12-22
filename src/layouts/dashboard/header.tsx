import { m } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import Stack from '@mui/material/Stack';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { useTheme } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';

import { bgBlur } from 'src/theme/css';

import Logo from 'src/components/logo';

import { HEADER } from '../config-layout';
import NavHorizontal from './nav-horizontal';
import AccountPopover from '../common/account-popover';
import LanguagePopover from '../common/language-popover';
import CustomersPopover from '../common/customers-popover';
import NotificationsPopover from '../common/notifications-popover';
import DiningOptionsPopover from '../common/dining-options-popover';

// ----------------------------------------------------------------------

type Props = {
  onOpenNav?: VoidFunction;
};

function Datetime() {
  const intervalRef = useRef({});
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    intervalRef.current = setInterval(() => setDateState(new Date()), 10);
    return () => {
      clearInterval(intervalRef.current as any);
    };
  }, []);
  return (
    <>
      {dateState.toLocaleString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        // second: 'numeric',
        hour12: false,
      })}

      <span> </span>
      {dateState.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'numeric',
        year: 'numeric',
      })}
    </>
  );
}

export default function Header({ onOpenNav }: Props) {
  const theme = useTheme();

  const renderContent = (
    <>
      <Logo sx={{ mr: 2.5 }} />

      <NavHorizontal />

      <Stack
        flexGrow={1}
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={{ xs: 0.5, sm: 1 }}
      >
        <CustomersPopover />
        <NotificationsPopover />

        <DiningOptionsPopover />
        <LanguagePopover />

        <ButtonBase
          component={m.button}
          sx={{
            height: 36,
            width: 174,
            bgcolor: theme.palette.secondary.light,
            borderRadius: 40,
            // marginLeft: 2,
          }}
          disabled
        >
          <Typography variant="body2" color={theme.palette.primary.dark}>
            {/* 10:53:00  26/11/2023 */}
            <Datetime />
          </Typography>
        </ButtonBase>

        {/* <SettingsButton /> */}

        <AccountPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.default,
        }),
        transition: theme.transitions.create(['height'], {
          duration: theme.transitions.duration.shorter,
        }),
      }}
    >
      <Toolbar
        sx={{
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
}
