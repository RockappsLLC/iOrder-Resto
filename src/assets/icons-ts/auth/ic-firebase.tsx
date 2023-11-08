import * as React from 'react';
import type { SVGProps } from 'react';

const IcFirebaseIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#FFA000"
      d="m14.428 8.943-2.201 2.048-2.043-4.12 1.057-2.37c.275-.48.704-.475.972 0l2.215 4.442Z"
    />
    <path fill="#F57F17" d="m10.184 6.871 2.043 4.12L4 18.644l6.184-11.773Z" />
    <path
      fill="#FFCA28"
      d="M16.835 5.813c.394-.378.8-.249.904.286l2.142 12.443-7.098 4.261c-.248.138-.908.197-.908.197s-.6-.072-.83-.206L4 18.644 16.835 5.813Z"
    />
    <path
      fill="#FFA000"
      d="M10.184 6.871 4.001 18.644 6.755 1.438c.101-.536.406-.587.679-.114l2.75 5.547Z"
    />
  </svg>
);
export default IcFirebaseIcon;
