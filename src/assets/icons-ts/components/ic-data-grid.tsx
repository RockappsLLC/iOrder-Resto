import * as React from 'react';
import type { SVGProps } from 'react';

const IcDataGridIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M28 60c0-6.627 5.373-12 12-12h120c6.627 0 12 5.373 12 12v12H28V60Z"
      opacity={0.48}
    />
    <path
      fill="#919EAB"
      d="M28 72v68c0 6.627 5.373 12 12 12h120c6.627 0 12-5.373 12-12V72H28Z"
      opacity={0.24}
    />
    <g fill="#919EAB" opacity={0.48}>
      <path d="M40 95a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6v-8ZM82 95a6 6 0 0 1 6-6h66a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H88a6 6 0 0 1-6-6v-8Z" />
    </g>
    <g fill="#919EAB" opacity={0.24}>
      <path d="M40 121a6 6 0 0 1 6-6h24a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H46a6 6 0 0 1-6-6v-8ZM82 121a6 6 0 0 1 6-6h66a6 6 0 0 1 6 6v8a6 6 0 0 1-6 6H88a6 6 0 0 1-6-6v-8Z" />
    </g>
  </svg>
);
export default IcDataGridIcon;
