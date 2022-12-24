import { Input } from '@mantine/core';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';
export default function Login() {
  const [focused, setFocused] = useState(false);
  const navigate = useNavigate();
  return (
    <div className='login-container'>
      <div className='text-center text-3xl font-bold'>Login</div>
      <div className='flex flex-col py-2 mt-3 w-2/3'>
        <label htmlFor='email'> UserName</label>
        <Input
          size='md'
          name='email'
          placeholder='email'
          className='rounded-lg bg-gray-700 mt-2  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
        />
      </div>
      <div className='flex flex-col w-2/3 '>
        <label> Password</label>
        <Input
          size='md'
          className=' rounded-lg  bg-gray-700 mt-2  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
          name='Password'
          placeholder='Enter password'
        />
      </div>

      <div className='button login-button'>log in</div>
      <button onClick={() => navigate('/register')}>New User please signup</button>
    </div>
  );
}
