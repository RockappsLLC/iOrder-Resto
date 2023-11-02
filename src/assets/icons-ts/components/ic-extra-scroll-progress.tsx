import * as React from 'react';
import type { SVGProps } from 'react';

const IcExtraScrollProgressIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 201 200" {...props}>
    <g filter="url(#prefix__a)">
      <rect width={152} height={96} x={24.014} y={52} fill="#fff" rx={12} />
    </g>
    <mask
      id="prefix__b"
      width={153}
      height={96}
      x={24}
      y={52}
      maskUnits="userSpaceOnUse"
      style={{
        maskType: 'alpha',
      }}
    >
      <rect width={152} height={96} x={24.014} y={52} fill="#fff" rx={12} />
    </mask>
    <g mask="url(#prefix__b)">
      <path fill="#007867" d="M24.014 52h152v10h-152V52Z" opacity={0.16} />
      <g filter="url(#prefix__c)">
        <path fill="#00A76F" d="M24.014 52h95a5 5 0 0 1 0 10h-95V52Z" />
      </g>
    </g>
    <defs>
      <filter
        id="prefix__a"
        width={184}
        height={128}
        x={16.014}
        y={44}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={8} dy={8} />
        <feGaussianBlur stdDeviation={8} />
        <feColorMatrix values="0 0 0 0 0.770709 0 0 0 0 0.792653 0 0 0 0 0.818587 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2701_141901" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_2701_141901" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.717499 0 0 0 0 0.740813 0 0 0 0 0.768367 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_2701_141901" />
      </filter>
      <filter
        id="prefix__c"
        width={116}
        height={26}
        x={20.014}
        y={48}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_2701_141901" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_2701_141901" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={-1} dy={-1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_2701_141901" />
      </filter>
    </defs>
  </svg>
);
export default IcExtraScrollProgressIcon;
