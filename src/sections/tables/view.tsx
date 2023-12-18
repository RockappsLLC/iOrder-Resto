import { useForm } from 'react-hook-form';
import { m, useDragControls } from 'framer-motion';
import { useRef, useState, useCallback, useEffect } from 'react';

import Box from '@mui/material/Box';
import { alpha } from '@mui/material/styles';
import Container from '@mui/material/Container';

import Iconify from 'src/components/iconify';
import { RHFTextField } from 'src/components/hook-form';
import { useSettingsContext } from 'src/components/settings';
import FormProvider from 'src/components/hook-form/form-provider';

import { AddTable } from './add-table';
import { Node, getTableByType } from './table-variants';
import { useGetTables } from 'src/api/tables';
import { Button } from '@mui/material';

// ----------------------------------------------------------------------

const MIN_HEIGHT = 1000;
const MIN_WIDTH = 2000;

export default function TablesView() {
  const constraintsRef = useRef(null);
  const methods = useForm({
    defaultValues: {
          height: MIN_HEIGHT,
          width: MIN_WIDTH,
    },
  });
    const [allowSave, setAllowSave] = useState(false);
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: { isSubmitting, isValid },
  } = methods;
    const [activeNodes, setActiveNodes] = useState<{ [key: string]: boolean }>({});
    
    const { tables, tablesLoading } = useGetTables()
    console.log(tables);
  const [nodes, setNodes] = useState<Node[]>([
    {
      _id: "1",
      name: '1',
          type: 'square-table-of-four',
      positionX: 0,
      positionY: 0,
      height: 170,
      width: 170,
    },
    // {
    //   id: 2,
    //   name: '2',
    //   type: 'circle-table-of-four',
    //   position: {
    //     x: 200,
    //     y: 0,
    //   },
    //   height: 170,
    //   width: 170,
    // },
    // {
    //   id: 3,
    //   name: '3',
    //   type: 'square-table-of-two-vertical',
    //   position: {
    //     x: 400,
    //     y: 0,
    //   },
    //   height: 170,
    //   width: 170,
    // },
    // {
    //   id: 4,
    //   name: '4',
    //   type: 'square-table-of-two-horizontal',
    //   position: {
    //     x: 600,
    //     y: 0,
    //   },
    //   height: 170,
    //   width: 170,
    // },
  ]);
  const settings = useSettingsContext();
    const controls = useDragControls();

    const renderNodesDefault = () => {
        if(allowSave) setAllowSave(false)
        setNodes(tables)
        const positionX = Math.max.apply(null, tables.map(function (o) { return o.positionX || 0; })) + 100;
        const positionY = Math.max.apply(null, tables.map(function (o) { return o.positionY || 0; })) + 100;

        const newHeight = positionY > MIN_HEIGHT ? positionY : MIN_HEIGHT;
        const newWidth = positionX > MIN_WIDTH ? positionX : MIN_WIDTH;

        setValue('height', newHeight);
        setValue('width', newWidth);
    }
    
    useEffect(() => {
        if (!tablesLoading && tables.length) {
            renderNodesDefault()
        }
    },[tablesLoading])

  const handleDragEnd = (position: any, id: string | undefined) => {
    const updatedNodes = nodes.map((node) => {
      if (node._id === id) {
        let x = Number(node.positionX || 0) + position.offset.x;
        if (x < 0) x = 0;
        let y = Number(node.positionY || 0) + position.offset.y;
        if (y < 0) y = 0;
          setAllowSave(true);
        return { ...node, positionX: x, positionY: y, updated: true };
      }
      return node;
    });
      console.log(updatedNodes);
    setNodes(updatedNodes);
  };
  const handleAdd = useCallback(
    (node: any) => {
          setNodes((_nodes) => [..._nodes, { ...node, new: true }]);
          setAllowSave(true);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [nodes]
  );

  const handleRemoveNode = (id: string | undefined) => {
    const updatedNodes = nodes.map((node) => node._id !== id ? node : ({...node, removed:true}));
    setNodes(updatedNodes);
  };
    
    const handleUpdateNode = () => {

    };
  //   const handleFocusNode = (id: string | number) => {
  //     const updatedNodes = nodes.map((node) => {
  //       if (node.id === id) {
  //         return { ...node, active: true };
  //       }
  //       return node;
  //     });
  //     setNodes(updatedNodes);
  //   };

  const lastNode = nodes[nodes.length - 1];
  // console.log('nodes',nodes)
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ p: 0 }}>
      {/* <FormProvider methods={methods}>
        <Box display="flex" flexDirection="row">
          <RHFTextField name="height" label="Height" type="number" />
          <RHFTextField name="width" label="Width" type="number" />
        </Box>
          </FormProvider> */}
          <Box display="flex" sx={{justifyContent:'flex-end', mt:5}}>
              <Button disabled={!allowSave} variant={allowSave ? "contained" : 'text'} color={allowSave ? "primary" : "inherit"} sx={{ mr: 1, fontWeight: 400 }}>
                  {allowSave ? 'Save' : "Up to date!"}
              </Button>

              <Button color="primary" sx={{fontWeight:400}} onClick={renderNodesDefault}>
                 Reset
              </Button>
          </Box>
         
      {/* <Typography variant="h4"> Page Tables </Typography> */}
      <Box
        sx={{
                  //   mt: 5,
                    mt: 0,
          // width: 1,
          // height: 320,
          width: watch('width'),
          maxWidth: '100vw',
          overflow: 'scroll',
          p: 3,
          borderRadius: 2,
          bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
          border: (theme) => `dashed 1px ${theme.palette.divider}`,
        }}
          >
              
        <m.div
          ref={constraintsRef}
          style={{ width: watch('width'), height: watch('height'), position: 'relative' }}
          dragControls={controls}
          onClick={() => setActiveNodes({})}
        >
          {!tablesLoading && nodes.map((node, i) => (
            <m.div
              key={Math.random()}
              drag
              dragConstraints={constraintsRef}
              style={{
                position: 'absolute',
                top: node.positionY||0,
                  left: node.positionX || 0,
                
                // height: getTableSizeByType(type),
                //   width: getTableSizeByType(node.height),
                  borderRadius:20,
                  ...(node.removed ? { display: "none" } : {}),
                  zIndex: activeNodes[node?._id || ""] ? "123" : "",
                  backgroundColor: activeNodes[node?._id || ""] ? 'rgba(0,0,0,0.05)': 'transparent'
              }}
              dragMomentum={false}
              onDragEnd={(e, position) => handleDragEnd(position, node._id)}
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                setActiveNodes(() => node._id ?({ [node._id]: true }):{});
              }}
            >
              {getTableByType(node.type, false, node.name)}
              {node._id && activeNodes[node._id] && (
                <>
                  <Iconify
                    icon="solar:close-circle-bold"
                    sx={{ position: 'absolute', right: 0, top: 0, cursor: 'pointer' }}
                    onClick={() => handleUpdateNode(node._id)}
                  />
                  <Iconify
                    icon="dashicons:update-alt"
                    sx={{ position: 'absolute', right: 0, top: 20, cursor: 'pointer' }}
                    onClick={() => handleRemoveNode(node._id)}
                  />
                </>
              )}
            </m.div>
          ))}
        </m.div>
      </Box>
      <AddTable
        onAdd={handleAdd}
        horizontalPosition={Number(lastNode.positionX || 0) + Number(lastNode.width || 240)}
        verticalPosition={Number(lastNode.positionY || 0)}
      />
    </Container>
  );
}
