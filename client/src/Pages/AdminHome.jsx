import { Flex } from '@mantine/core';
import UserHome from '../Components/UserHome.jsx/UserHome';
import Navbar from '../Shared/Navbar';

export default function AdminHomePage() {
  return (
    <div className=' w-screen h-screen'>
      <Navbar isAdmin />

      <AdminHome />
    </div>
  );
}
