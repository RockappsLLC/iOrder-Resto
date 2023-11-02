import { memo } from 'react';

import AppBar from '@mui/material/AppBar';
import { useTheme } from '@mui/material/styles';

import { useAuthContext } from 'src/auth/hooks';

import { NavSectionHorizontal } from 'src/components/nav-section';

import { useNavData } from './config-navigation';
import HeaderShadow from '../common/header-shadow';

// ----------------------------------------------------------------------

function NavHorizontal() {
  const theme = useTheme();

  const { user } = useAuthContext();

  const navData = useNavData();

  return (
    <AppBar
      component="div"
      sx={{
        position:'relative',
        flexShrink: 1,
      }}
    >
          <NavSectionHorizontal
            data={navData}
            slotProps={{
              currentRole: user?.role,
            }}
            sx={{
              ...theme.mixins.toolbar,
            }}
          />

      <HeaderShadow />
    </AppBar>
  );
}

export default memo(NavHorizontal);
