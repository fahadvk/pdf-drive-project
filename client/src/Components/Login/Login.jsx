import { Input } from '@mantine/core';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { string } from 'yup';
import Cookie from 'universal-cookie';
import { useDispatch } from 'react-redux';
import { LoginApi } from '../../Apis/UserApis';
import Toast from '../../Shared/Toast';

import './Login.css';
import { setEmail, setId, setName } from '../../store/authSlice';
import { changeLoad } from '../../store/loaderSlice';
export default function Login() {
  const dispatch = useDispatch();
  const emailRef = useRef('');
  const passwordRef = useRef('');
  const cookie = new Cookie();
  const login = async () => {
    if (
      !string().email().isValidSync(emailRef.current.value) ||
      emailRef.current.value == ''
    ) {
      toast.error('please enter valid email');
    }
    if (
      !string().min(6).isValidSync(passwordRef.current.value) ||
      passwordRef.current.value === ''
    ) {
      toast.error('password must contain min 6 digits');
    } else {
      dispatch(changeLoad(true));
      try {
        const { data } = await LoginApi({
          email: emailRef.current.value,
          password: passwordRef.current.value,
        });
        dispatch(changeLoad(false));
        if (data.isAdmin) {
          cookie.set('token', data.token);
          dispatch(setName(data.Name));
          dispatch(setId(data.userId));
          navigate('/admin');
        }
        if (data?.token) {
          cookie.set('token', data.token);
          dispatch(setName(data.Name));
          dispatch(setId(data.userId));
          navigate('/');
        }
      } catch (error) {
        console.log(error);
        dispatch(changeLoad(false));
        error.response.data && toast.error(error.response.data);
      }
    }
  };
  const navigate = useNavigate();
  return (
    <div className='login-container'>
      <div className='text-center text-3xl font-bold'>Login</div>
      <div className='flex flex-col py-2 mt-3 w-2/3'>
        <Toast />
        <label htmlFor='email'> email</label>
        <Input
          size='md'
          name='email'
          ref={emailRef}
          placeholder='email'
          className='rounded-lg bg-gray-700 mt-2  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
        />
      </div>
      <div className='flex flex-col w-2/3 '>
        <label> Password</label>
        <Input
          size='md'
          ref={passwordRef}
          className=' rounded-lg  bg-gray-700 mt-2  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
          name='Password'
          placeholder='Enter password'
        />
      </div>

      <button onClick={login} className='button login-button'>
        log in
      </button>
      <button onClick={() => navigate('/register')}>
        New User please signup
      </button>
    </div>
  );
}
