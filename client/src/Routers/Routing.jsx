import { Route, Routes, BrowserRouter } from 'react-router-dom';
import AdminHomePage from '../Pages/AdminHome';
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';
import AdminRoutes from './AdminRoutes';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoutes />}>
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<SignupPage />} />
        </Route>
        <Route element={<PrivateRoutes />}>
          <Route path='/' element={<HomePage />} />
        </Route>
        <Route element={<AdminRoutes />}>
          <Route path='/admin' element={<AdminHomePage />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
