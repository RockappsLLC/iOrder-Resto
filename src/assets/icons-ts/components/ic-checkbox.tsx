import * as React from 'react';
import type { SVGProps } from 'react';

const IcCheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <path
      fill="#919EAB"
      fillRule="evenodd"
      d="M76 64c-6.627 0-12 5.373-12 12v48c0 6.627 5.373 12 12 12h48c6.627 0 12-5.373 12-12V76c0-6.627-5.373-12-12-12H76Zm6 8c-5.523 0-10 4.477-10 10v36c0 5.523 4.477 10 10 10h36c5.523 0 10-4.477 10-10V82c0-5.523-4.477-10-10-10H82Z"
      clipRule="evenodd"
      opacity={0.24}
    />
    <path
      fill="#919EAB"
      d="M113.049 86.339a3.968 3.968 0 0 1 5.618-.328 4.006 4.006 0 0 1 .395 5.56l-.069.081-20.198 22.779a3.968 3.968 0 0 1-5.709.243l-.076-.075-11.845-11.892a4.007 4.007 0 0 1 0-5.65 3.968 3.968 0 0 1 5.55-.076l.078.076 8.862 8.898 17.394-19.616Z"
    />
  </svg>
);
export default IcCheckboxIcon;
