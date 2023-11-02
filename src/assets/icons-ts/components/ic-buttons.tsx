import * as React from 'react';
import type { SVGProps } from 'react';

const IcButtonsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M24 80a8 8 0 0 1 8-8h136a8 8 0 0 1 8 8v40a8 8 0 0 1-8 8H32a8 8 0 0 1-8-8V80Z"
      opacity={0.24}
    />
    <rect width={76} height={18} x={62} y={91} fill="#919EAB" rx={9} />
  </svg>
);
export default IcButtonsIcon;
