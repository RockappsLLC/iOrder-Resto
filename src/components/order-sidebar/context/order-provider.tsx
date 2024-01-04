import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { OrderResponseSchema, MenuItemResponseSchema } from 'src/api/api-schemas';

import { OrderContext } from './order-context';

interface IOrder extends OrderResponseSchema {}

const TAX = 0.1;

export const OrderProvider = ({ children }: any) => {
  const [activeTable, setActiveTable] = useState();

  const [showOrderSideBar, setShowOrderSidebar] = useState(false);

  const [orders, setOrders] = useState<IOrder[]>([]);
  const [menuItems, setMenuItems] = useState<MenuItemResponseSchema[]>([]);
  const [ordered, setOrdered] = useState(false);
  const [orderId, setOrderId] = useState('');

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [tipAmount, setTipAmount] = useState(0);

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const [inputAmount, setInputAmount] = useState('');
  const [totalWithTip, setTotalWithTip] = useState(null);

  const [note, setNote] = useState('');

  const calculateSubTotal = useCallback(() => {
    // console.log('666', menuItems);
    return menuItems?.reduce((acc: number, currentItem: any) => {
      const price = Number(currentItem.price || 0);
      const total1 = price * Number(currentItem.count || 0);
      return acc + total1;
    }, 0);
  }, [menuItems]);

  const newSubTotal = calculateSubTotal();
  const taxTotal = Math.round(Number(newSubTotal * TAX) * 10) / 10;
  const totalPrice = newSubTotal + taxTotal;

  useEffect(() => {
    setSubTotal(newSubTotal);
    setTotal(totalPrice);
  }, [orders, calculateSubTotal, newSubTotal, totalPrice, subTotal]);

  useEffect(() => {
    setActiveTable(activeTable);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setTipAmount(tipAmount);
  }, [tipAmount, orders]);

  useEffect(() => {
    setNote(note);
  }, [note, orders]);

  useEffect(() => {
    setPaymentMethod(paymentMethod);
  }, [paymentMethod, orders]);

  useEffect(() => {
    setInputAmount(inputAmount);
  }, [inputAmount, orders]);

  useEffect(() => {
    setTotalWithTip(totalWithTip);
  }, [totalWithTip, orders]);

  useEffect(() => {
    setOrderId(orderId);
  }, [orderId, orders]);

  const addMenuItem = useCallback((menuItem: MenuItemResponseSchema) => {
    setMenuItems(menuItem as any);
  }, []);

  const removeMenuItem = useCallback(
    (id: MenuItemResponseSchema['_id']) => {
      setMenuItems(menuItems.filter((order) => order._id !== id));
    },
    [menuItems]
  );

  const updateMenuItem = useCallback(
    (id: MenuItemResponseSchema['_id'], updates: MenuItemResponseSchema) => {
      const index = menuItems.findIndex((item) => item._id === id);
      const newMenuItem = { ...menuItems[index], ...updates };
      setMenuItems([...menuItems.slice(0, index), newMenuItem, ...menuItems.slice(index + 1)]);
    },
    [menuItems]
  );

  const resetMenuItems = useCallback(() => {
    setMenuItems([]);
    setTotal(0);
    setSubTotal(0);
    setTipAmount(0);
    setInputAmount('');
  }, []);

  const addOrder = useCallback(
    (order: IOrder) => {
      setOrders([...orders, order]);
      setOrderId(order._id as any);
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

  const resetOrders = useCallback(() => {
    setOrders([]);
    setTotal(0);
    setSubTotal(0);
    setTipAmount(0);
    setInputAmount('');
  }, []);

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
      totalWithTip,
      setTotalWithTip,
      orderId,
      setOrderId,
      note,
      setNote,
      orders,
      addOrder,
      menuItems,
      addMenuItem,
      updateMenuItem,
      removeMenuItem,
      resetMenuItems,
      removeOrder,
      updateOrder,
      resetOrders,
      showOrderSideBar,
      setShowOrderSidebar,
    }),
    [
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
      totalWithTip,
      setTotalWithTip,
      orderId,
      setOrderId,
      orders,
      note,
      setNote,
      addOrder,
      menuItems,
      addMenuItem,
      updateMenuItem,
      removeMenuItem,
      resetMenuItems,
      removeOrder,
      updateOrder,
      resetOrders,
      showOrderSideBar,
      setShowOrderSidebar,
    ]
  );
  return <OrderContext.Provider value={providerValues}>{children}</OrderContext.Provider>;
};
