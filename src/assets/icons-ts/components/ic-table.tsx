import * as React from 'react';
import type { SVGProps } from 'react';

const IcTableIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path fill="#919EAB" d="M28 60c0-6.627 5.373-12 12-12h120c6.627 0 12 5.373 12 12v12H28V60Z" opacity={0.48} />
    <path fill="#919EAB" d="M28 72v68c0 6.627 5.373 12 12 12h120c6.627 0 12-5.373 12-12V72H28Z" opacity={0.24} />
    <rect width={36} height={20} x={40} y={89} fill="#919EAB" rx={6} />
    <rect width={36} height={20} x={82} y={89} fill="#919EAB" opacity={0.48} rx={6} />
    <rect width={36} height={20} x={124} y={89} fill="#919EAB" opacity={0.48} rx={6} />
    <rect width={36} height={20} x={40} y={115} fill="#919EAB" opacity={0.48} rx={6} />
    <rect width={36} height={20} x={82} y={115} fill="#919EAB" opacity={0.24} rx={6} />
    <rect width={36} height={20} x={124} y={115} fill="#919EAB" opacity={0.24} rx={6} />
  </svg>
);
export default IcTableIcon;
