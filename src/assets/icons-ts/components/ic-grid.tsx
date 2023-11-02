import * as React from 'react';
import type { SVGProps } from 'react';

const IcGridIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M103.491 45.31A9.31 9.31 0 0 1 112.8 36h41.891A9.31 9.31 0 0 1 164 45.31V87.2a9.31 9.31 0 0 1-9.309 9.31H112.8a9.31 9.31 0 0 1-9.309-9.31V45.31Z"
    />
    <g fill="#919EAB" opacity={0.24}>
      <path d="M36 45.31A9.31 9.31 0 0 1 45.31 36H87.2a9.31 9.31 0 0 1 9.31 9.31V87.2a9.31 9.31 0 0 1-9.31 9.31H45.31A9.31 9.31 0 0 1 36 87.2V45.31ZM36 112.8a9.31 9.31 0 0 1 9.31-9.309H87.2a9.31 9.31 0 0 1 9.31 9.309v41.891A9.31 9.31 0 0 1 87.2 164H45.31a9.31 9.31 0 0 1-9.31-9.309V112.8ZM103.491 112.8a9.31 9.31 0 0 1 9.309-9.309h41.891A9.31 9.31 0 0 1 164 112.8v41.891a9.31 9.31 0 0 1-9.309 9.309H112.8a9.31 9.31 0 0 1-9.309-9.309V112.8Z" />
    </g>
  </svg>
);
export default IcGridIcon;
