import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { verifyToken } from '../Apis/UserApis';
import { useDispatch } from 'react-redux';
import { changeLoad } from '../store/loaderSlice';
import { setId, setName } from '../store/authSlice';

export default function PrivateRoutes() {
  const cookie = new Cookies();
  const token = cookie.get('token');
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userId } = useSelector((state) => state.authReducer);
  useEffect(() => {
    check();
  }, []);
  if (userId) return <Outlet />;
  async function check() {
    if (!token) {
      return navigate('/login');
    }
    try {
      const { data } = await verifyToken();
      if (data.userId) {
        dispatch(setName(data.Name));
        dispatch(setId(data.userId));
      } else {
        cookie.remove('token');
        return navigate('/login');
      }
    } catch (error) {
      cookie.remove('token');
      return navigate('/login');
    }
  }
}
