import * as React from 'react';
import type { SVGProps } from 'react';

const IcChatIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="url(#prefix__a)"
      fillRule="evenodd"
      d="M15.955 7.272a7.895 7.895 0 0 1 8.043 7.764 7.96 7.96 0 0 1-.184 1.87A14.37 14.37 0 0 0 23.456 20v2.013c0 .308-.25.558-.558.558h-2.013a14.37 14.37 0 0 0-3.094.358c-.6.133-1.227.197-1.87.184a7.895 7.895 0 0 1-7.764-8.043 7.922 7.922 0 0 1 7.798-7.798Z"
      clipRule="evenodd"
    />
    <path
      fill="url(#prefix__b)"
      fillRule="evenodd"
      d="M9.801.043A9.618 9.618 0 0 0 .001 9.5a9.695 9.695 0 0 0 .225 2.279c.274 1.239.436 2.5.436 3.769V18c0 .376.305.68.68.68h2.453c1.269 0 2.53.163 3.769.436.732.162 1.495.24 2.278.225a9.619 9.619 0 0 0 9.46-9.8 9.651 9.651 0 0 0-9.5-9.5Z"
      clipRule="evenodd"
    />
    <g fill="#006C9C" fillRule="evenodd" clipRule="evenodd" opacity={0.48}>
      <path d="M6.197 9.175a1.495 1.495 0 1 0-2.111 2.111l3.225 3.225A1.495 1.495 0 1 0 9.422 12.4L6.197 9.175Z" />
      <path d="M10.425 9.175a1.495 1.495 0 1 0-2.111 2.111l3.224 3.225A1.495 1.495 0 1 0 13.65 12.4l-3.224-3.225Z" />
      <path d="M14.652 9.175a1.495 1.495 0 1 0-2.111 2.111l3.224 3.225a1.495 1.495 0 1 0 2.111-2.111l-3.224-3.225Z" />
    </g>
    <g fill="#fff">
      <path d="M6.604 10.198a1.495 1.495 0 1 1-2.99 0 1.495 1.495 0 0 1 2.99 0ZM10.831 10.198a1.495 1.495 0 1 1-2.99 0 1.495 1.495 0 0 1 2.99 0ZM15.06 10.198a1.495 1.495 0 1 1-2.99 0 1.495 1.495 0 0 1 2.99 0Z" />
    </g>
    <defs>
      <linearGradient id="prefix__a" x1={8.156} x2={24} y1={7.271} y2={23.115} gradientUnits="userSpaceOnUse">
        <stop stopColor="#77ED8B" />
        <stop offset={1} stopColor="#22C55E" />
      </linearGradient>
      <linearGradient id="prefix__b" x1={0} x2={19.302} y1={0.041} y2={19.344} gradientUnits="userSpaceOnUse">
        <stop stopColor="#00B8D9" />
        <stop offset={1} stopColor="#006C9C" />
      </linearGradient>
    </defs>
  </svg>
);
export default IcChatIcon;
