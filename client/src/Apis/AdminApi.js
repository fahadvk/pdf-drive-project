import { instance } from "./UserApis";

export const getAllFilesApi = async () => {
    return await instance.get('/admin/getFiles');
  };
  export const SearchallApi = async (data) => {
    return await instance.get(`/user/${data}/search`);
  };