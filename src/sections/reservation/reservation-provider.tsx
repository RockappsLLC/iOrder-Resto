import React, { useMemo, useState } from 'react';

import { ReservationContext } from './reservation-context';

export const ReservationProvider = ({ children }: any) => {
  const [reservation, setReservation] = useState();
  const [createdReservationId, setCreatedReservationId] = useState();
  const [reservationTab, setReservationTab] = useState<null | 'list' | 'new' | 'guest'>();

  const providerValues = useMemo(
    () => ({
      reservation,
      setReservation,
      reservationTab,
      setReservationTab,
      createdReservationId,
      setCreatedReservationId,
    }),
    [
      reservation,
      setReservation,
      reservationTab,
      setReservationTab,
      createdReservationId,
      setCreatedReservationId,
    ]
  );
  return (
    <ReservationContext.Provider value={providerValues}>{children}</ReservationContext.Provider>
  );
};
