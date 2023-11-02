import * as React from 'react';
import type { SVGProps } from 'react';

const IcExtraEditorIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <g filter="url(#prefix__a)">
      <rect width={112} height={136} x={44} y={32} fill="#fff" rx={12} />
    </g>
    <g filter="url(#prefix__b)">
      <path
        fill="#00A76F"
        d="M60 60.071A4.073 4.073 0 0 1 64.071 56H93.93A4.073 4.073 0 0 1 98 60.071V65.5a4.073 4.073 0 0 1-4.071 4.071 4.073 4.073 0 0 1-4.072-4.071v-1.357h-6.786v21.714a4.073 4.073 0 0 1 4.072 4.072A4.073 4.073 0 0 1 83.07 94H74.93a4.073 4.073 0 0 1-4.072-4.071 4.073 4.073 0 0 1 4.072-4.072V64.143h-6.786V65.5a4.073 4.073 0 0 1-4.072 4.071A4.073 4.073 0 0 1 60 65.5v-5.429Z"
      />
    </g>
    <rect width={28} height={10} x={110} y={56} fill="#007867" opacity={0.4} rx={5} />
    <rect width={28} height={10} x={110} y={70} fill="#007867" opacity={0.24} rx={5} />
    <rect width={28} height={10} x={110} y={84} fill="#B76E00" opacity={0.16} rx={5} />
    <rect width={80} height={10} x={60} y={106} fill="#007867" opacity={0.16} rx={5} />
    <rect width={80} height={10} x={60} y={120} fill="#007867" opacity={0.16} rx={5} />
    <defs>
      <filter
        id="prefix__a"
        width={144}
        height={168}
        x={36}
        y={24}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={8} dy={8} />
        <feGaussianBlur stdDeviation={8} />
        <feColorMatrix values="0 0 0 0 0.770709 0 0 0 0 0.792653 0 0 0 0 0.818587 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1587_120567" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1587_120567" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={-2} dy={-2} />
        <feGaussianBlur stdDeviation={2} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0.717499 0 0 0 0 0.740813 0 0 0 0 0.768367 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1587_120567" />
      </filter>
      <filter
        id="prefix__b"
        width={54}
        height={54}
        x={56}
        y={52}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={4} dy={4} />
        <feGaussianBlur stdDeviation={4} />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.16 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1587_120567" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1587_120567" result="shape" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dx={-1} dy={-1} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" k2={-1} k3={1} operator="arithmetic" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0.470588 0 0 0 0 0.403922 0 0 0 0.48 0" />
        <feBlend in2="shape" result="effect2_innerShadow_1587_120567" />
      </filter>
    </defs>
  </svg>
);
export default IcExtraEditorIcon;
