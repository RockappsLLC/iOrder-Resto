import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { OrderResponseSchema } from 'src/api/api-schemas';

import { OrderContext } from './order-context';

interface IOrder extends OrderResponseSchema {}
const TAX = 0.1;

export const OrderProvider = ({ children }: any) => {
  const [activeTable, setActiveTable] = useState(null);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [ordered, setOrdered] = useState(false);

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [inputAmount, setInputAmount] = useState('');

  const calculateSubTotal = useCallback(() => {
    return orders.reduce((acc: number, currentItem: any) => {
      const price = Number(currentItem.price || 0);
      const total1 = price * Number(currentItem.count || 0);
      return acc + total1;
    }, 0);
  }, [orders]);

  const newSubTotal = calculateSubTotal();
  const taxTotal = Math.round(Number(newSubTotal * TAX) * 10) / 10;
  const totalPrice = newSubTotal + taxTotal;

  useEffect(() => {
    setSubTotal(newSubTotal);
    setTotal(totalPrice);
  }, [orders, calculateSubTotal, newSubTotal, totalPrice, subTotal]);

  useEffect(() => {
    setTipAmount(tipAmount);
  }, [tipAmount, orders]);

  useEffect(() => {
    setPaymentMethod(paymentMethod);
  }, [paymentMethod, orders]);

  useEffect(() => {
    setInputAmount(inputAmount);
  }, [inputAmount, orders]);

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
    () => ({
      activeTable,
      setActiveTable,
      ordered,
      setOrdered,
      total,
      setTotal,
      subTotal,
      setSubTotal,
      tipAmount,
      setTipAmount,
      paymentMethod,
      setPaymentMethod,
      inputAmount,
      setInputAmount,
      orders,
      addOrder,
      removeOrder,
      updateOrder,
    }),
    [
      activeTable,
      setActiveTable,
      ordered,
      setOrdered,
      orders,
      total,
      setTotal,
      subTotal,
      setSubTotal,
      tipAmount,
      setTipAmount,
      paymentMethod,
      setPaymentMethod,
      inputAmount,
      setInputAmount,
      addOrder,
      removeOrder,
      updateOrder,
    ]
  );
  return <OrderContext.Provider value={providerValues}>{children}</OrderContext.Provider>;
};
