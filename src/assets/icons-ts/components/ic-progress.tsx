import * as React from 'react';
import type { SVGProps } from 'react';

const IcProgressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <rect width={152} height={28} x={24} y={86} fill="#919EAB" opacity={0.24} rx={14} />
    <rect width={80} height={16} x={30} y={92} fill="#919EAB" rx={8} />
  </svg>
);
export default IcProgressIcon;
