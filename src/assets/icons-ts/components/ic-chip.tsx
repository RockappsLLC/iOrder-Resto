import * as React from 'react';
import type { SVGProps } from 'react';

const IcChipIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <rect width={152} height={56} x={24} y={72} fill="#919EAB" opacity={0.24} rx={28} />
    <rect width={66} height={14} x={82} y={93} fill="#919EAB" opacity={0.48} rx={7} />
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="M74 100c0 12.15-9.85 22-22 22s-22-9.85-22-22 9.85-22 22-22 22 9.85 22 22Zm-26.572 9.609 4.035-2.134a1.153 1.153 0 0 1 1.074 0l4.035 2.134c.306.162.657.218.997.159a1.58 1.58 0 0 0 1.284-1.825l-.772-4.529a1.15 1.15 0 0 1 .328-1.014l3.27-3.206c.247-.242.409-.56.458-.904a1.58 1.58 0 0 0-1.33-1.793l-4.513-.66a1.149 1.149 0 0 1-.865-.63l-2.02-4.116a1.568 1.568 0 0 0-2.82 0l-2.018 4.116c-.167.34-.49.576-.865.63l-4.514.66c-.342.05-.658.213-.9.462a1.588 1.588 0 0 0 .029 2.235l3.27 3.206c.269.264.391.643.328 1.014l-.772 4.529a1.59 1.59 0 0 0 .158 1.003 1.566 1.566 0 0 0 2.123.663Z"
      clipRule="evenodd"
    />
  </svg>
);
export default IcChipIcon;
