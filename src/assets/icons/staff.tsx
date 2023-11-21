import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface StaffIconProps extends BoxProps {
  color?: string;
}

function Staff({ color = '#828487', ...other }: StaffIconProps) {
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
        d="M15.446 4A2.917 2.917 0 1115 9.8m1.302 2.487c.268.01.538.025.814.045 1.993.145 3.524 1.763 3.81 3.741l.055.385c.165 1.14-.627 2.205-1.773 2.327l-.374.039M13.167 6.5a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0zM5.16 20.74c3.23.344 5.797.348 9.023.002 1.375-.147 2.325-1.424 2.128-2.793l-.067-.461c-.343-2.374-2.18-4.315-4.572-4.489-1.365-.1-2.637-.1-4.005 0-2.393.175-4.232 2.116-4.574 4.49l-.066.455c-.198 1.37.756 2.649 2.133 2.796z"
      />
    </Box>
  );
}

export default memo(Staff);
