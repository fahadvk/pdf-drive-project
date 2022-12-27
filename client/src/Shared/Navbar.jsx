import { Button, TextInput } from '@mantine/core';
import { useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { SearchallApi } from '../Apis/AdminApi';
import { SearchApi } from '../Apis/UserApis';
import { setfiles } from '../store/FilesSlice';

export default function Navbar({ isAdmin }) {
  const cookie = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchRef = useRef('');
  const searchHandle = async () => {
    const { data } = isAdmin
      ? await SearchallApi(searchRef.current.value)
      : await SearchApi(searchRef.current.value);
    dispatch(setfiles(data));
  };
  return (
    <div className='bg-blue-400 px-4  py-3 flex justify-between'>
      <h3 className=' font-extrabold text-xl  self-start'> Pdf Box</h3>

      <div className=' w-1/3 flex justify-end space-x-2'>
        <TextInput ref={searchRef} placeholder='Search files' radius='md' />

        <Button
          type='button'
          color='dark'
          className=' text-white bg-neutral-600  p-3'
          onClick={searchHandle}
        >
          Search
        </Button>
        <Button
          onClick={() => {
            cookie.remove('token');
            navigate('/login');
          }}
          className='  bg-red-600 hover:bg-black '
        >
          Logout
        </Button>
      </div>
    </div>
  );
}
