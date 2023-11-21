import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function ArrowLeftIcon({ color = '#fff', ...other }: PlanStarterIconProps) {
  return (
    <Box
      component="svg"
      width="20px"
      height="20px"
      fill="none"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M7.917 5.417L3.45 9.882a.167.167 0 000 .236l4.466 4.465M3.402 10h13.265"
        />
      </g>
    </Box>
  );
}

export default memo(ArrowLeftIcon);
