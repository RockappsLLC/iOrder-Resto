import * as React from 'react';
import type { SVGProps } from 'react';

const IcSwitchIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <rect width={104} height={64} x={48} y={68} fill="#919EAB" opacity={0.24} rx={32} />
    <path
      fill="#919EAB"
      d="M120 124c13.255 0 24-10.745 24-24s-10.745-24-24-24-24 10.745-24 24 10.745 24 24 24Z"
    />
  </svg>
);
export default IcSwitchIcon;
