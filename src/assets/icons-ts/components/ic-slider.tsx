import * as React from 'react';
import type { SVGProps } from 'react';

const IcSliderIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <rect width={152} height={28} x={24} y={86} fill="#919EAB" opacity={0.24} rx={14} />
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="M129 100c0 11.046-8.954 20-20 20s-20-8.954-20-20 8.954-20 20-20 20 8.954 20 20Zm-27.025-4.941a3.63 3.63 0 0 0-7.26 0v9.882a3.63 3.63 0 1 0 7.26 0v-9.882Zm10.286 0a3.63 3.63 0 0 0-7.261 0v9.882a3.63 3.63 0 1 0 7.261 0v-9.882Zm6.655-3.63a3.63 3.63 0 0 1 3.63 3.63v9.882a3.63 3.63 0 1 1-7.26 0v-9.882a3.63 3.63 0 0 1 3.63-3.63Z"
      clipRule="evenodd"
    />
    <path
      fill="#919EAB"
      d="M91.51 92H38a8 8 0 1 0 0 16h53.51a13.937 13.937 0 0 1-2.51-8c0-2.975.928-5.732 2.51-8Z"
      opacity={0.48}
    />
  </svg>
);
export default IcSliderIcon;
