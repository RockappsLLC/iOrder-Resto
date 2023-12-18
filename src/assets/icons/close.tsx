import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface CloseIconProps extends BoxProps {
  color?: string;
}

function CloseIcon({ color = '#19191C', ...other }: CloseIconProps) {
  return (
    <Box
      component="svg"
      width="24px"
      height="24px"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path stroke={color} strokeLinecap="round" strokeWidth="1.5" d="M5 5l14 14m0-14L5 19" />
    </Box>
  );
}

export default memo(CloseIcon);
