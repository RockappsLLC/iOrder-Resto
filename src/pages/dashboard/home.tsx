import { Helmet } from 'react-helmet-async';

import { OrderProvider } from 'src/components/order-sidebar/context';

import HomeView from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Home</title>
      </Helmet>
      <OrderProvider>
        <HomeView />
      </OrderProvider>
    </>
  );
}
