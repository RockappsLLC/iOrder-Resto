import * as React from 'react';
import type { SVGProps } from 'react';

const IcTooltipIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="M118 46c0 9.941-8.059 18-18 18s-18-8.059-18-18 8.059-18 18-18 18 8.059 18 18Zm-16.5-1.5h6a1.5 1.5 0 0 1 0 3h-6v6a1.5 1.5 0 0 1-3 0v-6h-6a1.5 1.5 0 0 1 0-3h6v-6a1.5 1.5 0 0 1 3 0v6Z"
      clipRule="evenodd"
    />
    <path
      fill="#919EAB"
      d="M122.4 86.59c14.138 0 25.6 10.196 25.6 22.775v39.859C148 161.803 136.538 172 122.4 172H77.6C63.462 172 52 161.803 52 149.224v-39.859c0-12.579 11.462-22.776 25.6-22.776H84l14.001-9.965c1.143-.813 2.756-.831 3.919-.054l.079.054L116 86.589h6.4Z"
      opacity={0.24}
    />
    <rect width={48} height={10} x={64} y={114} fill="#919EAB" opacity={0.48} rx={5} />
    <rect width={48} height={10} x={64} y={150} fill="#919EAB" opacity={0.24} rx={5} />
    <rect width={72} height={10} x={64} y={132} fill="#919EAB" opacity={0.24} rx={5} />
  </svg>
);
export default IcTooltipIcon;
