import React, { useMemo, useState, useEffect } from 'react';

import { useDiningOptionsContext } from 'src/sections/dining-options';

import { HomeContext } from './home-context';

type OptionType = 'tables' | 'reservation' | 'home';

export const HomeProvider = ({ children }: any) => {
  const [activeTab, setActiveTab] = useState<OptionType>('tables');

  const { diningOption } = useDiningOptionsContext();

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

  const providerValues = useMemo(
    () => ({
      activeTab,
      setActiveTab,
    }),
    [activeTab, setActiveTab]
  );
  return <HomeContext.Provider value={providerValues}>{children}</HomeContext.Provider>;
};
