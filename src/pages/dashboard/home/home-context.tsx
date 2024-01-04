import { useContext, createContext } from 'react';

// ----------------------------------------------------------------------

export const HomeContext = createContext({} as any);

export const useHomeContext = () => {
  const context = useContext(HomeContext);

  if (!context) throw new Error('useHomeContext must be use inside HomeProvider');

  return context;
};
