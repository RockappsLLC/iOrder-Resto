import * as React from 'react';
import type { SVGProps } from 'react';

const IcAmplifyIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="url(#prefix__a)"
      d="M5.788 17.619h6.196l1.587 2.794H1L7.264 9.56l1.588 2.752-3.064 5.306Zm2.31-9.507L9.624 5.47l8.63 14.943h-3.056L8.1 8.113ZM10.473 4h3.052L23 20.413h-3.056L10.472 4Z"
    />
    <defs>
      <linearGradient
        id="prefix__a"
        x1={2201}
        x2={349.821}
        y1={367.9}
        y2={1748.94}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#F90" />
        <stop offset={1} stopColor="#FFC300" />
      </linearGradient>
    </defs>
  </svg>
);
export default IcAmplifyIcon;
