import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import {
  Form, FormGroup, Input, Label, Button,
} from 'reactstrap';

import { toast } from 'react-toastify';
import axios from '../../utils/axios';
import Page from '../../components/Page';

export default function Guest() {
  const { query: { id }, push } = useRouter();
  const isNewGuest = id === 'new';
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
    telephone: '',
    birthday: '',
    profile: '',
  });

  const getGuest = async () => {
    const response = await axios.get(`/guest/${id}`);
    const { data } = response;
    setForm({
      ...data,
    });
  };

  useEffect(() => {
    if (id && !isNewGuest) {
      getGuest();
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
    const {     name, cpf, email, password,
                telephone, birthday,
                profile,
            } = form;
    const formData = {
      name,
      cpf,
      email,
      password,
      telephone,
      birthday,
      profile,
    };

    try {
      if (isNewGuest) {
        await axios.post('/guest', formData);
      } else {
        await axios.put(`/guest/${id}`, formData);
      }

      toast.success(isNewGuest ? 'Guest Created' : 'Guest Updated');
      push('/guest');
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
            placeholder="Insira o nome do guest"
            value={form.name}
          />
        </FormGroup>
        <FormGroup>
          <Label>CPF</Label>
          <Input
            name="cpf"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.cpf}
            placeholder="Insira o cpf do guest"
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
            placeholder="Insira o email do guest"
          />
        </FormGroup>
        <FormGroup>
          <Label>Password</Label>
          <Input
            name="password"
            maxLength={255}
            onChange={onChange}
            type="password"
            value={form.password}
            placeholder="Insira a password do guest"
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
            placeholder="Insira o telephone do guest"
          />
        </FormGroup>
        <FormGroup>
          <Label>Birthday</Label>
          <Input
            name="birthday"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.birthday}
            placeholder="Insira o birthday do guest"
          />
        </FormGroup>
        <FormGroup>
          <Label>Profile</Label>
          <Input
            name="profile"
            maxLength={255}
            onChange={onChange}
            type="text"
            value={form.profile}
            placeholder="Insira o profile do guest"
          />
        </FormGroup>
        <Button>Cancel</Button>
        <Button type="submit" className="ml-3" color="primary">Save</Button>
      </Form>
    </Page>
  );
}