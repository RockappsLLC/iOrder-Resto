import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function ArrowRightIcon({ color = '#19191C', ...other }: PlanStarterIconProps) {
  return (
    <Box
      component="svg"
      width="21px"
      height="20px"
      fill="none"
      viewBox="0 0 21 20"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M12.583 5.417l4.466 4.465a.167.167 0 010 .236l-4.466 4.465M17.098 10H3.833"
        />
      </g>
    </Box>
  );
}

export default memo(ArrowRightIcon);
