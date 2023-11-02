import * as React from 'react';
import type { SVGProps } from 'react';

const ReceiptIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#828487"
      strokeWidth={1.5}
      d="M18.5 3c.966 0 2 .5 2 1.787v4.32c0 .282-.224.51-.5.51h-3M18.5 3c-.966 0-1.5.8-1.5 1.787v4.83M18.5 3H6C4.62 3 3.5 4.143 3.5 5.553V19.69a.5.5 0 0 0 .812.396l1.32-1.07a.495.495 0 0 1 .684.057l1.562 1.76a.496.496 0 0 0 .744 0l1.506-1.697a.495.495 0 0 1 .744 0l1.457 1.642a.496.496 0 0 0 .782-.049l1.083-1.57a.496.496 0 0 1 .722-.104l1.272 1.031a.5.5 0 0 0 .812-.396V9.617"
    />
    <path stroke="#828487" strokeLinecap="round" strokeWidth={1.5} d="M6.75 8.5h7M6.75 11.5h7M6.75 14.5h4.75" />
  </svg>
);
export default ReceiptIcon;
