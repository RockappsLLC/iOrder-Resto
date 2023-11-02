import * as React from 'react';
import type { SVGProps } from 'react';

const IcAudioIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 40 40" {...props}>
    <g clipPath="url(#prefix__a)">
      <path
        fill="#8E33FF"
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
        fill="#fff"
        d="M22.923 16.798v9.423c0 .28-.095.53-.286.749-.19.219-.432.388-.723.509-.292.12-.582.21-.871.269-.289.059-.56.088-.812.088s-.523-.03-.812-.088a4.767 4.767 0 0 1-.87-.27 1.91 1.91 0 0 1-.724-.508 1.107 1.107 0 0 1-.286-.749c0-.28.095-.53.286-.749.19-.219.432-.388.723-.509.292-.12.582-.21.871-.27.289-.058.56-.087.812-.087.589 0 1.127.109 1.615.328v-4.518l-6.461 1.994v5.965c0 .28-.096.53-.286.749a1.91 1.91 0 0 1-.724.509c-.292.12-.582.21-.87.269-.29.059-.56.088-.813.088-.252 0-.523-.03-.812-.088a4.772 4.772 0 0 1-.87-.27 1.912 1.912 0 0 1-.724-.508 1.107 1.107 0 0 1-.286-.75c0-.28.095-.53.286-.748a1.91 1.91 0 0 1 .724-.509c.291-.12.582-.21.87-.27.29-.058.56-.088.812-.088.59 0 1.128.11 1.616.329v-8.136c0-.174.053-.333.16-.476a.83.83 0 0 1 .412-.298l7-2.154a.747.747 0 0 1 .236-.034c.224 0 .415.079.572.236a.78.78 0 0 1 .235.572Z"
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
        <feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" />
        <feOffset dy={2} />
        <feGaussianBlur stdDeviation={1} />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.04 0" />
        <feBlend in2="BackgroundImageFix" result="effect1_dropShadow_1255_158073" />
        <feBlend in="SourceGraphic" in2="effect1_dropShadow_1255_158073" result="shape" />
      </filter>
    </defs>
  </svg>
);
export default IcAudioIcon;
