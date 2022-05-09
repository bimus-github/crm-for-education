import React from 'react';
import { Link } from 'react-router-dom';
import AppLayout from 'src/components/shared/layout';

const TeachersPage = () => {
  return (
    <AppLayout>
      <div className='p-5 w-full flex flex-col gap-2'>
        <div className=' w-full h-auto flex justify-between items-center mb-3'>
          <input
            className='w-[200px] h-[40px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='text'
            placeholder='Search'
          />
          <Link to={'/create/teacher'}>
            <button className='w-[200px] h-[40px] rounded-md bg-app-secondary hover:bg-app-secondary-lighter text-white font-bold'>
              Add new teacher
            </button>
          </Link>
        </div>
        <div className='p-1 w-full min-h-[600px] bg-white shadow-md rounded-[5px]'>
          <div className='w-full flex items-center border-b py-3'>
            <div className=' mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              First Name
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Last Name
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Num. of groups
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Email
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Started date
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[1] h-full'></div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
};

export default TeachersPage;
