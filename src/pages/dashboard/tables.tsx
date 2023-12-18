import { Helmet } from 'react-helmet-async';

import TablesView from 'src/sections/tables/view';

// ----------------------------------------------------------------------

export default function Page() {
  return (
    <>
      <Helmet>
        <title> Dashboard: Tables</title>
      </Helmet>

      <TablesView />
    </>
  );
}
