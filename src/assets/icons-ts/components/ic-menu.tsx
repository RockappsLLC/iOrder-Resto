import * as React from 'react';
import type { SVGProps } from 'react';

const IcMenuIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M24 98c0-6.627 5.373-12 12-12h128c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12V98Z"
      opacity={0.24}
    />
    <rect width={32} height={10} x={40} y={108} fill="#919EAB" opacity={0.48} rx={5} />
    <rect width={64} height={10} x={40} y={126} fill="#919EAB" opacity={0.24} rx={5} />
    <path
      fill="#919EAB"
      d="M52 50a8 8 0 0 1 8-8h80a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H60a8 8 0 0 1-8-8V50Z"
      opacity={0.24}
    />
    <rect width={48} height={12} x={76} y={54} fill="#919EAB" rx={6} />
  </svg>
);
export default IcMenuIcon;
