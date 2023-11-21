import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface PlanStarterIconProps extends BoxProps {
  color?: string;
}

function HomeIcon({ color = '#19191C', ...other }: PlanStarterIconProps) {
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
      <g>
        <path
          stroke={color}
          strokeLinecap="round"
          strokeWidth="1.5"
          d="M4.454 8.61l6.464-5.063c.93-.73 2.234-.73 3.165 0l6.464 5.064c.737.578.942 1.438.953 2.432 0 .054-.002.107-.006.16-.041.552-.33 3.922-1.4 7.705C19.718 19.961 18.83 21 17.608 21h-1.189c-.74 0-1.447-.604-1.447-1.35l.107-2.804A2.587 2.587 0 0012.5 14.25a2.587 2.587 0 00-2.578 2.596l.12 2.804c0 .746-.72 1.35-1.46 1.35H7.393c-1.222 0-2.11-1.038-2.488-2.092-1.068-3.783-1.358-7.153-1.4-7.705a1.841 1.841 0 01-.005-.16c.01-.994.216-1.854.954-2.432z"
        />
      </g>
    </Box>
  );
}

export default memo(HomeIcon);
