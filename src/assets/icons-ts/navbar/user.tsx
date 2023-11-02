import * as React from 'react';
import type { SVGProps } from 'react';

const UserIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      stroke="#828487"
      strokeWidth={1.5}
      d="M15.5 6.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0ZM5.424 17.49C5.767 15.115 7.606 13.174 10 13c1.367-.1 2.64-.1 4.004-.001 2.392.174 4.23 2.115 4.573 4.489l.066.462c.198 1.368-.753 2.645-2.127 2.792-3.227.346-5.793.342-9.024-.002-1.377-.147-2.33-1.425-2.133-2.796l.066-.454Z"
    />
  </svg>
);
export default UserIcon;
