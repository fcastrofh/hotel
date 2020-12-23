import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import Page from '../../components/Page';

export default function Accommodation() {
  const { query: { id }, push } = useRouter();
  const isNewAccommodation = id === 'new';
  const [guests, setGuests] = useState([]);
  const [hotels, setHotels] = useState([]);
  const [form, setForm] = useState({
    startDay: '',
    endDay: '',
    valueReservation: '',
    guest: '',
    hotel: '',
  });

  const getGuests = async () => {
    const response = await axios.get('/guest');
    const { data } = response;
    setGuests(data);
  };

  const getHotels = async () => {
    const response = await axios.get('/hotel');
    const { data } = response;
    setHotels(data);
  };

  const getAccommodation = async () => {
    const response = await axios.get(`/accommodation/${id}`);
    const { data } = response;
    setForm({
      ...data,
      guest: String(data.guest.id),
      hotel: String(data.hotel.id),
    });
  };

  useEffect(() => {
    getGuests();
    getHotels();

    if (id && !isNewAccommodation) {
      getAccommodation();
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
    const { startDay, endDay, valueReservation, guest, hotel } = form;
    const formData = {
      startDay,
      endDay,
      valueReservation,
      guest: {
        id: guest,
      },
      hotel: {
        id: hotel,
      },
    };

    try {
      if (isNewAccommodation) {
        await axios.post('/accommodation', formData);
      } else {
        await axios.put(`/accommodation/${id}`, formData);
      }

      toast.success(isNewAccommodation ? 'Accommodation Created' : 'Accommodation Updated');
      push('/accommodation');
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Page title="Accommodation">
      <Form onSubmit={onSubmit}>
        <FormGroup>
          <Label>StartDay</Label>
          <Input
            name="startDay"
            maxLength={255}
            onChange={onChange}
            type="text"
            placeholder="Insira o startDay da accommodation"
            value={form.startDay}
          />
        </FormGroup>
        <FormGroup>
          <Label>EndDay</Label>
          <Input
            name="endDay"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.endDay}
            placeholder="Insira o endDay da Accommodation"
          />
        </FormGroup>
        <FormGroup>
          <Label>ValueReservation</Label>
          <Input
            name="valueReservation"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.valueReservation}
            placeholder="Insira o valueReservation da Accommodation"
          />
        </FormGroup>
        <FormGroup>
          <Label>Selecionar o Guest</Label>
          <Input value={form.guest} onChange={onChange} name="guest" type="select">
          <option>Selecionar o Guest</option>
            {guests.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label>Selecionar o Hotel</Label>
          <Input value={form.hotel} onChange={onChange} name="hotel" type="select">
            <option>Selecionar o Hotel</option>
            {hotels.map(({ id, name }) => (
              <option key={id} value={id}>{name}</option>
            ))}
          </Input>
        </FormGroup>
        <Button>Cancel</Button>
        <Button type="submit" className="ml-3" color="primary">Save</Button>
      </Form>
    </Page>
  );
}