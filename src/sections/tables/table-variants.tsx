import { Box } from '@mui/material';

import { TableResponseSchema } from 'src/api/api-schemas';

import { Table, TableCircle } from './tables';
import { Chair, ChairWithPosition } from './chair';

export interface Node extends TableResponseSchema {
  new?: boolean;
  updated?: boolean;
  removed?: boolean;
}

export const Circle = ({
  top = true,
  bottom = true,
  left = true,
  right = true,
  minimal,
  name,
  ...props
}: any) => (
  <Box
    sx={{
      position: 'relative',
      ...(minimal ? { height: 40, width: 40 } : { height: 170, width: 170 }),
    }}
  >
    {Boolean(top) && <Chair top minimal={minimal} />}
    {Boolean(bottom) && <Chair bottom minimal={minimal} />}
    {Boolean(left) && <Chair left minimal={minimal} />}
    {Boolean(right) && <Chair right minimal={minimal} />}
    <TableCircle {...props} name={name} minimal={minimal} />
  </Box>
);
export const Square = ({
  top = true,
  bottom = true,
  left = true,
  right = true,
  minimal,
  name,
  ...props
}: any) => (
  <Box
    sx={{
      position: 'relative',
      ...(minimal ? { height: 40, width: 40 } : { height: 170, width: 170 }),
    }}
  >
    {Boolean(top) && <Chair top minimal={minimal} />}
    {Boolean(bottom) && <Chair bottom minimal={minimal} />}
    {Boolean(left) && <Chair left minimal={minimal} />}
    {Boolean(right) && <Chair right minimal={minimal} />}
    <Table {...props} name={name} minimal={minimal} />
  </Box>
);

export const Rectangle = ({ chairs, vertical, minimal, name, ...props }: any) => {
  const chairsCount = (chairs - 2) / 2;
  // console.log(
  //   Number(chairsCount * 62) + Number(20 * 2) + Number(8 * 2),
  //   chairsCount,
  //   minimal
  //     ? {
  //         height: vertical ? Number(chairsCount * 20) + 40 : 40,
  //         width: vertical ? 40 : Number(chairsCount * 20) + 40,
  //       }
  //     : {
  //         height: vertical ? Number(chairsCount * 50) + 170 : 170,
  //         width: vertical ? 170 : Number(chairsCount * 62) + Number(8 * 2),
  //       }
  // );
  const chairSize = minimal ? 14 : 50;
  const chairThickness = minimal ? 4 : 14;
  const chairPadding = minimal ? 2 : 4;
  const spacingSize = minimal ? 4 : 20;
  const sideChairPadding = minimal ? 8 : 20;

  let boxWidth;
  let boxHeight;

  let tableWidth;
  let tableHeight;
  if (minimal) {
    tableWidth = vertical
      ? 40 - Number(spacingSize * 2)
      : Number(chairsCount * Number(chairSize + chairPadding)) + Number(sideChairPadding * 2);
    tableHeight = vertical
      ? Number(chairsCount * Number(chairSize + chairPadding)) + Number(sideChairPadding * 2)
      : 40 - Number(spacingSize * 2);

    boxWidth = vertical ? 40 : tableWidth + Number(spacingSize * 2);
    boxHeight = vertical ? tableHeight + Number(spacingSize * 2) : 40;
  } else {
    tableWidth = vertical
      ? 170 - Number(spacingSize * 2)
      : Number(chairsCount * Number(chairSize + chairPadding)) + Number(sideChairPadding * 2);
    tableHeight = vertical
      ? Number(chairsCount * Number(chairSize + chairPadding)) + Number(sideChairPadding * 2)
      : 170 - Number(spacingSize * 2);

    boxWidth = vertical ? 170 : tableWidth + Number(spacingSize * 2);
    boxHeight = vertical ? tableHeight + Number(spacingSize * 2) : 170;
  }
  return (
    <Box
      sx={{
        position: 'relative',
        width: boxWidth,
        height: boxHeight,
        minWidth: boxWidth,
      }}
    >
      {vertical
        ? Array(chairsCount)
            .fill(0)
            .map((a, i) => (
              <ChairWithPosition
                minimal={minimal}
                height={chairSize}
                width={chairThickness}
                top={
                  spacingSize +
                  sideChairPadding +
                  Number(chairPadding / 2) +
                  Number(i * chairSize) +
                  Number(chairPadding * i)
                }
                left={0}
                vertical
              />
            ))
        : Array(chairsCount)
            .fill(0)
            .map((a, i) => (
              <ChairWithPosition
                minimal={minimal}
                height={chairThickness}
                width={chairSize}
                top={0}
                left={
                  spacingSize +
                  sideChairPadding +
                  Number(chairPadding / 2) +
                  Number(i * chairSize) +
                  Number(chairPadding * i)
                }
              />
            ))}

      {vertical
        ? Array(chairsCount)
            .fill(0)
            .map((a, i) => (
              <ChairWithPosition
                minimal={minimal}
                height={chairSize}
                width={chairThickness}
                top={
                  spacingSize +
                  sideChairPadding +
                  Number(chairPadding / 2) +
                  Number(i * chairSize) +
                  Number(chairPadding * i)
                }
                right={0}
                vertical
              />
            ))
        : Array(chairsCount)
            .fill(0)
            .map((a, i) => (
              <ChairWithPosition
                minimal={minimal}
                height={chairThickness}
                width={chairSize}
                bottom={0}
                left={
                  spacingSize +
                  sideChairPadding +
                  Number(chairPadding / 2) +
                  Number(i * chairSize) +
                  Number(chairPadding * i)
                }
              />
            ))}
      {vertical ? (
        <>
          <Chair top minimal={minimal} />
          <Chair bottom minimal={minimal} />
        </>
      ) : (
        <>
          <Chair left minimal={minimal} />
          <Chair right minimal={minimal} />
        </>
      )}
      {/* {Boolean(top) && <Chair top minimal={minimal} />}
        {Boolean(bottom) && <Chair bottom minimal={minimal} />}
        {Boolean(left) && <Chair left minimal={minimal} />}
        {Boolean(right) && <Chair right minimal={minimal} />} */}
      <Table {...props} name={name} minimal={minimal} width={tableWidth} height={tableHeight} />
    </Box>
  );
};

