import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface TashIconProps extends BoxProps {
  color?: string;
}

function TashIcon({ color = '#201A18', ...other }: TashIconProps) {
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
        d="M21.667 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3l-2.04.2M9.167 4.97l.22-1.31c.16-.95.28-1.66 1.97-1.66h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="M19.517 9.14l-.65 10.07c-.11 1.57-.2 2.79-2.99 2.79h-6.42c-2.79 0-2.88-1.22-2.99-2.79l-.65-10.07M10.997 16.5h3.33M10.167 12.5h5"
      />
    </Box>
  );
}

export default memo(TashIcon);
