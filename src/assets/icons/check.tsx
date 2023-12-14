import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface CheckIconProps extends BoxProps {
  color?: string;
}

function CheckIcon({ color = '#fff', ...other }: CheckIconProps) {
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
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M4 11.874l5.184 5.809c.08.088.22.09.301.002L20 6.25"
      />
    </Box>
  );
}

export default memo(CheckIcon);
