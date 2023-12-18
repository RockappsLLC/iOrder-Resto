/* eslint-disable react/destructuring-assignment */
import { FC } from 'react';

import { Box, StyledComponentProps } from '@mui/material';

export const Chair = (props: any) => (
  <Box
    sx={{
      ...(props?.bottom || props?.top
        ? {
            ...(props?.minimal
              ? {
                  width: 14,
                  height: 4,
                  borderRadius: 8,
                }
              : {
                  width: 50,
                  height: 14,
                  borderRadius: 30,
                }),
            left: '50%',
            transform: 'translateX(-50%)',
          }
        : {
            ...(props?.minimal
              ? {
                  width: 4,
                  height: 14,
                  borderRadius: 8,
                }
              : {
                  width: 14,
                  height: 50,
                  borderRadius: 30,
                }),
            top: '50%',
            transform: 'translateY(-50%)',
          }),
      background: '#fff',
      border: '1px solid #E4E4E4',
      position: 'absolute',

      ...Object.keys(props).reduce((a, v) => ({ ...a, [v]: 0 }), {}),
    }}
  />
);

interface ChairWithPositionProps extends StyledComponentProps {
  minimal?: boolean;
  vertical?: boolean;
  height?: any;
  width?: any;
  top?: any;
  left?: any;
  bottom?: any;
  right?: any;
}

export const ChairWithPosition: FC<ChairWithPositionProps> = (props) => (
  <Box
    sx={{
      ...(props.height || props.width || props.left || props.right || props.top || props.bottom
        ? {}
        : {}),
      ...(props?.minimal
        ? {
            width: props.vertical ? 4 : 14,
            height: props.vertical ? 14 : 4,
            borderRadius: 8,
          }
        : {
            width: props.vertical ? 14 : 50,
            height: props.vertical ? 50 : 14,
            borderRadius: 30,
          }),
      background: '#fff',
      border: '1px solid #E4E4E4',
      position: 'absolute',

      ...props,
    }}
  />
);
