import * as React from 'react';
import type { SVGProps } from 'react';

const HomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" {...props}>
    <path
      fill="#F15F34"
      d="m3.954 8.61 6.463-5.063c.931-.73 2.235-.73 3.165 0l6.465 5.064c.737.578.942 1.438.953 2.432 0 .054-.002.107-.006.16-.041.552-.33 3.922-1.4 7.705C19.218 19.961 18.33 21 17.108 21h-1.189c-.74 0-1.447-.604-1.447-1.35l.107-2.804A2.587 2.587 0 0 0 12 14.25a2.587 2.587 0 0 0-2.578 2.596l.12 2.804c0 .746-.72 1.35-1.46 1.35H6.893c-1.222 0-2.11-1.038-2.488-2.092-1.068-3.783-1.358-7.153-1.4-7.705a1.841 1.841 0 0 1-.005-.16c.01-.994.216-1.854.954-2.432Z"
    />
  </svg>
);
export default HomeIcon;