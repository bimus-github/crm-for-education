import React from "react";
import { Link } from "react-router-dom";
import AppLayout from "src/components/shared/layout";
import { Language, ROLE, User } from "src/models";
import { useAppSelector } from "src/store/hooks";
import moment from "moment";

import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import { deleteUser } from "src/lib/firebase/services/user";
import toast from "react-hot-toast";
import { deleteGroup } from "src/lib/firebase/services/group";

const TeachersPage = () => {
  const usersSlices = useAppSelector((i) => i.usersSlice);

  const groupSlices = useAppSelector((i) => i.groupsSlice);

  const schoolSlices = useAppSelector((s) => s.schoolSlice);

  const teachers = Object.values(usersSlices).filter(
    (t) => t.role === ROLE.TEACHER && t.school === schoolSlices.id
  );

  const groups = Object.values(groupSlices).filter(
    (g) => g.school === teachers[0]?.school
  );

  const onDelete = (t: User) => {
    const deletedStudents = Object.values(usersSlices).filter(
      (s) => s.teacher?.toLocaleLowerCase() === t.firstName?.toLocaleLowerCase()
    );

    const deletedGroup = Object.values(groupSlices).filter(
      (d) =>
        d.teacher.user?.toLocaleLowerCase() === t.firstName?.toLocaleLowerCase()
    );
    try {
      deleteUser(t.id);
      if (deletedGroup !== []) {
        for (let i = 0; i < deletedGroup.length; i++) {
          deleteGroup(deletedGroup[i].id);
        }
      }
      if (deletedStudents) {
        for (let i = 0; i < deletedStudents.length; i++) {
          deleteUser(deletedStudents[i].id);
        }
      }
      toast.success("Deleting has been successfully");
    } catch (error) {
      toast.error("Error, while deleting");
    }
  };

  return (
    <AppLayout>
      <div className="p-5 w-full flex flex-col gap-2">
        <div className=" w-full h-auto flex justify-between items-center mb-3">
          <input
            className="w-[200px] h-[40px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
            type="text"
            placeholder="Search"
          />
          <Link to={"/create/teacher"}>
            <button className="w-[200px] h-[40px] rounded-md bg-app-secondary hover:bg-app-secondary-lighter text-white font-bold">
              Add new teacher
            </button>
          </Link>
        </div>
        <div className="p-1 w-full min-h-[600px] bg-white shadow-md rounded-[5px]">
          <div className="w-full flex items-center border-b py-3">
            <div className=" mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
              First Name
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
              Last Name
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Num. of groups
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
              Email
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Started date
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[1] h-full">
              Change
            </div>
          </div>
          {teachers.map((t) => (
            <div className="p-1 w-full h-auto bg-white  rounded-[5px] flex items-center  py-3">
              <div className=" mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
                <div className=" w-[30px] h-[30px] mr-1">
                  <img
                    src={t.img}
                    className=" h-full w-full rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                  />
                </div>
                {t.firstName}
              </div>
              <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
                {t.lastName}
              </div>
              <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
                {
                  groups?.filter(
                    (l) =>
                      l.teacher.user?.toLocaleLowerCase() ===
                      t.firstName?.toLocaleLowerCase()
                  )?.length
                }
              </div>
              <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[3] h-full">
                {t.email}
              </div>
              <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
                {moment(Number(t.startedTime)).format("MMMM Do YYYY")}
              </div>
              <div className="mx-1 text-base flex items-center justify-around pl-2 font-bold flex-[1] h-full">
                <BsPencilSquare className=" h-[20px] w-[20px] hover:text-app-secondary hover:w-[30px] hover:h-[30px]" />
                <MdDelete
                  onClick={() => onDelete(t)}
                  className=" h-[20px] w-[20px] hover:text-red-500 hover:w-[30px] hover:h-[30px]"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
};

export default TeachersPage;
