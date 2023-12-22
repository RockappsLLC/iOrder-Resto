import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface CheckIconProps extends BoxProps {
  color?: string;
}

function CheveronIcon({ color = '#19191C', ...other }: CheckIconProps) {
  return (
    <Box
      component="svg"
      width="18px"
      height="18px"
      fill="none"
      viewBox="0 0 18 18"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M2.625 5.813l6.234 6.233a.2.2 0 00.282 0l6.234-6.233"
      />
    </Box>
  );
}

export default memo(CheveronIcon);
