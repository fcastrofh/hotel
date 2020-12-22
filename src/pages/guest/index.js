import React from 'react';
import { Button } from 'reactstrap';
import Page from '../../components/Page';
import ListView from '../../components/ListView';

export default function Gest() {
  const columns = [
    {
      name: 'name',
      value: 'name',
    },
    {
      name: 'cpf',
      value: 'cpf',
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
      name: 'birthday',
      value: 'birthday',
    },
    {
      name: 'profile',
      value: 'profile',
    },
  ];

  return (
    <Page title="Guest">
      <Button>Add Guest</Button>
      <ListView columns={columns} endpoint="/guest" />
    </Page>
  );
}