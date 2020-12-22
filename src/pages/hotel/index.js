import React from 'react';
import { Button } from 'reactstrap';
import { useRouter } from 'next/router';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

export default function Hotel() {
  const router = useRouter();

  const columns = [
    {
      name: 'name',
      value: 'name',
    },
    {
      name: 'email',
      value: 'email',
    },
    {
      name: 'telephone',
      value: 'telephone',
    },
    {
      name: 'classification',
      value: 'classification',
    },
    {
      name: 'priceWeekRegular',
      value: 'PWR',
    },
    {
      name: 'priceWeekFidelity',
      value: 'PWF',
    },
    {
      name: 'priceWeekendRegular',
      value: 'PWER',
    },
    {
      name: 'priceWeekendFidelity',
      value: 'PWEF',
    },
  ];

  return (
    <Page title="Hotel">
      <Button onClick={() => router.push('/hotel/new')}>New Hotel</Button>
      <ListView columns={columns} endpoint="/hotel" />
    </Page>
  );
}