import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PrinterIconProps extends BoxProps {
  color?: string;
}

function PrinterIcon({ color = '#fff', ...other }: PrinterIconProps) {
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
        d="M5.566 17.798c-1.195-.068-2.14-.705-2.237-1.502-.388-3.169-.475-4.416-.03-7.621.109-.783 1.046-1.4 2.22-1.467.687-.04 1.345-.073 1.981-.101m10.95 10.69c1.192-.068 2.137-.701 2.235-1.497.398-3.2.436-4.442.015-7.616-.104-.787-1.043-1.41-2.222-1.477-.686-.04-1.342-.074-1.978-.102m-9 .002V5.5A2.5 2.5 0 0110 3h4a2.5 2.5 0 012.5 2.5v1.605m-9 .002a95.71 95.71 0 019-.002M7.5 14h1m0 0l-.592 4.146A2.5 2.5 0 0010.382 21h3.236a2.5 2.5 0 002.474-2.854L15.5 14m-7 0h7m0 0h1m-2-3.5h2"
      />
    </Box>
  );
}

export default memo(PrinterIcon);
