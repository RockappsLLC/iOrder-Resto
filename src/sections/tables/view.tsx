import { useForm } from 'react-hook-form';
import { m, useDragControls } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import { Tab, Tabs } from '@mui/material-next';
import { alpha, useTheme } from '@mui/material/styles';
import { Grid, Stack, Button, InputBase, Typography, InputAdornment } from '@mui/material';

import { useTranslate } from 'src/locales';
import { useGetTables } from 'src/api/tables';
import { useGetFloors } from 'src/api/floors';
import { TableResponseSchema } from 'src/api/api-schemas';

import Iconify from 'src/components/iconify';
import { useSettingsContext } from 'src/components/settings';
import RunningOrders from 'src/components/drawers/running-orders';
import OrderSidebar from 'src/components/order-sidebar/order-sidebar';
import { useOrderContext } from 'src/components/order-sidebar/context';

import { Node, getTableByType } from './table-variants';
import { useDiningOptionsContext } from '../dining-options';
// ----------------------------------------------------------------------
// available - available
// reserved - reserved
// billed - occupied
// available soon - paid

const MIN_HEIGHT = 1000;
const MIN_WIDTH = 2000;
const FILTERS = [
  { label: 'Available', name: 'available', value: 0, color: '#3395F0', border: '#e0eefc' },
  { label: 'Reserved', name: 'reserved', value: 1, color: '#F15F34', border: '#ffe9de' },
  { label: 'Occupied', name: 'occupied', value: 2, color: '#13C91B', border: '#e1f7de' },
  // {
  //   label: 'Paid',
  //   name: 'paid',
  //   value: 3,
  //   color: '#F0B433',
  //   border: '#fdf3e1',
  // },
];

function a11yProps(index: number, id: string = '') {
  return {
    id,
    'aria-controls': `simple-tabpanel-${index}`,
    style: { paddingLeft: 10, paddingRight: 10, minHeight: 35 },
  };
}

