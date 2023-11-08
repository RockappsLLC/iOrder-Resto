import * as React from 'react';
import type { SVGProps } from 'react';

const IcViteIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="url(#prefix__a)"
      d="m22.413 4.61-9.857 17.624a.536.536 0 0 1-.933.004L1.572 4.611a.536.536 0 0 1 .56-.793l9.866 1.764a.535.535 0 0 0 .19 0L21.85 3.82a.536.536 0 0 1 .564.788Z"
    />
    <path
      fill="url(#prefix__b)"
      d="m16.698 1.505-7.294 1.43a.268.268 0 0 0-.216.246L8.74 10.76a.268.268 0 0 0 .327.277l2.031-.468a.268.268 0 0 1 .323.314l-.604 2.954a.268.268 0 0 0 .34.31l1.255-.38a.268.268 0 0 1 .34.31l-.959 4.64c-.06.29.326.45.487.2l.108-.166 5.943-11.861a.268.268 0 0 0-.29-.383l-2.09.403a.268.268 0 0 1-.308-.337l1.364-4.73a.268.268 0 0 0-.309-.337Z"
    />
    <defs>
      <linearGradient
        id="prefix__a"
        x1={1.326}
        x2={13.593}
        y1={3.188}
        y2={19.847}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#41D1FF" />
        <stop offset={1} stopColor="#BD34FE" />
      </linearGradient>
      <linearGradient
        id="prefix__b"
        x1={11.431}
        x2={13.65}
        y1={1.893}
        y2={17.115}
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#FFEA83" />
        <stop offset={0.083} stopColor="#FFDD35" />
        <stop offset={1} stopColor="#FFA800" />
      </linearGradient>
    </defs>
  </svg>
);
export default IcViteIcon;
