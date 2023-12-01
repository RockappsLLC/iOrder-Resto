import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function MoneyIcon({ color = '#19191C', ...other }: PlanStarterIconProps) {
  return (
    <Box
      component="svg"
      width="25px"
      height="25px"
      fill="none"
      viewBox="0 0 25 25"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <g>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M3.61 9.533a3 3 0 003.77-3.707M3.61 9.532c.047-.61.11-1.244.19-1.913.108-.912 1.045-1.631 2.218-1.71.467-.031.92-.06 1.362-.085M3.61 9.533c-.168 2.19-.135 4.082.04 6.256m3.73-9.964c3.68-.21 6.586-.211 10.24-.002M3.65 15.79c.05.604.11 1.23.179 1.89.097.93 1.042 1.673 2.237 1.752.45.03.886.057 1.313.08M3.651 15.79a3.001 3.001 0 013.728 3.723m0 0c3.646.206 6.555.207 10.241-.001m0 0c.432-.024.874-.052 1.33-.082 1.192-.078 2.137-.817 2.235-1.745.07-.662.13-1.288.177-1.892m-3.742 3.719a3 3 0 013.742-3.718m0 0c.172-2.192.188-4.082.021-6.258m0 0A51.92 51.92 0 0021.2 7.63c-.104-.917-1.043-1.644-2.222-1.723-.465-.031-.917-.06-1.358-.085m3.763 3.712a3 3 0 01-3.763-3.712M6.51 12.667H6.5m12.01 0h-.01m-3 0a3 3 0 11-6 0 3 3 0 016 0z"
        />
      </g>
    </Box>
  );
}

export default memo(MoneyIcon);
