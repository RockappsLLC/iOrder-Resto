import * as React from 'react';
import type { SVGProps } from 'react';

const IcTourIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#1877F2"
      d="M12 22c5.523 0 10-1.567 10-3.5S17.523 15 12 15 2 16.567 2 18.5 6.477 22 12 22Z"
      opacity={0.32}
    />
    <path
      fill="#1877F2"
      d="M12 1.25a.75.75 0 0 1 .75.75v1.036l5.008 2.504.054.027c.734.367 1.36.68 1.796.984.442.309.906.756.906 1.449 0 .693-.464 1.14-.906 1.449-.436.304-1.062.617-1.796.984l-5.062 2.53V18a.75.75 0 1 1-1.5 0V2a.75.75 0 0 1 .75-.75Z"
    />
  </svg>
);
export default IcTourIcon;
