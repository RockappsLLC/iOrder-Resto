import { useContext, createContext } from 'react';

// import { OrderContextProps } from '../types';

// ----------------------------------------------------------------------

export const OrderContext = createContext({} as any);

export const useOrderContext = () => {
  const context = useContext(OrderContext);

  if (!context) throw new Error('useOrderContext must be use inside OrderProvider');

  return context;
};
