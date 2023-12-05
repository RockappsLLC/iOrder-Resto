import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface FilterIconProps extends BoxProps {
  color?: string;
}

function FilterIcon({ color = '#201A18', ...other }: FilterIconProps) {
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
        strokeMiterlimit="10"
        strokeWidth="1.5"
        d="M22.5 6.5h-6M6.5 6.5h-4M10.5 10a3.5 3.5 0 100-7 3.5 3.5 0 000 7zM22.5 17.5h-4M8.5 17.5h-6M14.5 21a3.5 3.5 0 100-7 3.5 3.5 0 000 7z"
      />
    </Box>
  );
}

export default memo(FilterIcon);
