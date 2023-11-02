import * as React from 'react';
import type { SVGProps } from 'react';

const IcAlertIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      d="M24 76c0-6.627 5.373-12 12-12h128c6.627 0 12 5.373 12 12v48c0 6.627-5.373 12-12 12H36c-6.627 0-12-5.373-12-12V76Z"
      opacity={0.24}
    />
    <rect width={32} height={10} x={86} y={86} fill="#919EAB" opacity={0.48} rx={5} />
    <rect width={64} height={10} x={86} y={104} fill="#919EAB" opacity={0.24} rx={5} />
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="m59.985 86.665 13.256 21.42a4.94 4.94 0 0 1 .087 5.119c-1.058 1.751-2.996 2.817-5.082 2.796H41.734c-2.1.007-4.041-1.086-5.082-2.863a4.94 4.94 0 0 1 .087-5.052l13.256-21.42C51.085 85.005 52.967 84 54.99 84s3.905 1.005 4.995 2.665Zm-7.7 22.668c0 1.473 1.216 2.667 2.715 2.667 1.5 0 2.714-1.194 2.714-2.667 0-1.472-1.215-2.666-2.714-2.666-1.5 0-2.714 1.194-2.714 2.666ZM55 104c1.5 0 2.714-1.194 2.714-2.667V90.667C57.714 89.194 56.5 88 55 88c-1.5 0-2.714 1.194-2.714 2.667v10.666C52.286 102.806 53.5 104 55 104Z"
      clipRule="evenodd"
    />
  </svg>
);
export default IcAlertIcon;
