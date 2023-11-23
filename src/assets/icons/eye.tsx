import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface EyeIconProps extends BoxProps {
  color?: string;
}

function EyeIcon({ color = '#201A18', ...other }: EyeIconProps) {
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
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M16.247 12c0 1.98-1.6 3.58-3.58 3.58s-3.58-1.6-3.58-3.58 1.6-3.58 3.58-3.58 3.58 1.6 3.58 3.58z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M12.667 20.27c3.53 0 6.82-2.08 9.11-5.68.9-1.41.9-3.78 0-5.19-2.29-3.6-5.58-5.68-9.11-5.68-3.53 0-6.82 2.08-9.11 5.68-.9 1.41-.9 3.78 0 5.19 2.29 3.6 5.58 5.68 9.11 5.68z"
      />
    </Box>
  );
}

export default memo(EyeIcon);
