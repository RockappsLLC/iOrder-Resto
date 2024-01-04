import { useCallback } from 'react';
import { Helmet } from 'react-helmet-async';

import { useGetOrders } from 'src/api/orders';

import { useOrderContext } from 'src/components/order-sidebar/context';

import HomeView from 'src/sections/home/view';
import TablesView from 'src/sections/tables/view';
import GuestDetail from 'src/sections/dialogs/guest-detail';
import { useReservationContext } from 'src/sections/reservation';
import NewReservation from 'src/sections/dialogs/new-reservation';
import ReservationList from 'src/sections/drawers/reservation-list';
import { useDiningOptionsContext } from 'src/sections/dining-options';

import { useHomeContext } from './home/home-context';

// ----------------------------------------------------------------------

export default function Page() {
  const { activeTab, setActiveTab } = useHomeContext();
  const { diningOption } = useDiningOptionsContext();
  const {
    reservation,
    setReservation,
    reservationTab,
    setReservationTab,
    setCreatedReservationId,
  } = useReservationContext();

  const { setShowOrderSidebar, addOrder, addMenuItem, resetMenuItems, removeOrder } =
    useOrderContext();

  const { orders, ordersLoading } = useGetOrders();

  const onTableSelect = useCallback(
    (id: string) => {
      if (diningOption === 'reservation') {
        setReservation({});
        setReservationTab('list');
        setCreatedReservationId(null);

        // here
      } else if (diningOption === 'dine-in') {
        const availableOrder = orders.find((item: any) => item.status === 1 && item.tableId === id);
        if (availableOrder) {
          setShowOrderSidebar(true);

          addMenuItem(availableOrder?.menuItems);
          addOrder(availableOrder);
        } else {
          setActiveTab('home');
          removeOrder(availableOrder);
          resetMenuItems();
        }
        setReservation(null);
      } else if (diningOption === 'takeaway') {
        setReservation(null);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [orders, diningOption]
  );

  return (
    <>
      <Helmet>
        <title> Dashboard: Home</title>
      </Helmet>

      {activeTab === 'tables' && <TablesView onTableSelect={onTableSelect} />}
      {activeTab === 'reservation' && <TablesView onTableSelect={onTableSelect} />}
      {activeTab === 'home' && <HomeView />}

      {reservation && (
        <>
          <ReservationList open={reservationTab === 'list'} />
          <NewReservation open={reservationTab === 'new'} />
          <GuestDetail open={reservationTab === 'guest'} />
        </>
      )}
    </>
  );
}
