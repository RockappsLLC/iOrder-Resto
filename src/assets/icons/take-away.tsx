import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface TakeAwayIconProps extends BoxProps {
  color?: string;
}

function TakeAwayIcon({ color = '#828487', ...other }: TakeAwayIconProps) {
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
        fill="#F8F9FD"
        fillRule="evenodd"
        d="M4.85 3.61h7.113c3.756 0 4.505 5.938 7.087 5.938s3.614 1.807 3.614 3.356v7.745s-.516 1.033-2.065 1.033c-1.55 0-4.905-3.873-7.745-2.84-2.84 1.033-4.906 4.097-9.553 1.807C-1.346 18.36 4.85 3.61 4.85 3.61z"
        clipRule="evenodd"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M5.676 2.318h13.942m-13.477 0v1.86m13.012-1.86v1.86M16.83 6.5c0 3.08-1.873 5.577-4.183 5.577-2.31 0-4.182-2.497-4.182-5.577m13.012 14.406H3.817l1.395-16.73h14.87l1.395 16.73z"
      />
    </Box>
  );
}

export default memo(TakeAwayIcon);
