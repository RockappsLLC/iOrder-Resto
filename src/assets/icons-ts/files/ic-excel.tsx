import * as React from 'react';
import type { SVGProps } from 'react';

const IcExcelIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <path
      fill="#00A76F"
      d="M23.172 0a2 2 0 0 1 1.414.585l11.828 11.82A2 2 0 0 1 37 13.818v21.514C37 37.911 34.869 40 32.24 40H7.76C5.131 40 3 37.91 3 35.333V4.667C3 2.089 5.131 0 7.76 0h15.412Z"
    />
    <g filter="url(#prefix__a)">
      <path
        fill="#fff"
        fillOpacity={0.24}
        d="M35.155 12.138a.5.5 0 0 1-.355.852H29c-2.577 0-4.902-2.267-4.902-4.78V2.204a.5.5 0 0 1 .855-.352l10.202 10.286Z"
        shapeRendering="crispEdges"
      />
    </g>
    <path
      fill="#fff"
      d="M23.996 16v.011H24V30h-1.166v-.002h-3.508L18.16 30v-.002h-2.308L14.685 30v-.002H11.17L10.004 30v-.002l-.002-1.165h.002V25.31L10 24.145h.003v-3.523H10v-1.165h.004v-2.291H10V16h13.996Zm-9.31 9.31H11.17v3.523h3.515V25.31Zm3.474 0h-2.308v3.523h2.308V25.31Zm4.674 0h-3.508v3.523h3.508V25.31Zm-8.149-4.688H11.17v3.523h3.515v-3.523Zm3.475 0h-2.308v3.523h2.308v-3.523Zm4.674 0h-3.508v3.523h3.508v-3.523Zm0-3.456H11.17v2.29h11.664v-2.29Z"
    />
    <defs>
      <filter
        id="prefix__a"
        width={15.203}
        height={15.287}
        x={22.098}
        y={1.703}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158054" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158054" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcExcelIcon;
