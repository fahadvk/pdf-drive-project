export default function SideBar() {
  return (
    <div className='p-10 ml w-1/2 h-screen  bg-white z-20 fixed top-auto  -left-72  lg:left-0 lg:w-64  peer-focus:left-0 peer:transition ease-out delay-150 duration-200'>
      <div className='flex flex-col justify-start item-center '>
        {/* <h1 className="text-base text-center cursor-pointer font-bold text-blue-900 border-b border-gray-100 pb-4 w-full"></h1> */}
        <div className=' my-4 border-b border-gray-200 pb-6'>
          <div className='flex mb-2 justify-start items-center gap-4 pl-5   hover:bg-blue p-2 rounded-md group cursor-pointer hover:shadow-lg m-auto'>
            {/* <MdOutlineSpaceDashboard className='text-2xl text-gray-600 group-hover:text-white ' /> */}
            <h3 className='text-base text-gray-800 group-hover:text-white font-semibold '>
              Home
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
