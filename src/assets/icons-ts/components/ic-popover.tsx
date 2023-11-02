import * as React from 'react';
import type { SVGProps } from 'react';

const IcPopoverIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M126.133 143.646c16.495 0 29.867-11.897 29.867-26.572V70.572C156 55.897 142.628 44 126.133 44H73.867C57.372 44 44 55.897 44 70.572v46.502c0 14.675 13.372 26.572 29.867 26.572h7.466l16.335 11.626c1.333.949 3.215.97 4.572.063l.092-.063 16.335-11.626h7.466Z"
      opacity={0.24}
    />
    <rect width={48} height={10} x={64} y={77} fill="#919EAB" rx={5} />
    <rect width={48} height={10} x={64} y={113} fill="#919EAB" opacity={0.24} rx={5} />
    <rect width={72} height={10} x={64} y={95} fill="#919EAB" opacity={0.48} rx={5} />
  </svg>
);
export default IcPopoverIcon;
