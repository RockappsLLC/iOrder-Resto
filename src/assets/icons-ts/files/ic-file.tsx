import * as React from 'react';
import type { SVGProps } from 'react';

const IcFileIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 41" {...props}>
    <path
      fill="#C4CDD5"
      d="M23.172.99a2 2 0 0 1 1.414.585l11.828 11.82A2 2 0 0 1 37 14.809v21.515c0 2.577-2.131 4.666-4.76 4.666H7.76C5.131 40.99 3 38.9 3 36.324V5.657C3 3.08 5.131.99 7.76.99h15.412Z"
    />
    <g filter="url(#prefix__a)">
      <path
        fill="#fff"
        fillOpacity={0.24}
        d="M35.155 13.128a.5.5 0 0 1-.355.852H29c-2.577 0-4.902-2.267-4.902-4.78V3.196a.5.5 0 0 1 .855-.353l10.202 10.286Z"
        shapeRendering="crispEdges"
      />
    </g>
    <defs>
      <filter
        id="prefix__a"
        width={15.203}
        height={15.287}
        x={22.098}
        y={2.694}
        colorInterpolationFilters="sRGB"
        filterUnits="userSpaceOnUse"
      >
        <feFlood floodOpacity={0} result="BackgroundImageFix" />
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1995_147665" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1995_147665" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcFileIcon;
