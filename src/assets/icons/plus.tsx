import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function PlusIcon({ color = '#fff', ...other }: PlanStarterIconProps) {
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
      <g>
        <path stroke={color} strokeLinecap="round" strokeWidth="1.5" d="M5 12h14m-7-7v14" />
      </g>
    </Box>
  );
}

export default memo(PlusIcon);
