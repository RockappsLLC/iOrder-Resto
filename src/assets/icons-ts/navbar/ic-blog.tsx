import * as React from 'react';
import type { SVGProps } from 'react';

const IcBlogIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <g fill="#1877F2" opacity={0.32}>
      <path d="M21 8h-8a1 1 0 1 1 0-2h8a1 1 0 1 1 0 2Zm0 4h-8a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2ZM21 16H3a1 1 0 0 1 0-2h18a1 1 0 0 1 0 2Zm-8 4H3a1 1 0 0 1 0-2h10a1 1 0 0 1 0 2Z" />
    </g>
    <rect width={8} height={8} x={2} y={4} fill="#1877F2" rx={2} />
  </svg>
);
export default IcBlogIcon;
