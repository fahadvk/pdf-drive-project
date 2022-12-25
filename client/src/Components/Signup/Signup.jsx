import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Input, Paper } from '@mantine/core';
import { toast } from 'react-toastify';
import Cookie from 'universal-cookie';
import { RegisterApi } from '../../Apis/UserApis';
import Toast from '../../Shared/Toast';

function Signup() {
  const Navigate = useNavigate();
  const cookie = new Cookie();
  const validationSchema = Yup.object({
    Name: Yup.string()
      .max(15, 'Must be 15 characters or less')
      .required('Required'),
    Mobile: Yup.number()
      .min(10, 'Must be  minimum 10 characters ')
      .required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    Password: Yup.string()
      .min(6, 'Must be  minimum 6 characters ')
      .required('Required'),
    confirmPassword: Yup.string()
      .min(6, 'Must be  minimum 6 characters ')
      .required('Required')
      .oneOf([Yup.ref('Password')], 'Passwords must be same'),
  });
  const formik = useFormik({
    initialValues: {
      Name: '',
      email: '',
      Mobile: '',
      Password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async () => {
      const body = formik.values;
      try {
        const { data } = await RegisterApi(body);
        data.token && cookie.set('token', data.token);
        Navigate('/');
      } catch (error) {
        error.response.data && toast.error(error.response.data);
      }
    },
  });
  return (
    <div className='bg-gradient-to-r from-navy via-blue to-login h-screen flex flex-col justify-center '>
      <Paper
        className=' w-1/2 self-center'
        shadow='lg'
        radius='md'
        p='xs'
        sx={{ maxWidth: '500px' }}
        withBorder
      >
        <Toast />
        <div className='max-w-[450px] w-3/4  mx-auto bg-white rounded-lg'>
          <h2 className='text-blue text-center text-3xl font-bold '>
            Register
          </h2>
          <form className='' onSubmit={formik.handleSubmit}>
            <div className='flex flex-col text-gray-400  mt-3'>
              <Input
                size='md'
                className='rounded-lg underline-offset-8   focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
                type='text'
                placeholder='FullName'
                id='name'
                value={formik.values.Name}
                name='Name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <label className='text-red-600' htmlFor='name'>
                {formik.errors.Name &&
                  formik.touched.Name &&
                  formik.errors.Name}
              </label>
            </div>
            <div className='flex flex-col text-gray-400  mt-3'>
              <Input
                size='md'
                type='email'
                placeholder='youremail@gmail.com'
                id='email'
                name='email'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.email}
                className='rounded-lg    focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              />
              <label className='text-red-600' htmlFor='email'>
                {formik.errors.email &&
                  formik.touched.email &&
                  formik.errors.email}
              </label>
            </div>
            <div className='flex flex-col text-gray-400  mt-3'>
              <Input
                size='md'
                type='tel'
                placeholder='Mobile'
                id='mobile'
                name='Mobile'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Mobile}
                className='rounded-lg bg-gray-700  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              />
              <label className='text-red-600' htmlFor='Mobile'>
                {formik.errors.Mobile &&
                  formik.touched.Mobile &&
                  formik.errors.Mobile}
              </label>
            </div>
            <div className='flex flex-col text-gray-400  mt-3'>
              <Input
                size='md'
                type='Password'
                placeholder='Enter your Password'
                id='password'
                name='Password'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.Password}
                className='rounded-lg bg-gray-700  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              />
              <label className='text-red-600' htmlFor='Password'>
                {formik.errors.Password &&
                  formik.touched.Password &&
                  formik.errors.Password}
              </label>
            </div>

            <div className='flex flex-col text-gray-400  mt-3'>
              <Input
                size='md'
                type='Password'
                placeholder='Repeat your Password '
                id='confirmpassword'
                name='confirmPassword'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.confirmPassword}
                className='rounded-lg bg-gray-700  focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
              />
              <label className='text-red-600' htmlFor='confirmpassword'>
                {formik.errors.confirmPassword &&
                  formik.touched.confirmPassword &&
                  formik.errors.confirmPassword}
              </label>
            </div>
            <button
              className='w-2/3 ml-12 my-5 py-4 bg-blue-600 rounded-lg'
              type='submit'
              disabled={formik.isSubmitting}
            >
              Register
            </button>
          </form>
          <button
            className='w-full text-center  py-2'
            onClick={() => {
              Navigate('/login');
            }}
            type='button'
          >
            Already have an account ? Login
          </button>
        </div>
      </Paper>
    </div>
  );
}
export default Signup;
