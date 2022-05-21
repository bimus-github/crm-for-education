import React from 'react';

import AppLayout from 'src/components/shared/layout';

import { useAppSelector } from 'src/store/hooks';

import { Link } from 'react-router-dom';

import moment from 'moment';

import { BsPencilSquare } from 'react-icons/bs';
import { MdDelete } from 'react-icons/md';
import { Group, ROLE } from 'src/models';
import { deleteGroup } from 'src/lib/firebase/services/group';
import { deleteUser } from 'src/lib/firebase/services/user';
import toast from 'react-hot-toast';

const Groups = () => {
  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  const groups = Object.values(groupsSlice).filter(
    (g) => g.school === schoolSlice.id
  );

  const onDelete = (t: Group) => {
    const deletedStudents = Object.values(usersSlices).filter(
      (s) =>
        s.role === ROLE.STUDENT &&
        s.school === t.school &&
        s.group?.toLocaleLowerCase() === t.name.toLocaleLowerCase()
    );

    try {
      if (deletedStudents !== []) {
        for (let i = 0; i < deletedStudents.length; i++) {
          deleteUser(deletedStudents[i].id);
        }
      }
      deleteGroup(t.id);
      toast.success('Deleting has done successfully');
    } catch (error) {
      toast.error('Error, while deleting');
    }
  };

  return (
    <AppLayout>
      <div className='p-5 w-full flex flex-col gap-2'>
        <div className=' w-full h-auto flex justify-between items-center mb-3'>
          <input
            className='w-[200px] h-[40px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='text'
            placeholder='Search'
          />
          <Link to={'/create/group'}>
            <button className='w-[200px] h-[40px] rounded-md bg-app-secondary hover:bg-app-secondary-lighter text-white font-bold'>
              Add new group
            </button>
          </Link>
        </div>
        <div className='p-1 w-full min-h-[600px] bg-white shadow-md rounded-[5px]'>
          <div className='w-full flex items-center border-b py-3'>
            <div className=' mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Name of group
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
              Name of teacher
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full'>
              Num. of students
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full'>
              Started date
            </div>
            <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[1] h-full'>
              Change
            </div>
          </div>
          {groups.map((t, i) => (
            <div
              key={i}
              className='p-1 w-full h-auto bg-white  rounded-[5px] flex items-center  py-3'
            >
              <div className=' mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
                {t.name}
              </div>
              <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full'>
                {t.teacher.user}
              </div>
              <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full'>
                {/* {
                  students?.filter(
                    (l) =>
                      l.teacher.user?.toLocaleLowerCase() ===
                      t.firstName?.toLocaleLowerCase()
                  )?.length
                } */}
              </div>
              <div className='mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full'>
                {moment(Number(t.startedTime)).format('MMMM Do YYYY')}
              </div>
              <div className='mx-1 text-base flex items-center justify-around pl-2 font-bold flex-[1] h-full'>
                <BsPencilSquare className=' h-[20px] w-[20px] hover:text-app-secondary hover:w-[30px] hover:h-[30px]' />
                <MdDelete
                  onClick={() => onDelete(t)}
                  className=' h-[20px] w-[20px] hover:text-red-500 hover:w-[30px] hover:h-[30px]'
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default Groups;
