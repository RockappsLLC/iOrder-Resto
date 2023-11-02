import * as React from 'react';
import type { SVGProps } from 'react';

const IcDialogIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M24 64c0-6.627 5.373-12 12-12h128c6.627 0 12 5.373 12 12v72c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12V64Z"
      opacity={0.24}
    />
    <rect width={56} height={10} x={40} y={68} fill="#919EAB" rx={5} />
    <rect width={56} height={10} x={40} y={104} fill="#919EAB" opacity={0.24} rx={5} />
    <rect width={80} height={10} x={40} y={86} fill="#919EAB" opacity={0.48} rx={5} />
    <rect width={24} height={12} x={112} y={124} fill="#919EAB" opacity={0.24} rx={6} />
    <rect width={24} height={12} x={140} y={124} fill="#919EAB" opacity={0.48} rx={6} />
  </svg>
);
export default IcDialogIcon;