export default function TablesView({ onTableSelect }: any) {
  const { t } = useTranslate();
  const theme = useTheme();

  const restaurantId = localStorage.getItem('restaurantId') || '';

  const [openRuningOrders, setOpenRunningOrders] = useState(false);

  const [activeFloor, setActiveFloor] = useState({ index: 0, id: null });
  const { floors, floorsLoading } = useGetFloors({ restaurantId });

  const [sortedFloors, setSortedFloors] = useState<any[]>([]);
  useEffect(() => {
    if (!floorsLoading && floors.length) {
      // @ts-ignore
      setSortedFloors(floors.sort((a, b) => a?.name?.localeCompare?.(b?.name)));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [floorsLoading]);

  const [selectedFilter, setSelectedFilter] = useState<'all' | 'reservation' | 'running-orders'>(
    'all'
  );
  const [searchInput, setSearchInput] = useState();
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
  const { diningOption } = useDiningOptionsContext();
  const { activeTable, setActiveTable, showOrderSideBar } = useOrderContext();

  const { tables, tablesLoading, tablesValidating } = useGetTables({
    floorId: activeFloor.id as any,
  });

  const [nodes, setNodes] = useState<Node[]>([]);

  const settings = useSettingsContext();
  const controls = useDragControls();

  const renderNodesDefault = (_tables: any) => {
    if (allowSave) setAllowSave(false);

    const filteredTables = activeFloor.id
      ? _tables
      : _tables.filter((table: any) => !table.floorId);

    setNodes(filteredTables);
    const positionX =
      Math.max.apply(
        null,
        _tables.map(function (o: any) {
          return o.positionX || 0;
        })
      ) + 100;
    const positionY =
      Math.max.apply(
        null,
        _tables.map(function (o: any) {
          return o.positionY || 0;
        })
      ) + 100;
    const newHeight = positionY > MIN_HEIGHT ? positionY : MIN_HEIGHT;
    const newWidth = positionX > MIN_WIDTH ? positionX : MIN_WIDTH;
    setValue('height', newHeight);
    setValue('width', newWidth);
  };
  useEffect(() => {
    if (!tablesLoading && !tablesValidating && tables.length) {
      renderNodesDefault(tables);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tablesLoading, tablesValidating, activeFloor.id]);

  useEffect(() => {
    const filteredTables = tables.filter((table) => {
      if (selectedFilter === 'all') {
        return true;
      }
      if (selectedFilter === 'reservation') {
        return table.status === 1;
      }
      if (selectedFilter === 'running-orders') {
        return table.status === 2;
      }
      return true;
    });
    renderNodesDefault(filteredTables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedFilter]);

  useEffect(() => {
    const filteredTables = tables.filter((table) => {
      if (table.name?.toLocaleLowerCase().includes((searchInput || '').toLocaleLowerCase())) {
        return true;
      }
      return false;
    });
    renderNodesDefault(filteredTables);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchInput]);

  const handleClick = (table: TableResponseSchema) => {
    onTableSelect(table._id);
    setActiveTable(table);
  };

  return (
    <Grid maxWidth="100%">
      {/* <Container maxWidth={settings.themeStretch ? false : 'xl'} sx={{ p: 0 }}> */}
      <Stack direction="row">
        <Stack
          sx={{
            height: '100%',
            overflowX: 'auto',
          }}
        >
          <Typography
            fontWeight={500}
            color="#F15F34"
            padding="10px"
            paddingLeft={3}
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              py: 0,
              alignItems: 'center',
              borderTop: 1,
              borderColor: '#E4E4E4',
              borderBottomColor: '#E4E4E4!important',
              borderBottom: 1,
              width: '100%',
              height: 44,
            }}
          >
            {t('dashboard')}
          </Typography>
          <Box
            fontWeight={500}
            color="#F15F34"
            padding="10px"
            paddingLeft={3}
            sx={{
              backgroundColor: '#fff',
              display: 'flex',
              py: 0,
              alignItems: 'center',
              borderTop: 1,
              borderColor: '#E4E4E4',
              borderBottomColor: '#E4E4E4!important',
              borderBottom: 1,
              width: '100%',
              height: 68,
              position: 'relative',
              maxWidth: '100%',
              overflowY: 'auto',
            }}
          >
            {FILTERS.map((filter, index) => (
              <Box key={index} display="flex" alignItems="center" sx={{ mr: 4 }}>
                <Box
                  sx={{
                    backgroundColor: filter.color,
                    height: 20,
                    width: 20,
                    borderRadius: '50%',
                    mr: 1,
                    border: `5px solid ${filter.border}`,
                  }}
                />
                <Typography color={theme.palette.primary.dark}>{filter.label}</Typography>
              </Box>
            ))}
            <Box display="flex">
              <Box display="flex" gap={2} mr={3}>
                <Button
                  fullWidth
                  onClick={() => setSelectedFilter('all')}
                  color="primary"
                  variant={selectedFilter === 'all' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '58px',
                    p: '2px',
                    width: 150,
                    ':hover': { bgcolor: '#fdf3f0', color: '#e06842', borderColor: '#e06842' },
                  }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    All Tables
                  </Typography>
                </Button>
                <Button
                  fullWidth
                  onClick={() => setSelectedFilter('reservation')}
                  color="primary"
                  variant={selectedFilter === 'reservation' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '58px',
                    p: '2px',
                    width: 150,
                    ':hover': { bgcolor: '#fdf3f0', color: '#e06842', borderColor: '#e06842' },
                  }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    Reservation
                  </Typography>
                </Button>
                <Button
                  fullWidth
                  onClick={() => setOpenRunningOrders(true)}
                  color="primary"
                  variant={selectedFilter === 'running-orders' ? 'contained' : 'outlined'}
                  sx={{
                    borderRadius: '58px',
                    p: '2px',
                    width: 150,
                    ':hover': { bgcolor: '#fdf3f0', color: '#e06842', borderColor: '#e06842' },
                  }}
                >
                  <Typography fontSize={14} fontWeight={600}>
                    Running Orders
                  </Typography>
                </Button>
              </Box>
              <InputBase
                fullWidth
                autoFocus
                sx={{ borderLeft: '2px solid #E4E4E4', paddingLeft: 2 }}
                placeholder="Search tables..."
                value={searchInput}
                onChange={(e: any) => setSearchInput(e.target.value)}
                startAdornment={
                  <InputAdornment position="start">
                    <Iconify icon="eva:search-fill" width={26} sx={{ color: 'text.disabled' }} />
                  </InputAdornment>
                }
                inputProps={{
                  sx: { fontSize: '16px', width: 500 },
                }}
              />
            </Box>
          </Box>
          <Box sx={{ position: 'relative' }}>
            <RunningOrders
              isBoxOpen={openRuningOrders}
              onHideBox={() => setOpenRunningOrders(false)}
            />
          </Box>
          <Box
            sx={{
              mt: 0,
              width: watch('width'),
              maxWidth: '100%',
              overflow: 'scroll',
              p: 3,
              borderRadius: 2,
              bgcolor: (theme) => alpha(theme.palette.grey[500], 0.04),
              border: (theme) => `dashed 1px ${theme.palette.divider}`,
              position: 'relative',
            }}
          >
            <Box
              sx={{
                borderBottom: 1,
                borderColor: 'divider',
                position: 'absolute',
                top: 0,
                left: 0,
                zIndex: 2,
                height: 35,
              }}
            >
              <Tabs
                value={activeFloor.index}
                onChange={(i, j) => {
                  // console.log(i.target);
                  // @ts-ignore
                  setActiveFloor({ index: j, id: i.target.id });
                }}
                aria-label="tabs"
              >
                <Tab label="Default" {...a11yProps(0, '')} />
                {sortedFloors.map((floor, i) => (
                  <Tab label={floor.name} {...a11yProps(i + 1, floor._id)} />
                ))}
              </Tabs>
            </Box>
            <m.div
              ref={constraintsRef}
              style={{ width: watch('width'), height: watch('height'), position: 'relative' }}
              dragControls={controls}
              onClick={() => setActiveNodes({})}
            >
              {!tablesLoading &&
                nodes.map((node, i) => (
                  <m.div
                    key={Math.random()}
                    style={{
                      position: 'absolute',
                      top: node.positionY || 0,
                      left: node.positionX || 0,
                      cursor: 'pointer',
                      // height: getTableSizeByType(type),
                      //   width: getTableSizeByType(node.height),
                      borderRadius: 20,
                      ...(node.removed ? { display: 'none' } : {}),
                      zIndex: activeNodes[node?._id || ''] ? '123' : '',
                      backgroundColor: activeNodes[node?._id || '']
                        ? 'rgba(0,0,0,0.05)'
                        : 'transparent',
                    }}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleClick(node);
                      // setActiveNodes(() => (node._id ? { [node._id]: true } : {}));
                    }}
                  >
                    {getTableByType(
                      node.type,
                      false,
                      node.name,
                      node.status !== 0
                        ? {
                            backgroundColor:
                              FILTERS.find((a) => a.value === node.status)?.border || 'inherit',
                          }
                        : {}
                    )}
                  </m.div>
                ))}
            </m.div>
          </Box>
        </Stack>

        {showOrderSideBar && !openRuningOrders && (
          <Stack direction="column" width="60%" height="50%">
            <OrderSidebar showOrderMore showPayNow showPlaceOrder={false} />
          </Stack>
        )}
      </Stack>
    </Grid>
  );
}
