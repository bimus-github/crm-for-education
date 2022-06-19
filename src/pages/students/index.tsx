import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import AppLayout from "src/components/shared/layout";
import { AllMonthlyBill, monthlyBill } from "src/components/shared/monthlyBill";
import { FormatPhoneNumber } from "../../components/shared/formatPhoneNumber";

import { deleteUser, updateUser } from "src/lib/firebase/services/user";

import { CASE, Group, ROLE, User } from "src/models";

import { UserSliceActions } from "src/store/features/users";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import ChangeStudent from "src/components/shared/change/student";
import OpenInfoStudent from "src/components/shared/informations/student";
import { UserActions } from "src/store/features/user";
import OpenInfoTeacher from "src/components/shared/informations/teacher";
import OpenInfoGroup from "src/components/shared/informations/group";

const StudentsPage = () => {
  const dispatch = useAppDispatch();

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  let t = Object.values(usersSlices)?.filter((t) => t.role === ROLE.TEACHER);

  let s = Object.values(usersSlices)?.filter(
    (s) => s.role === ROLE.STUDENT && s.case === CASE.existent
  );

  let g = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id
  );

  const [groups, setGroups] = useState(g);
  const [teachers, setTeachers] = useState(t);
  const [students, setStudents] = useState(s);

  const [changedStudent, setChangetStudent] = useState<User | []>();
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);

  const [student, setStudent] = useState<User>();
  const [openStudentModal, setOpenStudentModal] = useState<boolean>(false);

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const [group, setGroup] = useState<Group>();
  const [openInfoGroup, setOpenInfoGroup] = useState<boolean>(false);

  const [msgOpenDelete, setMsgOpenDelete] = useState(false);
  const [msg, setMsg] = useState("");
  const [item, setItem] = useState<User | "">("");

  const onOpenModal = (s: any) => {
    setChangetStudent(s);
    setOpenChangeModal(true);
  };

  const onInfoStudent = (t: User) => {
    setStudent(t);
    setOpenStudentModal(true);
  };

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  const openModaInfoGroup = (i: Group) => {
    setGroup(i);
    setOpenInfoGroup(true);
  };

  useEffect(() => {
    setIsOpen(openChangeModal);
    setIsOpenInfoStudent(openStudentModal);
    setIsOpenInfoTeacher(openTeacherModal);
    setIsOpenInfoGroup(openInfoGroup);
    console.log(openChangeModal);
  }, []);

  const setIsOpen = (i: any) => {
    setOpenChangeModal(i);
  };

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  const setIsOpenInfoStudent = (i: any) => {
    setOpenStudentModal(i);
  };

  const setIsOpenInfoGroup = (i: any) => {
    setOpenInfoGroup(i);
  };

  const onDelete = (s: any) => {
    console.log(s);

    try {
      setMsgOpenDelete(true);
      setMsg(`Do you realy want to delete ${s?.firstName}?`);
      setItem(s);
      if (item !== "") {
        let deletedStudent = {
          ...s,
          case: CASE.nonexistent,
          deletedTime: Date.now(),
        };

        updateUser(deletedStudent);
        dispatch(UserSliceActions.removeUser(s));
        dispatch(UserSliceActions.addUser(deletedStudent));
        setMsgOpenDelete(false);
        setMsg("");
        setItem("");
        toast.success("Deleting has been successfully!");
      }
    } catch (error) {
      toast.error("Error, while deleting");
      console.log(error);
    }
  };

  const onFilterStudents = (e: any) => {
    setStudents(
      s.filter((s) =>
        s.firstName
          ?.toLocaleLowerCase()
          ?.includes(e.target.value?.toLocaleLowerCase())
      )
    );
  };

  return (
    <AppLayout>
      <div className="p-5 w-full flex flex-col gap-2">
        <ChangeStudent
          isOpen={openChangeModal}
          item={changedStudent}
          setIsOpen={(i) => setOpenChangeModal(i)}
        />

        <OpenInfoStudent
          isOpen={openStudentModal}
          setIsOpen={(i: any) => setIsOpenInfoStudent(i)}
          item={student}
        />

        <OpenInfoTeacher
          isOpen={openTeacherModal}
          setIsOpen={(i: any) => setIsOpenInfoTeacher(i)}
          item={teacher}
        />

        <OpenInfoGroup
          isOpen={openInfoGroup}
          setIsOpen={(i: any) => setIsOpenInfoGroup(i)}
          item={group}
        />

        <div className=" w-full h-auto flex justify-between items-center mb-3">
          <input
            onChange={(s) => onFilterStudents(s)}
            className="w-[200px] h-[40px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
            type="text"
            placeholder="Search"
          />
          <Link to={"/create/student"}>
            <button className="w-[200px] h-[40px] rounded-md bg-app-secondary hover:bg-app-secondary-lighter text-white font-bold">
              Add new student
            </button>
          </Link>
        </div>
        <div className="p-1 w-full min-h-[600px] bg-white shadow-md rounded-[5px]">
          <div className="w-full flex items-center border-b py-3">
            <div className=" mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              First Name
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Phone number
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Teacher
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Group
            </div>
            <div
              title={String(AllMonthlyBill(students, groups).allDebts)}
              className="mx-1 text-base text-red-500 flex items-center justify-start pl-2 font-bold flex-[2] h-full"
            >
              Dept
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[1] h-full">
              Change
            </div>
          </div>

          {msgOpenDelete && (
            <div className="absolute w-[400px] h-[70px] rounded-lg z-[2] top-[35%] left-[40%] bg-app-primary shadow-md flex p-2 flex-col gap-2">
              <div className="flex-[2] flex justify-center items-center">
                {msg}
              </div>
              <div className="flex-[1] flex justify-around items-center">
                <div
                  className=" font-semibold font-mono text-white h-full w-[90px] rounded-sm bg-app-secondary
                 flex items-center justify-around"
                  onClick={() => {
                    onDelete(item);
                  }}
                >
                  YES
                </div>
                <div
                  className=" font-semibold font-mono text-white h-full w-[90px] rounded-sm bg-app-secondary
                 flex items-center justify-around"
                  onClick={() => {
                    setMsgOpenDelete(false);
                    setItem("");
                  }}
                >
                  NO
                </div>
              </div>
            </div>
          )}

          {students &&
            students
              .filter((f) => f.case === CASE.existent)
              .map((s, i) => (
                <div key={i} className="w-full flex items-center  py-3">
                  <div
                    onDoubleClick={() => onInfoStudent(s)}
                    className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full"
                  >
                    <div className=" w-[30px] h-[30px] mr-1">
                      <img
                        src={s.img}
                        className=" h-full w-full rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                      />
                    </div>
                    {s.firstName}
                  </div>
                  <div className="mx-1 text-base font-semibold  flex flex-col items-start pl-0 font-mono flex-[2] h-full">
                    <p>
                      {`${
                        FormatPhoneNumber(
                          Math.floor(Number(s.phone) / 1000000000)
                        ).code
                      } 
                          ${
                            FormatPhoneNumber(
                              Math.floor(Number(s.phone) / 1000000000)
                            ).oneThree
                          } 
                          ${
                            FormatPhoneNumber(
                              Math.floor(Number(s.phone) / 1000000000)
                            ).fourFive
                          } 
                          ${
                            FormatPhoneNumber(
                              Math.floor(Number(s.phone) / 1000000000)
                            ).sixSeven
                          } 
                          `}
                    </p>
                    <p>
                      {`${
                        FormatPhoneNumber(
                          Number(s.phone) -
                            Math.floor(Number(s.phone) / 1000000000) *
                              1000000000
                        ).code
                      } 
                          ${
                            FormatPhoneNumber(
                              Number(s.phone) -
                                Math.floor(Number(s.phone) / 1000000000) *
                                  1000000000
                            ).oneThree
                          } 
                          ${
                            FormatPhoneNumber(
                              Number(s.phone) -
                                Math.floor(Number(s.phone) / 1000000000) *
                                  1000000000
                            ).fourFive
                          } 
                          ${
                            FormatPhoneNumber(
                              Number(s.phone) -
                                Math.floor(Number(s.phone) / 1000000000) *
                                  1000000000
                            ).sixSeven
                          } 
                          `}
                    </p>
                  </div>
                  <div
                    onDoubleClick={() =>
                      onInfoTeacher(
                        teachers.filter((t) => t.id === s?.teacher)[0]
                      )
                    }
                    className=" mx-1 capitalize text-base font-semibold gap-1  flex items-center justify-start pl-2 font-mono flex-[2] h-full"
                  >
                    <img
                      src={teachers.filter((t) => t.id === s?.teacher)[0]?.img}
                      className=" h-[30px] w-[30px] rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                    />
                    <p>
                      {
                        teachers.filter((t) => t.id === s?.teacher)[0]
                          ?.firstName
                      }
                    </p>
                  </div>
                  <div
                    onDoubleClick={() =>
                      openModaInfoGroup(
                        groups.filter((g) => g.id === s?.group)[0]
                      )
                    }
                    className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full"
                  >
                    {groups.filter((g) => g.id === s?.group)[0]?.name}
                  </div>
                  <div className="mx-1 text-red-500 text-base font-semibold  flex items-center justify-start pl-0 font-mono flex-[2] h-full">
                    {monthlyBill(s, groups)?.debt}
                  </div>
                  <div className="mx-1 text-base font-semibold  flex items-center justify-start gap-4 pl-0 font-mono flex-[1] h-full">
                    <BsPencilSquare
                      onClick={() => onOpenModal(s)}
                      className=" h-[20px] w-[20px] hover:text-app-secondary hover:w-[30px] hover:h-[30px]"
                    />
                    <MdDelete
                      onClick={() => onDelete(s)}
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

export default StudentsPage;
