import { ChangeEvent, SetStateAction, useEffect, useState } from "react";

import AppLayout from "src/components/shared/layout";

import { useAppDispatch, useAppSelector } from "src/store/hooks";

import { Link } from "react-router-dom";
import { CASE, Group, ROLE, User } from "src/models";

import moment from "moment";

import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import { deleteGroup, updateGroup } from "src/lib/firebase/services/group";
import { deleteUser, updateUser } from "src/lib/firebase/services/user";

import toast from "react-hot-toast";

import { GroupsSliceActions } from "src/store/features/groups";
import { UserSliceActions } from "src/store/features/users";
import ChanegGroup from "src/components/shared/change/group";
import { AllMonthlyBill } from "src/components/shared/monthlyBill";
import OpenInfoGroup from "src/components/shared/informations/group";
import OpenInfoTeacher from "src/components/shared/informations/teacher";

const Groups = () => {
  const dispatch = useAppDispatch();

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  let t = Object.values(usersSlices)?.filter((t) => t.role === ROLE.TEACHER);

  let s = Object.values(usersSlices)?.filter((s) => s.role === ROLE.STUDENT);

  let g = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id && g.case === CASE.existent
  );

  const [groups, setGroups] = useState(g);
  const [teachers, setTeachers] = useState(t);
  const [students, setStudents] = useState(s);

  const [msgOpenDelete, setMsgOpenDelete] = useState(false);

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const [group, setGroup] = useState<Group>();
  const [openInfoGroup, setOpenInfoGroup] = useState<boolean>(false);

  const [changedGroup, setChangetGroup] = useState<Group | []>();
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);

  const [msg, setMsg] = useState("");
  const [item, setItem] = useState<User | "">("");

  const openModaInfoGroup = (i: Group) => {
    setGroup(i);
    setOpenInfoGroup(true);
  };

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  const openModalChange = (g: any) => {
    setChangetGroup(g);
    setOpenChangeModal(true);
  };

  useEffect(() => {
    setIsOpenInfoGroup(openInfoGroup);
    setIsOpenChange(openChangeModal);
    setIsOpenInfoTeacher(openTeacherModal);
    console.log(openChangeModal);
  }, []);

  const setIsOpenChange = (i: any) => {
    setOpenChangeModal(i);
  };

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  const setIsOpenInfoGroup = (i: any) => {
    setOpenInfoGroup(i);
  };

  const onDelete = (t: any) => {
    try {
      setMsgOpenDelete(true);
      setMsg(`Do you realy want to delete ${t?.firstName}`);
      setItem(t);
      if (item !== "") {
        const deletedStudents = Object.values(usersSlices).filter(
          (s) =>
            s?.role === ROLE.STUDENT &&
            s?.school === t.school &&
            s?.group?.toLocaleLowerCase() === t?.name?.toLocaleLowerCase()
        );
        if (deletedStudents !== []) {
          for (let i = 0; i < deletedStudents.length; i++) {
            let student: any = {
              ...deletedStudents[i],
              case: CASE.nonexistent,
              deletedTime: Date.now(),
            };
            updateUser(student);
            dispatch(UserSliceActions.removeUser(student));
            dispatch(UserSliceActions.addUser(student));
          }
        }
        let group = { ...t, case: CASE, deletedTime: "" };
        updateGroup(group);
        dispatch(GroupsSliceActions.deleteGroup(group));
        dispatch(GroupsSliceActions.addGroup(group));
        setMsgOpenDelete(false);
        setMsg("");
        setItem("");
        toast.success("Deleting has done successfully");
      }
    } catch (error) {
      toast.error("Error, while deleting");
    }
  };

  const filterGroup = (e: ChangeEvent<HTMLInputElement>) => {
    setGroups(
      g?.filter((g) =>
        g?.name
          ?.toLocaleLowerCase()
          ?.includes(e.target.value?.toLocaleLowerCase())
      )
    );
  };

  return (
    <AppLayout>
      <div className="p-5 w-full flex flex-col gap-2">
        <ChanegGroup
          isOpen={openChangeModal}
          setIsOpen={(i: any) => setIsOpenChange(i)}
          item={changedGroup}
        />

        <OpenInfoGroup
          isOpen={openInfoGroup}
          setIsOpen={(i: any) => setIsOpenInfoGroup(i)}
          item={group}
        />

        <OpenInfoTeacher
          isOpen={openTeacherModal}
          setIsOpen={(i: any) => setIsOpenInfoTeacher(i)}
          item={teacher}
        />

        <div className=" w-full h-auto flex justify-between items-center mb-3">
          <input
            onChange={(e) => filterGroup(e)}
            className="w-[200px] h-[40px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
            type="text"
            placeholder="Search"
          />
          <Link to={"/create/group"}>
            <button className="w-[200px] h-[40px] rounded-md bg-app-secondary hover:bg-app-secondary-lighter text-white font-bold">
              Add new group
            </button>
          </Link>
        </div>
        <div className="p-1 w-full min-h-[600px] bg-white shadow-md rounded-[5px]">
          <div className="w-full flex items-center border-b py-3">
            <div className=" mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Name of group
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Name of teacher
            </div>

            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Price
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Started date
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

          {groups &&
            groups.map((g, i) => (
              <div
                key={i}
                className="p-1 w-full h-auto bg-white  rounded-[5px] flex items-center  py-3"
              >
                <div
                  onDoubleClick={() => openModaInfoGroup(g)}
                  className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full"
                >
                  {g?.name}
                </div>
                <div
                  onDoubleClick={() =>
                    onInfoTeacher(
                      teachers?.filter((t) => t.id === g.teacher.user)[0]
                    )
                  }
                  className=" mx-1 capitalize text-base font-semibold gap-1 flex items-center justify-start pl-2 font-mono flex-[2] h-full"
                >
                  <img
                    src={
                      teachers?.filter((t) => t.id === g.teacher.user)[0]?.img
                    }
                    className=" h-[30px] w-[30px] rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                  />
                  <p>
                    {
                      teachers?.filter((t) => t.id === g.teacher.user)[0]
                        ?.firstName
                    }
                  </p>
                </div>
                <div className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  {`${g?.price / 1000} 000`}
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  {moment(Number(g?.startedTime)).format("MMMM Do YYYY")}
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center gap-4 justify-start pl-2 font-mono flex-[1] h-full">
                  <BsPencilSquare
                    onClick={() => openModalChange(g)}
                    className=" h-[20px] w-[20px] hover:text-app-secondary hover:w-[30px] hover:h-[30px]"
                  />
                  <MdDelete
                    onClick={() => onDelete(g)}
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

export default Groups;
