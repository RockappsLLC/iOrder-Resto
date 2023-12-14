import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface MasterCardProps extends BoxProps {
  color?: string;
}

function MasterCardIcon({ color = '#19191C', ...other }: MasterCardProps) {
  return (
    <Box
      component="svg"
      width="62px"
      height="48px"
      fill="none"
      viewBox="0 0 62 48"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path fill="#FF5F00" d="M37.745 36.537h-13.49V12.294h13.49v24.243z" />
      <path
        fill="#EB001B"
        d="M25.111 24.416A15.391 15.391 0 0131 12.296a15.418 15.418 0 00-24.944 12.12 15.418 15.418 0 0024.942 12.121 15.394 15.394 0 01-5.887-12.12z"
      />
      <path
        fill="#F79E1B"
        d="M55.944 24.416A15.416 15.416 0 0131 36.537a15.39 15.39 0 005.889-12.12A15.39 15.39 0 0031 12.294a15.418 15.418 0 0124.944 12.121z"
      />
    </Box>
  );
}

export default memo(MasterCardIcon);
