import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function LockCloseIcon({ color = '#19191C', ...other }: PlanStarterIconProps) {
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
      <g stroke="#19191C" strokeWidth={1.5}>
        <path d="M8.5 7.5v-1A3.5 3.5 0 0 1 12 3v0a3.5 3.5 0 0 1 3.5 3.5v1" strokeLinecap="round" />
        <path d="M4.75 9.814c.09-.847.87-1.515 1.849-1.588 4.02-.3 6.811-.301 10.8-.002.982.074 1.764.748 1.851 1.6.351 3.44.319 5.867-.012 9.335-.082.861-.87 1.548-1.863 1.62-4 .295-6.788.294-10.737.002-.996-.074-1.783-.763-1.864-1.627-.324-3.433-.395-5.867-.025-9.34Z" />
        <path d="M12 15.75a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 0v1.5" strokeLinecap="round" />
      </g>
    </Box>
  );
}

export default memo(LockCloseIcon);
