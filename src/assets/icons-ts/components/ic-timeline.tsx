import * as React from 'react';
import type { SVGProps } from 'react';

const IcTimelineIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 200 200" {...props}>
    <rect width={48} height={16} x={117} y={92} fill="#919EAB" rx={8} />
    <rect width={48} height={16} x={35} y={52} fill="#919EAB" opacity={0.48} rx={8} />
    <rect width={48} height={16} x={35} y={132} fill="#919EAB" opacity={0.24} rx={8} />
    <path
      fill="#919EAB"
      d="M100 113.171c.835 0 1.5.506 1.5 1.34v10.978c0 .834-.665 1.34-1.5 1.34s-1.5-.506-1.5-1.34v-10.978c0-.834.665-1.34 1.5-1.34ZM100 73.17c.835 0 1.5.507 1.5 1.341V85.49c0 .834-.665 1.34-1.5 1.34s-1.5-.506-1.5-1.34V74.51c0-.834.665-1.34 1.5-1.34ZM100 46.836c-.834 0-1.5-.512-1.5-1.346v-6.85c0-.984.6-1.64 1.5-1.64s1.5.656 1.5 1.64v6.85c0 .834-.666 1.346-1.5 1.346ZM100 153.164c.834 0 1.5.512 1.5 1.346v6.851c0 .983-.6 1.639-1.5 1.639s-1.5-.656-1.5-1.639v-6.851c0-.834.666-1.346 1.5-1.346Z"
      opacity={0.24}
    />
    <circle cx={100} cy={60} r={9} fill="#919EAB" opacity={0.24} />
    <circle cx={100} cy={100} r={9} fill="#919EAB" opacity={0.24} />
    <circle cx={100} cy={140} r={9} fill="#919EAB" opacity={0.24} />
  </svg>
);
export default IcTimelineIcon;
