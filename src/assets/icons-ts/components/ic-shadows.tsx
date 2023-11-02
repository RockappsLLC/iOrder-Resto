import * as React from 'react';
import type { SVGProps } from 'react';

const IcShadowsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M100 164c35.346 0 64-28.654 64-64 0-35.346-28.654-64-64-64-35.346 0-64 28.654-64 64 0 35.346 28.654 64 64 64Z"
      opacity={0.24}
    />
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="M40.572 100c0 32.173 26.53 58.199 59.428 59.429V40.571C67.102 41.801 40.572 67.827 40.572 100Z"
      clipRule="evenodd"
    />
  </svg>
);
export default IcShadowsIcon;
