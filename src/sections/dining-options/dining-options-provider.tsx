import React, { useMemo, useState, useEffect, useCallback } from 'react';

import { DiningOptionsContext } from './dining-options-context';

type DiningOptionType = 'dine-in' | 'takeaway' | 'reservation';

export const DiningOptionsProvider = ({ children }: any) => {
  const [diningOption, setDiningOption] = useState<DiningOptionType>();

  const getDiningOption = async () => {
    try {
      const option = await localStorage.getItem('dining-option');
      setDiningOption(option as DiningOptionType);
    } catch (err) {
      setDiningOption('dine-in');
    }
  };

  useEffect(() => {
    getDiningOption();
  }, []);

  const updateDiningOption = useCallback(
    async (option: DiningOptionType) => {
      try {
        setDiningOption(option);
        await localStorage.setItem('dining-option', option);
      } catch (err) {
        console.error(err);
      }
    },
    [setDiningOption]
  );

  const providerValues = useMemo(
    () => ({
      diningOption,
      setDiningOption: updateDiningOption,
    }),
    [diningOption, updateDiningOption]
  );
  return (
    <DiningOptionsContext.Provider value={providerValues}>{children}</DiningOptionsContext.Provider>
  );
};
