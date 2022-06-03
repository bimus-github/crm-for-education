import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import { BsPencilSquare } from "react-icons/bs";
import { MdDelete } from "react-icons/md";

import AppLayout from "src/components/shared/layout";
import { AllMonthlyBill, monthlyBill } from "src/components/shared/monthlyBill";
import { FormatPhoneNumber } from "../../components/shared/formatPhoneNumber";

import { deleteUser } from "src/lib/firebase/services/user";

import { ROLE, User } from "src/models";

import { UserSliceActions } from "src/store/features/users";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import ChangeStudent from "src/components/shared/change/student";

const StudentsPage = () => {
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
  const [msgOpenDelete, setMsgOpenDelete] = useState(false);
  const [changedStudent, setChangetStudent] = useState<User | []>();
  const [openChangeModal, setOpenChangeModal] = useState<boolean>(false);
  const [msg, setMsg] = useState("");
  const [item, setItem] = useState<User | "">("");

  const onOpenModal = (s: any) => {
    setChangetStudent(s);
    setOpenChangeModal(true);
  };

  useEffect(() => {
    setIsOpen(openChangeModal);
    console.log(openChangeModal);
  }, []);

  const setIsOpen = (i: any) => {
    setOpenChangeModal(i);
  };

  const onDelete = (s: any) => {
    try {
      setMsgOpenDelete(true);
      setMsg(`Do you realy want to delete ${s?.firstName}`);
      setItem(s);
      if (item !== "") {
        deleteUser(s?.id);
        dispatch(UserSliceActions.removeUser(s));
        setMsgOpenDelete(false);
        setMsg("");
        setItem("");
        toast.success("Deleting has been successfully");
      }
    } catch (error) {
      toast.error("Error, while deleting");
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
              Last Name
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2.5] h-full">
              Phone number
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Teacher
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Group
            </div>
            <div className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full">
              Discount
            </div>
            <button
              title={String(AllMonthlyBill(students, groups).allPrices)}
              className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full"
            >
              Price
            </button>
            <div
              title={String(AllMonthlyBill(students, groups).allPaids)}
              className="mx-1 text-base flex items-center justify-start pl-2 font-bold flex-[2] h-full"
            >
              Paid
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
            students.map((s, i) => (
              <div key={i} className="w-full flex items-center  py-3">
                <div className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  <div className=" w-[30px] h-[30px] mr-1">
                    <img
                      src={s.img}
                      className=" h-full w-full rounded-full hover:h-[200px] hover:w-[200px] hover:absolute hover:shadow-md"
                    />
                  </div>
                  {s.firstName}
                </div>
                <div className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  {s.lastName}
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center justify-start pl-0 font-mono flex-[2.5] h-full">
                  {`(${FormatPhoneNumber(Number(s.phone)).code}) ${
                    FormatPhoneNumber(Number(s.phone)).oneThree
                  } ${FormatPhoneNumber(Number(s.phone)).fourFive} ${
                    FormatPhoneNumber(Number(s.phone)).sixSeven
                  }`}
                </div>
                <div className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  {teachers.filter((t) => t.id === s.teacher)[0]?.firstName}
                </div>
                <div className=" mx-1 capitalize text-base font-semibold  flex items-center justify-start pl-2 font-mono flex-[2] h-full">
                  {groups.filter((g) => g.id === s.group)[0]?.name}
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center justify-start pl-0 font-mono flex-[2] h-full">
                  {monthlyBill(s, groups)?.discount}%
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center justify-start pl-0 font-mono flex-[2] h-full">
                  {monthlyBill(s, groups)?.price}
                </div>
                <div className="mx-1 text-base font-semibold  flex items-center justify-start pl-0 font-mono flex-[2] h-full">
                  {monthlyBill(s, groups)?.paid}
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
