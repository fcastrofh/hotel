import React from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

export default function accommodation() {
  const router = useRouter();

  const columns = [
    {
      name: 'startDay',
      value: 'startDay',
    },
    {
      name: 'endDay',
      value: 'endDay',
    },
    {
      name: 'valueReservation',
      value: 'valueReservation',
    },
    {
      name: 'guest',
      value: 'guest',
      render: (guest) => guest.name,
    },
    {
      name: 'hotel',
      value: 'hotel',
      render: (hotel) => hotel.name,
    },
  ];

  return (
    <Page title="Accommodation">
      <Button onClick={() => router.push('/accommodation/new')}>New Accommodation</Button>
      <ListView columns={columns} endpoint="/accommodation" />
    </Page>
  );
}