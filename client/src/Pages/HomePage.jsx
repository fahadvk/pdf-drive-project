import { Flex } from '@mantine/core';
import UserHome from '../Components/UserHome.jsx/UserHome';
import Navbar from '../Shared/Navbar';
import SideBar from '../Shared/SideBar';

export default function HomePage() {
  return (
    <div className=' w-screen h-screen'>
      <Navbar />

      <UserHome />
    </div>
  );
}
