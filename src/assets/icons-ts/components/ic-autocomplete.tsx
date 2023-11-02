import * as React from 'react';
import type { SVGProps } from 'react';

const IcAutocompleteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M24 98c0-6.627 5.373-12 12-12h128c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12V98Z"
      opacity={0.24}
    />
    <rect width={32} height={10} x={40} y={108} fill="#919EAB" opacity={0.48} rx={5} />
    <rect width={64} height={10} x={40} y={126} fill="#919EAB" opacity={0.24} rx={5} />
    <rect width={128} height={36} x={36} y={42} fill="#919EAB" opacity={0.24} rx={18} />
    <path
      fill="#919EAB"
      d="M53.88 53a5.88 5.88 0 0 1 5.029 8.929l2.68 2.681a1.4 1.4 0 0 1-1.928 2.028l-.05-.048-2.682-2.681A5.88 5.88 0 1 1 53.88 53Zm0 2.8a3.08 3.08 0 1 0 0 6.16 3.08 3.08 0 0 0 0-6.16Z"
      opacity={0.48}
    />
    <rect width={56} height={10} x={72} y={55} fill="#919EAB" rx={5} />
  </svg>
);
export default IcAutocompleteIcon;
