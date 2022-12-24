import axios from 'axios';
export const instance = axios.create({ baseURL: 'http://localhost:3000' });

export const RegisterApi = async (data) => {
  return await instance.post('/user/register', { data });
};
export const LoginApi = async (data) => {
  return await instance.post('/user/login');
};
