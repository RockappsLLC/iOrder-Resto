// ----------------------------------------------------------------------

const ROOTS = {
  AUTH: '/auth',
  DASHBOARD: '/dashboard',
};

// ----------------------------------------------------------------------

export const paths = {
  minimalUI: 'https://mui.com/store/items/minimal-dashboard/',
  // AUTH
  auth: {
    jwt: {
      login: `${ROOTS.AUTH}/jwt/login`,
      register: `${ROOTS.AUTH}/jwt/register`,
    },
    other: {
      chooseUser: `${ROOTS.AUTH}/other/choose-user`,
      pinScreen: `${ROOTS.AUTH}/other/pin-screen`,
      lockScreen: `${ROOTS.AUTH}/other/lock-screen`,
      loginOwner: `${ROOTS.AUTH}/other/login-owner`,
      ownerForm: `${ROOTS.AUTH}/other/owner-form`,
    },
  },
  // DASHBOARD
  dashboard: {
    tables: `${ROOTS.DASHBOARD}/tables`,
    root: ROOTS.DASHBOARD,
    bills: `${ROOTS.DASHBOARD}/bills`,
    customers: `${ROOTS.DASHBOARD}/customers`,
    ownerForm: `${ROOTS.DASHBOARD}/other/owner-form`,
    // profile: `${ROOTS.DASHBOARD}/other/profile`,
  },
};
