import moment from "moment";
import { useEffect, useState } from "react";
import { BsPencilSquare } from "react-icons/bs";
import ChanegGroup from "src/components/shared/change/group";
import OpenInfoGroup from "src/components/shared/informations/group";
import OpenInfoTeacher from "src/components/shared/informations/teacher";
import AppLayout from "src/components/shared/layout";
import { Group, ROLE, User } from "src/models";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

function Schedule() {
  const dispatch = useAppDispatch();

  const groupsSlice = useAppSelector((g) => g.groupsSlice);

  const schoolSlice = useAppSelector((s) => s.schoolSlice);

  const usersSlices = useAppSelector((u) => u.usersSlice);

  let t = Object.values(usersSlices)?.filter((t) => t.role === ROLE.TEACHER);

  let s = Object.values(usersSlices)?.filter((s) => s.role === ROLE.STUDENT);

  let g = Object.values(groupsSlice)?.filter(
    (g) => g.school === schoolSlice.id
  );

  const [groups, setGroups] = useState(g);
  const [teachers, setTeachers] = useState(t);
  const [students, setStudents] = useState(s);

  const [group, setGroup] = useState<Group>();
  const [openInfoModal, setOpenInfoModal] = useState<boolean>(false);

  const [teacher, setTeacher] = useState<User>();
  const [openTeacherModal, setOpenTeacherModal] = useState<boolean>(false);

  const [changedGroup, setChangetGroup] = useState<Group | []>();
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);

  const openModalInfo = (i: Group) => {
    setGroup(i);
    setOpenInfoModal(true);
  };

  const openModalChange = (g: any) => {
    setChangetGroup(g);
    setOpenChangeModal(true);
  };

  const onInfoTeacher = (t: User) => {
    setTeacher(t);
    setOpenTeacherModal(true);
  };

  useEffect(() => {
    setIsOpenInfo(openInfoModal);
    setIsOpenInfoTeacher(openTeacherModal);
    setIsOpenChange(openChangeModal);
  }, []);

  const setIsOpenChange = (i: any) => {
    setOpenChangeModal(i);
  };

  const setIsOpenInfo = (i: any) => {
    setOpenInfoModal(i);
  };

  const setIsOpenInfoTeacher = (i: any) => {
    setOpenTeacherModal(i);
  };

  return (
    <AppLayout>
      <div className="w-full h-full p-5">
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

        <ChanegGroup
          isOpen={openChangeModal}
          setIsOpen={(i: any) => setIsOpenChange(i)}
          item={changedGroup}
        />

        <div className="w-full h-full bg-white flex flex-col items-center justify-start p-2">
          <div className="w-full h-[50px] flex justify-around items-center border-b-2 border-black p-1">
            <div className="flex-[2] pl-5 font-mono font-semibold text-lg">
              Subject
            </div>
            <div className="flex-[3] pl-5 font-mono font-semibold text-lg">
              Teacher
            </div>
            <div className="flex-[4] pl-5 font-mono font-semibold text-lg">
              Day of the week
            </div>
            <div className="flex-[3] pl-5 font-mono font-semibold text-lg">
              Opened date
            </div>
            <div className="flex-[2] pl-5 font-mono font-semibold text-lg">
              Room
            </div>
            <div className="flex-[3] pl-5 font-mono font-semibold text-lg">
              Time
            </div>
            <div className="flex-[1] pl-5 font-mono font-semibold text-lg">
              Changes
            </div>
          </div>

          {groups &&
            groups.map((group, index) => (
              <div
                key={index}
                className="w-full h-[50px] flex justify-around items-center p-1"
              >
                <div
                  onDoubleClick={() => openModalInfo(group)}
                  className="flex-[2] pl-5 font-serif font-normal text-lg"
                >
                  {group.name}
                </div>
                <div
                  onDoubleClick={() =>
                    onInfoTeacher(
                      teachers.filter((t) => t.id === group.teacher.user)[0]
                    )
                  }
                  className="flex-[3] pl-5 font-serif font-normal text-lg flex items-center justify-start gap-1"
                >
                  <img
                    src={
                      teachers.filter((t) => t.id === group.teacher.user)[0]
                        ?.img
                    }
                    className=" h-[30px] w-[30px] rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                  />
                  <p>
                    {
                      teachers.filter((t) => t.id === group.teacher.user)[0]
                        ?.firstName
                    }
                  </p>
                </div>
                <div className="flex-[4] pl-5  overflow-auto font-serif font-normal text-lg flex justify-start items-center gap-2">
                  {group?.schedule?.days?.map((d) => (
                    <p className="px-1">{d}</p>
                  ))}
                </div>
                <div className="flex-[3] pl-5 font-serif font-normal text-lg">
                  {moment(Number(group.startedTime)).format("MMMM Do YYYY")}
                </div>
                <div className="flex-[2] pl-5 font-serif font-normal text-lg">
                  {group.room}
                </div>
                <div className="flex-[3] pl-5 font-serif font-normal text-lg">
                  {group.schedule.time.start}-{group.schedule.time.end}
                </div>
                <div className="flex-[1] pl-5 font-serif font-normal text-lg">
                  <BsPencilSquare
                    onClick={() => openModalChange(group)}
                    className=" h-[20px] w-[20px] hover:text-app-secondary hover:w-[30px] hover:h-[30px]"
                  />
                </div>
              </div>
            ))}
        </div>
      </div>
    </AppLayout>
  );
}

export default Schedule;
