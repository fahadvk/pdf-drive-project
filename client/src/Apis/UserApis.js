import axios from 'axios';
export const instance = axios.create({
  baseURL: 'http://localhost:3000',
  withCredentials: true,
});

export const RegisterApi = async (data) => {
  return await instance.post('/user/register', { data });
};
export const LoginApi = async (data) => {
  return await instance.post('/user/login', data);
};

export const verifyToken = async (data) => {
  return await instance.get('/user/verify');
};

export const UploadApi = async (data) => {
  return await instance.post('/user/upload', data);
};

export const getUserFilesApi = async () => {
  return await instance.get('/user/getFiles');
};
export const deleteFileApi = async (id) => {
  return await instance.delete(`/user/${id}/filedelete`);
};

export const SearchApi = async (data) => {
  return await instance.get(`/user/${data}/search`);
};
