import React, { useMemo, useState } from 'react';

import { ReservationContext } from './reservation-context';

export const ReservationProvider = ({ children }: any) => {
  const [reservation, setReservation] = useState();
  const [reservationTab, setReservationTab] = useState<null | 'list' | 'new' | 'guest'>();

  const providerValues = useMemo(
    () => ({
      reservation,
      setReservation,
      reservationTab,
      setReservationTab,
    }),
    [reservation, setReservation, reservationTab, setReservationTab]
  );
  return (
    <ReservationContext.Provider value={providerValues}>{children}</ReservationContext.Provider>
  );
};
