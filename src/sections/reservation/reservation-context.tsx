import { useContext, createContext } from 'react';

// import { ReservationContextProps } from '../types';

// ----------------------------------------------------------------------

export const ReservationContext = createContext({} as any);

export const useReservationContext = () => {
  const context = useContext(ReservationContext);

  if (!context) throw new Error('useReservationContext must be use inside ReservationProvider');

  return context;
};
