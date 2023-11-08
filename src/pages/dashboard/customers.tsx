import { Helmet } from 'react-helmet-async';

import CustomersView from 'src/sections/customers/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Customers</title>
      </Helmet>

      <CustomersView />
    </>
  );
}
