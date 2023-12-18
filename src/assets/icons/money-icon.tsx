import { memo } from 'react';

import Box, { BoxProps } from '@mui/material/Box';

interface MoneyIconProps extends BoxProps {
  color?: string;
}

function MoneyIcon({ color = '#19191C', ...other }: MoneyIconProps) {
  return (
    <Box
      component="svg"
      width="120px"
      height="96px"
      fill="none"
      viewBox="0 0 110 96"
      xmlns="http://www.w3.org/2000/svg"
      {...other}
    >
      <path
        fill="#19AD58"
        d="M52.5 33.95h-43a2.156 2.156 0 01-2.15-2.15V8.15C7.35 6.967 8.318 6 9.5 6h43c1.183 0 2.15.968 2.15 2.15V31.8c0 1.183-.967 2.15-2.15 2.15z"
      />
      <path
        fill="#0D8944"
        d="M47.125 25.35c-2.472 0-4.73 1.183-6.02 3.118-1.075-.538-2.257-.968-3.655-.968-3.762 0-6.88 2.795-7.417 6.45H52.5c1.075 0 1.935-.752 2.15-1.827-.43-3.763-3.655-6.773-7.525-6.773z"
      />
      <path
        fill="#47CA57"
        d="M48.2 31.8H13.8c0-2.365-1.935-4.3-4.3-4.3V12.45c2.365 0 4.3-1.935 4.3-4.3h34.4c0 2.365 1.935 4.3 4.3 4.3V27.5a4.313 4.313 0 00-4.3 4.3z"
      />
      <path
        fill="#0E9347"
        d="M47.125 25.35c-2.472 0-4.73 1.183-6.02 3.118-1.075-.538-2.257-.968-3.655-.968-3.01 0-5.59 1.72-6.772 4.3H48.2c0-2.365 1.828-4.192 4.193-4.3-1.398-1.29-3.225-2.15-5.268-2.15z"
      />
      <path
        fill="#19AD58"
        d="M31 29.65c4.75 0 8.6-4.332 8.6-9.675 0-5.344-3.85-9.675-8.6-9.675s-8.6 4.331-8.6 9.675c0 5.343 3.85 9.675 8.6 9.675zM18.1 22.125a2.15 2.15 0 100-4.3 2.15 2.15 0 000 4.3zM43.9 22.125a2.15 2.15 0 100-4.3 2.15 2.15 0 000 4.3z"
      />
      <path
        fill="#55E466"
        d="M32.075 18.9h-2.15c-.645 0-1.075-.43-1.075-1.075s.43-1.075 1.075-1.075h3.225c.645 0 1.075-.43 1.075-1.075s-.43-1.075-1.075-1.075h-1.075c0-.645-.43-1.075-1.075-1.075s-1.075.43-1.075 1.075c-1.827 0-3.225 1.397-3.225 3.225 0 1.827 1.398 3.225 3.225 3.225h2.15c.645 0 1.075.43 1.075 1.075s-.43 1.075-1.075 1.075H28.85c-.645 0-1.075.43-1.075 1.075s.43 1.075 1.075 1.075h1.075c0 .645.43 1.075 1.075 1.075s1.075-.43 1.075-1.075c1.828 0 3.225-1.398 3.225-3.225 0-1.828-1.397-3.225-3.225-3.225z"
      />
      <path fill="#FFCA5D" d="M35.3 42.55a7.525 7.525 0 100-15.05 7.525 7.525 0 000 15.05z" />
      <path fill="#F6B545" d="M44.975 40.4a7.525 7.525 0 100-15.05 7.525 7.525 0 000 15.05z" />
      <path
        fill="#FFCB5B"
        d="M44.975 25.35a7.479 7.479 0 00-7.525 7.525 7.479 7.479 0 007.525 7.525 7.479 7.479 0 007.525-7.525 7.479 7.479 0 00-7.525-7.525zm0 12.9c-3.01 0-5.375-2.365-5.375-5.375s2.365-5.375 5.375-5.375 5.375 2.365 5.375 5.375-2.365 5.375-5.375 5.375z"
      />
      <path
        fill="#F6B545"
        d="M44.975 40.292c4.193.108 7.525-3.332 7.525-7.417h-.107c-.538 0-.968.43-1.075.968-.215 1.504-.968 2.902-2.043 3.87-.86.86-2.042 1.397-3.332 1.612a.963.963 0 00-.968.967z"
      />
      <path
        fill="#FFE27A"
        d="M44.975 25.457c-4.192-.107-7.525 3.333-7.525 7.418h.108c.537 0 .967-.43 1.075-.968.215-1.505.967-2.902 2.042-3.87.86-.86 2.043-1.397 3.333-1.612.537 0 .967-.43.967-.968z"
      />
      <path
        fill="#F19920"
        d="M40.353 33.627c0-3.01 2.365-5.375 5.375-5.375 1.29 0 2.472.43 3.44 1.29-1.075-1.29-2.473-2.042-4.193-2.042-3.01 0-5.375 2.365-5.375 5.375 0 1.72.753 3.117 1.935 4.085-.752-.86-1.182-2.043-1.182-3.333z"
      />
      <path
        fill="#FFCB5B"
        d="M48.2 36.207c-.107 0-.215 0-.322-.107a.52.52 0 010-.753c.645-.645.967-1.612.967-2.472 0-.323.215-.538.538-.538.322 0 .537.215.537.538 0 1.182-.43 2.365-1.182 3.225-.215.107-.43.107-.538.107z"
      />
      <path
        fill="#F19920"
        d="M44.975 36.1c-.645 0-1.075-.43-1.075-1.075v-4.3c0-.645.43-1.075 1.075-1.075s1.075.43 1.075 1.075v4.3c0 .645-.43 1.075-1.075 1.075z"
      />
      <path
        fill="#F19920"
        d="M39.708 27.5c2.042 1.29 3.655 3.44 4.085 5.913.198 1.471.256 4.832-1.099 6.5-3.002-.985-5.136-3.79-5.136-7.145 0-2.043.86-3.87 2.15-5.268z"
      />
      <path
        fill="#E78825"
        d="M41.535 36.96c-.752-.968-1.29-2.15-1.29-3.44 0-1.505.645-2.903 1.72-3.87-.215-.322-.43-.537-.645-.752-1.075.967-1.72 2.364-1.72 3.977 0 1.72.753 3.117 1.935 4.085zm2.365-3.44v1.505c0 .645.43 1.075 1.075 1.075s1.075-.43 1.075-1.075v-.215a8.788 8.788 0 00-2.15-1.29z"
      />
      <path
        fill="#F19920"
        d="M48.63 38.25c-.752.538-1.72.86-2.687 1.075-.538.107-.968.537-.968 1.075 1.505 0 2.795-.43 3.978-1.182l-.323-.968z"
      />
      <path
        fill="#FFCB5B"
        d="M39.6 27.607c-1.29 1.398-2.15 3.225-2.15 5.268h.108c.537 0 .967-.43 1.075-.968.215-1.505.967-2.795 1.935-3.762-.323-.108-.645-.323-.968-.538z"
      />
      <path fill="#F6B545" d="M35.3 42.55a7.525 7.525 0 100-15.05 7.525 7.525 0 000 15.05z" />
      <path
        fill="#FFCB5B"
        d="M35.3 27.5a7.479 7.479 0 00-7.525 7.525A7.479 7.479 0 0035.3 42.55a7.479 7.479 0 007.525-7.525A7.479 7.479 0 0035.3 27.5zm0 12.9c-3.01 0-5.375-2.365-5.375-5.375S32.29 29.65 35.3 29.65s5.375 2.365 5.375 5.375S38.31 40.4 35.3 40.4z"
      />
      <path
        fill="#F6B545"
        d="M35.3 42.442c4.193.108 7.525-3.332 7.525-7.417h-.107c-.538 0-.968.43-1.075.967-.215 1.505-.968 2.903-2.043 3.87-.86.86-2.042 1.398-3.332 1.613a.963.963 0 00-.968.967z"
      />
      <path
        fill="#FFE27A"
        d="M35.3 27.607c-4.193-.107-7.525 3.333-7.525 7.418h.107c.538 0 .968-.43 1.075-.968.215-1.505.968-2.902 2.043-3.87.86-.86 2.042-1.397 3.332-1.612.538 0 .968-.43.968-.968z"
      />
      <path
        fill="#F19920"
        d="M30.678 35.777c0-3.01 2.365-5.375 5.375-5.375 1.29 0 2.472.43 3.44 1.29-1.075-1.29-2.473-2.042-4.193-2.042-3.01 0-5.375 2.365-5.375 5.375 0 1.72.753 3.117 1.935 4.085-.752-.86-1.182-2.043-1.182-3.333z"
      />
      <path
        fill="#FFCB5B"
        d="M38.525 38.357c-.107 0-.215 0-.322-.107a.52.52 0 010-.753c.645-.645.967-1.612.967-2.472 0-.323.215-.538.538-.538.322 0 .537.215.537.538 0 1.182-.43 2.365-1.182 3.225-.215.107-.43.107-.538.107z"
      />
      <path
        fill="#F19920"
        d="M35.3 38.25c-.645 0-1.075-.43-1.075-1.075v-4.3c0-.645.43-1.075 1.075-1.075s1.075.43 1.075 1.075v4.3c0 .645-.43 1.075-1.075 1.075z"
      />
    </Box>
  );
}

export default memo(MoneyIcon);
