import * as React from 'react';
import type { SVGProps } from 'react';

const Overlay1Icon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 1024" {...props}>
    <radialGradient
      id="prefix__a"
      cx="14.341%"
      cy="-11.487%"
      r="109.474%"
      gradientTransform="matrix(.28938 .91346 -.64957 .40694 .027 -.2)"
    >
      <stop offset={0} stopColor="#161c24" stopOpacity={0.48} />
      <stop offset={0.499} stopColor="#161c24" stopOpacity={0.8} />
      <stop offset={1} stopColor="#161c24" />
    </radialGradient>
    <path
      fill="url(#prefix__a)"
      fillRule="evenodd"
      d="M0 0h1440v1024H0z"
      transform="matrix(-1 0 0 1 1440 0)"
    />
  </svg>
);
export default Overlay1Icon;
