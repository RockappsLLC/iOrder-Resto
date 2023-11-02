import * as React from 'react';
import type { SVGProps } from 'react';

const IcExtraCopyToClipboardIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <g filter="url(#prefix__a)">
      <rect width={82} height={96} x={74} y={36} fill="#00A76F" rx={12} />
    </g>
    <path
      fill="#fff"
      d="M88.573 139.501c-12.203 0-22.135-9.959-22.135-22.194V63.781h-9.115C49.422 63.781 43 70.22 43 78.141v70.498C43 156.561 49.422 163 57.323 163h65.104c7.901 0 14.323-6.439 14.323-14.361v-9.138H88.573Z"
    />
    <path
      fill="#007867"
      d="M88.573 139.501c-12.203 0-22.135-9.959-22.135-22.194V63.781h-9.115C49.422 63.781 43 70.22 43 78.141v70.498C43 156.561 49.422 163 57.323 163h65.104c7.901 0 14.323-6.439 14.323-14.361v-9.138H88.573Z"
      opacity={0.12}
    />
    <defs>
      <filter
        id="prefix__a"
        width={114}
        height={128}
        x={66}
        y={28}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={8} dy={8} />
        <feGaussianBlur stdDeviation={8} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1587_120558" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1587_120558" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1587_120558" />
      </filter>
    </defs>
  </svg>
);
export default IcExtraCopyToClipboardIcon;
