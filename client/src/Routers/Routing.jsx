import { Route, Routes, BrowserRouter } from 'react-router-dom';
import LoginPage from '../Pages/LoginPage';
import SignupPage from '../Pages/SignupPage';

export default function Routing() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/register' element={<SignupPage/>}  />
      </Routes>
    </BrowserRouter>
  );
}
