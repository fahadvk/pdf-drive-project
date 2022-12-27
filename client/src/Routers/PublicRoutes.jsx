import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'universal-cookie';
import { verifyToken } from '../Apis/UserApis';

export default function PublicRoutes() {
  const cookie = new Cookies();
  const { userId } = useSelector((state) => state.authReducer);
  if (cookie.get('token')) {
    return <Navigate to='/' />;
  } else {
    return <Outlet />;
  }
}
