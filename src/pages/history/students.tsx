import moment from "moment";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { MdDelete, MdRestore } from "react-icons/md";
import ChangeStudent from "src/components/shared/change/student";
import OpenInfoGroup from "src/components/shared/informations/group";
import OpenInfoStudent from "src/components/shared/informations/student";
import OpenInfoTeacher from "src/components/shared/informations/teacher";
import AppLayout from "src/components/shared/layout";
import { deleteUser, updateUser } from "src/lib/firebase/services/user";
import { CASE, Group, ROLE, User } from "src/models";
import { UserActions } from "src/store/features/user";
import { UserSliceActions } from "src/store/features/users";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

function History() {
  const dispatch = useAppDispatch();

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  let t = Object.values(usersSlices)?.filter((t) => t.role === ROLE.TEACHER);

  let s = Object.values(usersSlices)?.filter((s) => s.role === ROLE.STUDENT);

  let deletedStudents = s.filter((s) => s.case === CASE.nonexistent);

  console.log(deletedStudents);

  let g = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id
  );

  const onRestore = (student: User) => {
    try {
      const restoredStudent = {
        ...student,
        case: CASE.existent,
        deletedTime: "0",
      };
      updateUser(restoredStudent);
      dispatch(UserSliceActions.removeUser(student));
      dispatch(UserSliceActions.addUser(restoredStudent));
      toast.success("Restoring has been successfully!");
    } catch (error) {
      toast.error("Something is wrong!");
      console.log(error);
    }
  };

  const onDelete = (student: User) => {
    deleteUser(student.id);
    dispatch(UserSliceActions.removeUser(student));
  };

  const [student, setStudent] = useState<User>();
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false);

  const [group, setGroup] = useState<Group>();
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const openModalInfo = (i: Group) => {
    setGroup(i);
    setOpenInfoModal(true);
  };

  const onInfoStudent = (t: User) => {
    setStudent(t);
    setOpenStudentModal(true);
  };

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  useEffect(() => {
    setIsOpenInfo(openInfoModal);
    setIsOpenInfoStudent(openStudentModal);
    setIsOpenInfoTeacher(openTeacherModal);
  }, []);

  const setIsOpenInfo = (i: any) => {
    setOpenInfoModal(i);
  };

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  const setIsOpenInfoStudent = (i: any) => {
    setOpenStudentModal(i);
  };

  return (
    <AppLayout>
      <div className="w-full h-full p-7">
        <OpenInfoStudent
          isOpen={openStudentModal}
          setIsOpen={(i: any) => setIsOpenInfoStudent(i)}
          item={student}
        />

        <OpenInfoGroup
          isOpen={openInfoModal}
          setIsOpen={(i: any) => setIsOpenInfo(i)}
          item={group}
        />

        <OpenInfoTeacher
          isOpen={openTeacherModal}
          setIsOpen={(i: any) => setIsOpenInfoTeacher(i)}
          item={teacher}
        />

        <div className="w-full h-full bg-white p-4 flex flex-col">
          <div className="w-full flex-[1] flex justify-between items-center font-serif font-bold border-b">
            <div className="flex-[0.2]">№</div>
            <div className="flex-[1]">First Name</div>
            <div className="flex-[1]">Teacher</div>
            <div className="flex-[1]">Group</div>
            <div className="flex-[1]">Started Time</div>
            <div className="flex-[1]">Ended Time</div>
            <div className="flex-[1] flex items-center justify-center">
              Restore
            </div>
          </div>
          <div className="w-full pt-2 flex-[19] flex flex-col items-center justify-start overflow-auto gap-2">
            {deletedStudents &&
              deletedStudents.map((student, index) => (
                <div
                  key={student?.deletedTime}
                  className="w-full flex-[1] flex justify-start items-start font-serif"
                >
                  <div className="flex-[0.2]">{index + 1}.</div>
                  <div
                    onClick={() => onInfoStudent(student)}
                    className="flex-[1] flex"
                  >
                    <div className=" w-[30px] h-[30px] mr-1">
                      <img
                        src={student.img}
                        className=" h-full w-full rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                      />
                    </div>
                    <p>{student?.firstName}</p>
                  </div>
                  <div
                    onClick={() =>
                      onInfoTeacher(
                        t?.filter((t) => t?.id === student?.teacher)[0]
                      )
                    }
                    className="flex-[1] flex"
                  >
                    <div className=" w-[30px] h-[30px] mr-1">
                      <img
                        src={
                          t?.filter((t) => t?.id === student?.teacher)[0]?.img
                        }
                        className=" h-full w-full rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                      />
                    </div>
                    <p>
                      {t &&
                        t?.filter((t) => t?.id === student?.teacher)[0]
                          ?.firstName}
                    </p>
                  </div>
                  <div
                    onClick={() =>
                      openModalInfo(
                        g && g?.filter((g) => g?.id === student?.group)[0]
                      )
                    }
                    className="flex-[1]"
                  >
                    {g && g?.filter((g) => g?.id === student?.group)[0]?.name}
                  </div>
                  <div className="flex-[1]">
                    {moment(Number(student?.startedTime))?.format("LL")}
                  </div>
                  <div className="flex-[1]">
                    {moment(Number(student?.deletedTime)).format("LL")}
                  </div>
                  <div className="flex-[1] flex justify-center items-center gap-2">
                    <MdRestore
                      onClick={() => onRestore(student)}
                      size={24}
                      className="hover:text-app-secondary-lighter hover:h-[30px] hover:w-[30px]"
                    />
                    <MdDelete
                      onClick={() => onDelete(student)}
                      size={24}
                      className="hover:text-red-500 hover:h-[30px] hover:w-[30px]"
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default History;
