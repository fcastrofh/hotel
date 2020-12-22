import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import Page from '../../components/Page';

export default function Hotel() {
  const { query: { id }, push } = useRouter();
  const isNewHotel = id === 'new';
  const [form, setForm] = useState({
    name: '',
    email: '',
    telephone: '',
    classification: '',
    priceWeekRegular: '',
    priceWeekFidelity: '',
    priceWeekendRegular: '',
    priceWeekendFidelity: '',
  });

  const getHotel = async () => {
    const response = await axios.get(`/hotel/${id}`);
    const { data } = response;
    setForm({
      ...data,
    });
  };

  useEffect(() => {
    if (id && !isNewHotel) {
      getHotel();
    }
  }, [id]);

  const onChange = (event) => {
    const { value, name } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const {     name, email, telephone, classification,
                priceWeekRegular, priceWeekFidelity,
                priceWeekendRegular, priceWeekendFidelity,
            } = form;
    const formData = {
      name,
      email,
      telephone,
      classification,
      priceWeekRegular,
      priceWeekFidelity,
      priceWeekendRegular,
      priceWeekendFidelity,
    };

    try {
      if (isNewHotel) {
        await axios.post('/hotel', formData);
      } else {
        await axios.put(`/hotel/${id}`, formData);
      }

      toast.success(isNewHotel ? 'Hotel Created' : 'Hotel Updated');
      push('/hotel');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Page title="Hotel">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>Name</Label>
          <Input
            name="name"
            maxLength={255}
            onChange={onChange}
            type="text"
            placeholder="Insira o nome do hotel"
            value={form.name}
          />
        </FormGroup>
        <FormGroup>
          <Label>Email</Label>
          <Input
            name="email"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.email}
            placeholder="Insira o email do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>Telephone</Label>
          <Input
            name="telephone"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.telephone}
            placeholder="Insira o telephone do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>Classification</Label>
          <Input
            name="classification"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.classification}
            placeholder="Insira a classification do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>PriceWeekRegular</Label>
          <Input
            name="priceWeekRegular"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.priceWeekRegular}
            placeholder="Insira o priceWeekRegular do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>PriceWeekFidelity</Label>
          <Input
            name="priceWeekFidelity"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.priceWeekFidelity}
            placeholder="Insira o priceWeekFidelity do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>PriceWeekendRegular</Label>
          <Input
            name="priceWeekendRegular"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.priceWeekendRegular}
            placeholder="Insira o priceWeekendRegular do hotel"
          />
        </FormGroup>
        <FormGroup>
          <Label>PriceWeekendFidelity</Label>
          <Input
            name="priceWeekendFidelity"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.priceWeekendFidelity}
            placeholder="Insira o priceWeekendFidelity do hotel"
          />
        </FormGroup>
        <Button>Cancel</Button>
        <Button type="submit" className="ml-3" color="primary">Save</Button>
      </Form>
    </Page>
  );
}