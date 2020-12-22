import axios from 'axios';

const myAxios = axios.create({
  baseURL: 'https://hotelrecode.herokuapp.com',
});

export default myAxios;