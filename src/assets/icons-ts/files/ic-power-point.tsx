import * as React from 'react';
import type { SVGProps } from 'react';

const IcPowerPointIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <path
      fill="#F56B36"
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
      d="M16.494 17.013a6.493 6.493 0 1 0 0 12.987 6.496 6.496 0 0 0 6.495-6.495h-6.495v-6.492Z"
      opacity={0.48}
    />
    <path fill="#fff" d="M17.505 16v6.495h6.494A6.493 6.493 0 0 0 17.505 16Z" />
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
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158059" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158059" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcPowerPointIcon;
