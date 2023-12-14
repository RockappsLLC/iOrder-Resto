import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface GiftCardProps extends BoxProps {
  color?: string;
}

function GiftCard({ color = '#19191C', ...other }: GiftCardProps) {
  return (
    <Box
      component="svg"
      width="62px"
      height="48px"
      fill="none"
      viewBox="0 0 62 48"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        fill="#E53935"
        fillRule="evenodd"
        d="M6.431 9.013h50.192V38.91H5.36V9.013h1.071z"
        clipRule="evenodd"
      />
      <path
        fill="#B71C1C"
        fillRule="evenodd"
        d="M24.584 28.237h25.63v2.132h-25.63v-2.132zm0-6.408h25.63v2.132h-25.63V21.83zm0-6.408h25.63v2.133h-25.63V15.42z"
        clipRule="evenodd"
      />
      <path
        fill="#F9A825"
        fillRule="evenodd"
        d="M11.578 9.013h6.608V38.91h-6.608V9.013z"
        clipRule="evenodd"
      />
      <path
        fill="#FBC02D"
        d="M19.928 27.566l-4.866-3.895-4.866 3.905-1.752 1.402.02-2.243.05-7.81.02-1.892 1.602 1.001 4.926 3.024 4.926-3.034 1.602-.99.02 1.902.05 7.81.01 2.222-1.742-1.402z"
      />
    </Box>
  );
}

export default memo(GiftCard);
