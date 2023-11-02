import { Helmet } from 'react-helmet-async';

import BillsView from 'src/sections/bills/view';

// ----------------------------------------------------------------------

export default function Page() {
    return (
        <>
            <Helmet>
                <title> Dashboard: Bills</title>
            </Helmet>

            <BillsView />
        </>
    );
}
