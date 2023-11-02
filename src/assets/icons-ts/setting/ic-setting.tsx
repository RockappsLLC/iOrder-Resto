import * as React from 'react';
import type { SVGProps } from 'react';

const IcSettingIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#637381"
      fillRule="evenodd"
      d="M6.556 2.1C3.942 2.213 2 3.884 2 6.5c0 2.617 1.942 4.288 4.556 4.4 1.369.058 3.15.1 5.444.1s4.075-.042 5.444-.1C20.058 10.787 22 9.117 22 6.5c0-2.617-1.942-4.288-4.556-4.4C16.075 2.043 14.293 2 12 2s-4.075.042-5.444.1ZM20 6.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0Z"
      clipRule="evenodd"
    />
    <path
      fill="#637381"
      fillRule="evenodd"
      d="M17.444 13.1c2.614.112 4.556 1.783 4.556 4.4 0 2.617-1.942 4.288-4.556 4.4-1.369.058-3.15.1-5.444.1s-4.075-.042-5.444-.1C3.942 21.788 2 20.116 2 17.5c0-2.617 1.942-4.288 4.556-4.4 1.369-.058 3.15-.1 5.444-.1s4.075.042 5.444.1ZM4 17.5a2.5 2.5 0 1 0 5 0 2.5 2.5 0 0 0-5 0Z"
      clipRule="evenodd"
      opacity={0.4}
    />
    <path fill="#637381" d="M17.5 9a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z" opacity={0.4} />
    <path fill="#637381" d="M6.5 20a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
  </svg>
);
export default IcSettingIcon;
