import * as React from 'react';
import type { SVGProps } from 'react';

const IcExtraLabelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <g filter="url(#prefix__a)">
      <path
        fill="#fff"
        d="M24 84c0-6.627 5.373-12 12-12h128c6.627 0 12 5.373 12 12v32c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12V84Z"
      />
    </g>
    <g filter="url(#prefix__b)">
      <path
        fill="#00A76F"
        d="M62 99a8 8 0 0 1 8-8h60a8 8 0 0 1 8 8v2a8 8 0 0 1-8 8H70a8 8 0 0 1-8-8v-2Z"
      />
    </g>
    <defs>
      <filter
        id="prefix__a"
        width={184}
        height={88}
        x={16}
        y={64}
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1587_120568" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1587_120568" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.717499 0 0 0 0 0.740813 0 0 0 0 0.768367 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1587_120568" />
      </filter>
      <filter
        id="prefix__b"
        width={108}
        height={50}
        x={54}
        y={83}
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
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1587_120568" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1587_120568" result="shape" />
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1587_120568" />
      </filter>
    </defs>
  </svg>
);
export default IcExtraLabelIcon;
