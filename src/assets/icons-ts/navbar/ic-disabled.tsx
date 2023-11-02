import * as React from 'react';
import type { SVGProps } from 'react';

const IcDisabledIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#1877F2"
      fillRule="evenodd"
      d="M12 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5 1.5 6.201 1.5 12 6.201 22.5 12 22.5Zm0-4.2a6.3 6.3 0 1 0 0-12.6 6.3 6.3 0 0 0 0 12.6Z"
      clipRule="evenodd"
      opacity={0.32}
    />
    <path
      fill="#1877F2"
      d="M18.603 3.011A1.575 1.575 0 0 1 20.83 5.24L5.24 20.83a1.575 1.575 0 1 1-2.228-2.227L18.603 3.011Z"
    />
  </svg>
);
export default IcDisabledIcon;
