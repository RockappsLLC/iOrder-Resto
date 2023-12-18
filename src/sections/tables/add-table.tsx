import { FC, useState } from 'react';

import { Box, Button, Popover, Typography } from '@mui/material';

import { Node, getTableByType } from './table-variants';

interface NodeVariant extends Omit<Node, 'positionX' | 'positionY' | '_id' | 'name'> {
  title: string;
}

const tables: Array<{ text: string } | NodeVariant> = [
  {
    text: 'Square',
  },
  {
    type: 'square-table-of-two-vertical',
    title: 'Square Table of 2 (Vertical)',
  },
  {
    type: 'square-table-of-two-horizontal',
    title: 'Square Table of 2 (Horizontal)',
  },
  {
    type: 'square-table-of-four',
    title: 'Square Table of 4',
  },
  {
    text: 'Circle',
  },
  {
    type: 'circle-table-of-two-vertical',
    title: 'Circle Table of 2 (Vertical)',
  },
  {
    type: 'circle-table-of-two-horizontal',
    title: 'Circle Table of 2 (Horizontal)',
  },
  {
    type: 'circle-table-of-four',
    title: 'Circle Table of 4',
  },
  {
    text: 'Rectangle',
  },
  {
    type: 'rectangle-table-of-six-vertical',
    title: 'Rectangle Table of 6 (Vertical)',
  },
  {
    type: 'rectangle-table-of-six-horizontal',
    title: 'Rectangle Table of 6 (Horizontal)',
  },
  {
    type: 'rectangle-table-of-eight-vertical',
    title: 'Rectangle Table of 8 (Vertical)',
  },
  {
    type: 'rectangle-table-of-eight-horizontal',
    title: 'Rectangle Table of 8 (Horizontal)',
  },
  {
    type: 'rectangle-table-of-twelve-vertical',
    title: 'Rectangle Table of 12 (Vertical)',
  },
  {
    type: 'rectangle-table-of-twelve-horizontal',
    title: 'Rectangle Table of 12 (Horizontal)',
  },
];

const TableVariants = ({ positionX, positionY, onPress }) => {
  return (
    <Box sx={{ minWidth: 300, width: 300 }}>
      {tables.map((table) => {
        if ('text' in table) {
          return <Typography variant="subtitle2">{table.text}</Typography>;
        }
        return (
          <Button
            onClick={() =>
              onPress({
                _id: String(Math.random()),
                positionX,
                positionY,
                ...table,
              })
            }
            pt={1}
            pb={1}
            px={1.5}
            display="flex"
            alignItems="center"
            fullWidth
          >
            {getTableByType(table.type, true)}

            <Typography pl={1.5} variant="caption" mr="auto">
              {table.title}
            </Typography>
          </Button>
        );
      })}

      {/* <Button
        pt={1}
        pb={1}
        px={1.5}
        display="flex"
        alignItems="center"
        //   fullWidth
        onClick={() =>
          onAdd({
            id: Math.random(),
            content: <T02 />,
            position,
            width: 170,
            height: 170,
          })
        }
        fullWidth
      >
        <T02 minimal />
        <Typography pl={1.5} variant="caption" mr="auto">
          Square Table of 4
        </Typography>
      </Button> */}
    </Box>
  );
};

interface AddTableProps {
  onAdd: (node: Node) => void;
  horizontalPosition: number;
  verticalPosition: number;
}

export const AddTable: FC<AddTableProps> = ({ onAdd, horizontalPosition, verticalPosition }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  //   const position = {
  //     x: ,
  //     y: verticalPosition,
  //   };

  return (
    <>
      <Button
        color="primary"
        aria-describedby={id}
        variant="contained"
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          height: 50,
          width: 50,
          minWidth: 40,
          padding: 0,
          fontSize: 16,
          borderRadius: '50%',
        }}
      >
        +
      </Button>
      <Popover
        id={id}
        open={open}
        onClose={handleClose}
        // anchorReference="anchorPosition"
        anchorEl={anchorEl}
        // anchorPosition={{ bottom: 70, right: 70 }}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        // sx={{
        //   minWidth: 800,
        //   maxWidth: 800,
        //   width: 800,
        // }}
        // style={{
        //   width: 600,
        // }}
      >
        <TableVariants
          positionX={horizontalPosition + 20}
          positionY={verticalPosition}
          onPress={onAdd}
        />
      </Popover>
    </>
  );
};
