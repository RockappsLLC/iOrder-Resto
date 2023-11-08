import * as React from 'react';
import type { SVGProps } from 'react';

const IcExtraSnackbarIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 200" {...props}>
    <g clipPath="url(#prefix__a)">
      <g filter="url(#prefix__b)">
        <rect width={152} height={72} x={24.014} y={64} fill="#fff" rx={12} />
      </g>
      <rect width={28} height={10} x={36.014} y={86} fill="#007867" opacity={0.4} rx={5} />
      <rect width={64} height={10} x={36.014} y={104} fill="#007867" opacity={0.16} rx={5} />
      <g filter="url(#prefix__c)">
        <path
          fill="#FFAB00"
          fillRule="evenodd"
          d="M164.014 100c0 7.732-6.268 14-14 14s-14-6.268-14-14 6.268-14 14-14 14 6.268 14 14Zm-11.22.16 3.836 3.837a1.853 1.853 0 1 1-2.62 2.62l-3.837-3.837-3.836 3.837a1.852 1.852 0 0 1-2.621 0 1.853 1.853 0 0 1 0-2.621l3.837-3.837-3.837-3.836a1.852 1.852 0 1 1 2.62-2.62l3.837 3.836 3.837-3.837a1.852 1.852 0 1 1 2.62 2.62l-3.836 3.838Z"
          clipRule="evenodd"
        />
      </g>
    </g>
    <defs>
      <filter
        id="prefix__b"
        width={184}
        height={104}
        x={16.014}
        y={56}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={8} dy={8} />
        <feGaussianBlur stdDeviation={8} />
        <feColorMatrix values="0 0 0 0 0.770709 0 0 0 0 0.792653 0 0 0 0 0.818587 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1589_121148" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1589_121148" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.717499 0 0 0 0 0.740813 0 0 0 0 0.768367 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1589_121148" />
      </filter>
      <filter
        id="prefix__c"
        width={44}
        height={44}
        x={132.014}
        y={82}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feColorMatrix values="0 0 0 0 0.717647 0 0 0 0 0.431373 0 0 0 0 0 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1589_121148" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1589_121148" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-1} dy={-1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.717647 0 0 0 0 0.431373 0 0 0 0 0 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1589_121148" />
      </filter>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M.014 0h200v200h-200z" />
      </clipPath>
    </defs>
  </svg>
);
export default IcExtraSnackbarIcon;
