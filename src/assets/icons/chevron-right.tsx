import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface CheckIconProps extends BoxProps {
  color?: string;
}

function ChevronLeftIcon({ color = '#19191C', ...other }: CheckIconProps) {
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
        d="M7.75 20.5l8.359-8.359a.2.2 0 000-.282L7.75 3.5"
      />
    </Box>
  );
}

export default memo(ChevronLeftIcon);
