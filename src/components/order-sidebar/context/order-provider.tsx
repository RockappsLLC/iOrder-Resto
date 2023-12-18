import React, { useMemo, useState, useCallback } from 'react';

import { OrderResponseSchema } from 'src/api/api-schemas';

import { OrderContext } from './order-context';

interface IOrder extends OrderResponseSchema {}

export const OrderProvider = ({ children }: any) => {
  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordered, setOrdered] = useState(false);

  const addOrder = useCallback(
    (order: IOrder) => {
      setOrders([...orders, order]);
    },
    [orders]
  );

  const removeOrder = useCallback(
    (id: IOrder['_id']) => {
      setOrders(orders.filter((order) => order._id !== id));
    },
    [orders]
  );

  const updateOrder = useCallback(
    (id: IOrder['_id'], updates: IOrder) => {
      // console.log({ id, orders, updates });
      const index = orders.findIndex((order) => order._id === id);
      const newOrder = { ...orders[index], ...updates };
      setOrders([...orders.slice(0, index), newOrder, ...orders.slice(index + 1)]);
    },
    [orders]
  );

  const providerValues = useMemo(
    () => ({ ordered, setOrdered, orders, addOrder, removeOrder, updateOrder }),
    [ordered, setOrdered, orders, addOrder, removeOrder, updateOrder]
  );
  return <OrderContext.Provider value={providerValues}>{children}</OrderContext.Provider>;
};
