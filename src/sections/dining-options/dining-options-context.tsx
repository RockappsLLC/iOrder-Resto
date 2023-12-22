import { useContext, createContext } from 'react';

// import { DiningOptionsContextProps } from '../types';

// ----------------------------------------------------------------------

export const DiningOptionsContext = createContext({} as any);

export const useDiningOptionsContext = () => {
  const context = useContext(DiningOptionsContext);

  if (!context) throw new Error('useDiningOptionsContext must be use inside DiningOptionsProvider');

  return context;
};
