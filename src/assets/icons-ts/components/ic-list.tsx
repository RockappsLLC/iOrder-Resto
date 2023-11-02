import * as React from 'react';
import type { SVGProps } from 'react';

const IcListIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M67 70a8 8 0 0 1 8-8h52a8 8 0 0 1 0 16H75a8 8 0 0 1-8-8ZM46 79a9 9 0 1 0 0-18 9 9 0 0 0 0 18Z"
    />
    <g fill="#919EAB" opacity={0.48}>
      <path d="M67 100a8 8 0 0 1 8-8h80a8 8 0 0 1 0 16H75a8 8 0 0 1-8-8ZM46 109a9 9 0 1 0-9-9 9 9 0 0 0 9 9Z" />
    </g>
    <g fill="#919EAB" opacity={0.24}>
      <path d="M67 130a8 8 0 0 1 8-8h32a8 8 0 0 1 0 16H75a8 8 0 0 1-8-8ZM46 139a9 9 0 0 0 9-9 9 9 0 0 0-9-9 9 9 0 0 0-9 9 9 9 0 0 0 9 9Z" />
    </g>
  </svg>
);
export default IcListIcon;
