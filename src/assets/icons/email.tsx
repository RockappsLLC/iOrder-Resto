import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface EmailIconProps extends BoxProps {
  color?: string;
}

function EmailIcon({ color = '#fff', ...other }: EmailIconProps) {
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
        strokeWidth="1.5"
        d="M3.3 6.593c.108-.978 1.045-1.748 2.218-1.832 4.825-.347 8.174-.348 12.96-.003 1.18.085 2.118.864 2.222 1.847.421 3.968.383 6.77-.015 10.77-.098.995-1.043 1.787-2.235 1.87-4.8.34-8.146.34-12.884.002-1.195-.085-2.14-.88-2.237-1.877-.388-3.96-.475-6.77-.03-10.777z"
      />
      <path
        stroke={color}
        strokeLinecap="round"
        strokeWidth="1.5"
        d="M6 8l4.31 3.951a2.5 2.5 0 003.38 0L18 8"
      />
    </Box>
  );
}

export default memo(EmailIcon);
