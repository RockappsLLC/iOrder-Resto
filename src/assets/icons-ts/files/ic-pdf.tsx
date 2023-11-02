import * as React from 'react';
import type { SVGProps } from 'react';

const IcPdfIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <path
      fill="#E94848"
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
      d="M16.067 15.99c-.854 0-1.556.702-1.556 1.556 0 1.06.59 2.378 1.21 3.617-.485 1.519-1.035 3.147-1.74 4.52-1.441.566-2.727.986-3.5 1.61a.466.466 0 0 0-.034.038 1.563 1.563 0 0 0 1.108 2.659c.417 0 .819-.155 1.109-.452a.524.524 0 0 0 .03-.024c.568-.68 1.239-1.912 1.837-3.038 1.377-.542 2.82-1.094 4.214-1.425 1.017.82 2.489 1.362 3.7 1.362.853 0 1.555-.703 1.555-1.556 0-.854-.702-1.556-1.556-1.556-.97 0-2.382.347-3.46.71a11.52 11.52 0 0 1-2.256-2.936c.412-1.271.894-2.543.894-3.53 0-.853-.702-1.555-1.555-1.555Zm0 .934c.349 0 .622.273.622.622 0 .467-.25 1.326-.54 2.25-.387-.899-.705-1.761-.705-2.25 0-.35.273-.622.623-.622Zm.267 5.323a12.484 12.484 0 0 0 1.614 2.05c-.923.253-1.823.576-2.713.915.43-.97.774-1.975 1.099-2.965Zm6.11 1.988c.35 0 .623.273.623.622 0 .35-.273.622-.623.622-.7 0-1.697-.316-2.493-.758.914-.259 1.912-.486 2.493-.486ZM13.16 27.02c-.438.78-.873 1.51-1.177 1.877a.592.592 0 0 1-.427.16.615.615 0 0 1-.623-.622c0-.165.07-.328.166-.433.364-.282 1.158-.62 2.06-.982Z"
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
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158068" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158068" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcPdfIcon;