export const getTableByType = (
  type: string | undefined,
  minimal: boolean,
  name: string = '',
  props?: any
) => {
  switch (type) {
    case 'square-table-of-two-vertical':
      return <Square name={name} minimal={minimal} left={false} right={false} {...props} />;
    case 'square-table-of-two-horizontal':
      return <Square name={name} minimal={minimal} top={false} bottom={false} {...props} />;
    case 'square-table-of-four':
      return <Square name={name} minimal={minimal} {...props} />;
    case 'circle-table-of-two-vertical':
      return <Circle name={name} minimal={minimal} left={false} right={false} {...props} />;
    case 'circle-table-of-two-horizontal':
      return <Circle name={name} minimal={minimal} top={false} bottom={false} {...props} />;
    case 'circle-table-of-four':
      return <Circle name={name} minimal={minimal} {...props} />;
    case 'rectangle-table-of-six-vertical':
      return <Rectangle name={name} minimal={minimal} chairs={6} vertical {...props} />;
    case 'rectangle-table-of-six-horizontal':
      return <Rectangle name={name} minimal={minimal} chairs={6} {...props} />;
    case 'rectangle-table-of-eight-vertical':
      return <Rectangle name={name} minimal={minimal} chairs={8} vertical {...props} />;
    case 'rectangle-table-of-eight-horizontal':
      return <Rectangle name={name} minimal={minimal} chairs={8} {...props} />;
    case 'rectangle-table-of-ten-vertical':
      return <Rectangle name={name} minimal={minimal} chairs={10} vertical {...props} />;
    case 'rectangle-table-of-ten-horizontal':
      return <Rectangle name={name} minimal={minimal} chairs={10} {...props} />;
    case 'rectangle-table-of-twelve-vertical':
      return <Rectangle name={name} minimal={minimal} chairs={12} vertical {...props} />;
    case 'rectangle-table-of-twelve-horizontal':
      return <Rectangle name={name} minimal={minimal} chairs={12} {...props} />;
    default:
      // return <Rectangle name={name} minimal={minimal} chairs={12} vertical />;
      return (
        <Square
          name="Invalid Table"
          left={false}
          top={false}
          bottom={false}
          right={false}
          {...props}
        />
      );
  }
};
