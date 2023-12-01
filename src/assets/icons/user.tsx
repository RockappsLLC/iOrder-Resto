import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function UserIcon({ color = '#19191C', ...other }: PlanStarterIconProps) {
  return (
    <Box
      component="svg"
      width="25px"
      height="24px"
      fill="none"
      viewBox="0 0 25 24"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g>
        <g stroke="#19191C" strokeWidth="1.5">
          <path d="M16 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM5.924 17.49c.343-2.375 2.182-4.316 4.575-4.49 1.367-.1 2.64-.1 4.004-.001 2.392.174 4.23 2.115 4.573 4.489l.066.462c.198 1.368-.753 2.645-2.127 2.792-3.227.346-5.793.342-9.024-.002-1.377-.147-2.33-1.425-2.133-2.796l.066-.454z" />
        </g>
      </g>
    </Box>
  );
}

export default memo(UserIcon);
