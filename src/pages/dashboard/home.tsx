import { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';

import { Button } from '@mui/material';

import {
  getRestaurant,
  getRestaurants,
  createRestaurant,
  useGetRestaurant,
  useGetRestaurants,
} from 'src/api/restaurants';

import HomeView from 'src/sections/home/view';

// ----------------------------------------------------------------------

export default function Page() {
  // const a = useGetAppointments();
  const b = useGetRestaurants();
  console.log(b);

  const c = useGetRestaurant('65359426c665979a76591cae');
  console.log(c);

  const fetcher = async () => {
    try {
      const data = await getRestaurants();
      const data2 = await getRestaurant('65359426c665979a76591cae');
      console.warn(data, data2);
    } catch (err) {
      console.warn(err);
    }
  };

  useEffect(() => {
    fetcher();
  }, []);

  const handleClick = async () => {
    try {
      const data = await createRestaurant({
        name: 'arber test',
        categoryId: '65366c38f59627bc3d02b585',
      });
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <Helmet>
        <title> Dashboard: Home</title>
      </Helmet>
      <Button onClick={handleClick}>asd</Button>
      <HomeView />
    </>
  );
}
