import { Helmet } from 'react-helmet-async';
import { useState, useEffect, useCallback } from 'react';

import { useGetOrders } from 'src/api/orders';
import { OrderResponseSchema } from 'src/api/api-schemas';

import { useOrderContext } from 'src/components/order-sidebar/context';

import HomeView from 'src/sections/home/view';
import TablesView from 'src/sections/tables/view';
import GuestDetail from 'src/sections/dialogs/guest-detail';
import { useReservationContext } from 'src/sections/reservation';
import NewReservation from 'src/sections/dialogs/new-reservation';
import ReservationList from 'src/sections/drawers/reservation-list';
import { useDiningOptionsContext } from 'src/sections/dining-options';

// ----------------------------------------------------------------------

export default function Page() {
  const [activeTab, setActiveTab] = useState<'tables' | 'reservation' | 'home'>('tables');

  const { diningOption } = useDiningOptionsContext();
  const {
    reservation,
    setReservation,
    reservationTab,
    setReservationTab,
    setCreatedReservationId,
  } = useReservationContext();

  const { activeTable, setShowOrderSidebar, setOrders, showOrderSideBar } = useOrderContext();

  console.log('showOrderSideBar', showOrderSideBar);

  useEffect(() => {
    if (diningOption === 'reservation') {
      setActiveTab('tables');
    } else if (diningOption === 'dine-in') {
      setActiveTab('tables');
    } else if (diningOption === 'takeaway') {
      setActiveTab('home');
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [diningOption]);

  const { orders, ordersLoading } = useGetOrders();

  const [ordersData, setOrdersData] = useState<OrderResponseSchema[]>([]);

  useEffect(() => {
    if (!ordersLoading && orders.length) {
      setOrdersData(orders);
    }
  }, [ordersLoading, orders]);

  const availableOrder = ordersData.filter(
    (item: any) => item.status === 1 && item.tableId === activeTable?._id
  );

  const onTableSelect = useCallback(() => {
    if (diningOption === 'reservation') {
      setReservation({});
      setReservationTab('list');
      setCreatedReservationId(null);

      // here
    } else if (diningOption === 'dine-in') {
      if (true) {
        setShowOrderSidebar(true);
        // setOrders(availableOrder);
      } else {
        setActiveTab('home');
      }
      setReservation(null);
    } else if (diningOption === 'takeaway') {
      setReservation(null);
    }
  }, [
    diningOption,
    setReservation,
    setReservationTab,
    setCreatedReservationId,
    setShowOrderSidebar,
  ]);

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
