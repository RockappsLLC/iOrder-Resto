import * as React from 'react';
import type { SVGProps } from 'react';

const IcVideoIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <path
      fill="#FF5630"
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
    <path fill="#fff" d="M20.92 21.891v2.743l5.08 3.03v-8.795l-5.08 3.022Z" opacity={0.4} />
    <path
      fill="#fff"
      d="M21.544 17.99H10.936a.937.937 0 0 0-.936.936v8.69c0 .512.416.935.936.935h10.616a.937.937 0 0 0 .936-.935v-8.698a.942.942 0 0 0-.944-.928Zm-7.496 8.555v-6.556l5.344 3.278-5.344 3.278Z"
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
        <feColorMatrix
          in="SourceAlpha"
          result="hardAlpha"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158044" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158044" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcVideoIcon;
