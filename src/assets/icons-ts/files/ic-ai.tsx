import * as React from 'react';
import type { SVGProps } from 'react';

const IcAiIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <g clipPath="url(#prefix__a)">
      <path
        fill="#3B1F03"
        d="M23.172 0a2 2 0 0 1 1.414.585l11.828 11.82A2 2 0 0 1 37 13.818v21.514C37 37.911 34.869 40 32.24 40H7.76C5.131 40 3 37.91 3 35.333V4.667C3 2.089 5.131 0 7.76 0h15.412Z"
      />
      <g filter="url(#prefix__b)">
        <path
          fill="#fff"
          fillOpacity={0.24}
          d="M35.155 12.138a.5.5 0 0 1-.355.852H29c-2.577 0-4.902-2.267-4.902-4.78V2.204a.5.5 0 0 1 .855-.352l10.202 10.286Z"
          shapeRendering="crispEdges"
        />
      </g>
      <path
        fill="#FF860D"
        d="m14 31 3.072-8.676h2.388L22.532 31h-2.304l-.576-1.68h-2.736L16.328 31H14Zm3.408-3.672h1.716l-.852-2.772-.864 2.772ZM23.524 22.324h2.334V31h-2.334v-8.676Z"
      />
    </g>
    <defs>
      <clipPath id="prefix__a">
        <path fill="#fff" d="M0 0h40v40H0z" />
      </clipPath>
      <filter
        id="prefix__b"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158111" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158111" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcAiIcon;
