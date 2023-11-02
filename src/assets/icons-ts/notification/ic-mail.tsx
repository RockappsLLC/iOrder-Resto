import * as React from 'react';
import type { SVGProps } from 'react';

const IcMailIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path fill="#FFE9D5" d="m0 9 11.556 7.355a.745.745 0 0 0 .888 0L24 9 12.45.15a.751.751 0 0 0-.9 0L0 9Z" />
    <path
      fill="#61F3F3"
      d="M19.5 0h-15C3.674 0 3 .673 3 1.5V18c0 .414.336.75.75.75h16.5A.75.75 0 0 0 21 18V1.5c0-.827-.672-1.5-1.5-1.5Z"
    />
    <path
      fill="#006C9C"
      d="M6.75 4.5h10.5a.75.75 0 0 0 0-1.5H6.75a.75.75 0 0 0 0 1.5ZM17.25 6H6.75a.75.75 0 0 0 0 1.5h10.5a.75.75 0 0 0 0-1.5Zm-4.5 3h-6a.75.75 0 0 0 0 1.5h6a.75.75 0 0 0 0-1.5Z"
    />
    <path
      fill="url(#prefix__a)"
      d="M12.444 16.355a.745.745 0 0 1-.888 0L0 9v13.5A1.5 1.5 0 0 0 1.5 24h21a1.5 1.5 0 0 0 1.5-1.5V9l-11.556 7.355Z"
    />
    <path
      fill="#FF5630"
      d="M22.5 24h-21C.658 24 0 23.341 0 22.5a.75.75 0 0 1 .306-.605l11.25-7.5a.745.745 0 0 1 .888 0l11.25 7.5A.751.751 0 0 1 24 22.5c0 .841-.659 1.5-1.5 1.5Z"
    />
    <defs>
      <linearGradient id="prefix__a" x1={0} x2={13.483} y1={9} y2={30.573} gradientUnits="userSpaceOnUse">
        <stop stopColor="#FFAC82" />
        <stop offset={1} stopColor="#FF5630" />
      </linearGradient>
    </defs>
  </svg>
);
export default IcMailIcon;
