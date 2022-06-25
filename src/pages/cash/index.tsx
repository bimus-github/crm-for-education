import { useState } from "react";
import toast from "react-hot-toast";
import AppLayout from "src/components/shared/layout";
import { monthlyBill } from "src/components/shared/monthlyBill";
import SelectDropdown from "src/components/shared/select";
import { updateUser } from "src/lib/firebase/services/user";
import { CASE, ROLE } from "src/models";
import { UserSliceActions } from "src/store/features/users";
import { useAppDispatch, useAppSelector } from "src/store/hooks";

function Cash() {
  const dispatch = useAppDispatch();

  const usersSlice = useAppSelector((state) => state.usersSlice);

  const groupsSlice = useAppSelector((state) => state.groupsSlice);

  const teachers = Object.values(usersSlice).filter(
    (u) => u.role === ROLE.TEACHER
  );

  const students = Object.values(usersSlice).filter(
    (u) => u.role === ROLE.STUDENT
  );

  const groups = Object.values(groupsSlice).filter(
    (group) => group.case === CASE.existent
  );

  const [selectedTeacher, setSelectedTeacher] = useState({
    name: "Teacher",
    value: "Teacher",
  });

  const [selectedGroup, setSelectedGroup] = useState({
    name: "Group",
    value: "Group",
  });
  const [selectedStudent, setSelectedStudent] = useState({
    name: "Student",
    value: "Student",
  });
  const [paid, setPaid] = useState("");

  const teachersGroups = groups?.filter(
    (group) => group.teacher.user === selectedTeacher?.value
  );

  const groupsStudents = students?.filter(
    (student) => student.group === selectedGroup?.value
  );

  const student = students.filter(
    (student) =>
      student.id === selectedStudent?.value &&
      student.teacher === selectedTeacher?.value &&
      student.group === selectedGroup?.value
  );

  const onAddPrice = () => {
    try {
      if (student.length === 0) {
        return toast.error("Choose student!");
      }
      if (paid === "") {
        return toast.error("Create value!");
      }
      let lastFounds = Number(student[0]?.paid) + Number(paid);
      let newStudent = { ...student[0], paid: lastFounds };
      updateUser(newStudent);
      dispatch(UserSliceActions.removeUser(newStudent));
      dispatch(UserSliceActions.addUser(newStudent));
      setPaid("");
      toast.success("Payment was successfully!");
    } catch (error) {
      toast.error("Something is wrong!");
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className="w-full h-full p-7">
        <div className="w-full h-full bg-white p-4 flex flex-col">
          <div className=" w-full flex-[1] border-b border-black flex items-center justify-around p-2 pb-5">
            <div className="flex-[1] flex flex-col items-start justify-center gap-1">
              <p className="ml-2 font-serif font-bold">Teacher</p>
              <SelectDropdown
                value={selectedTeacher}
                options={[...teachers].map((t) => {
                  return {
                    name: `${t.firstName}`,
                    value: t.id,
                  };
                })}
                onChange={(v) => setSelectedTeacher(v)}
              />
            </div>
            <div className="flex-[1] flex flex-col items-start justify-center gap-1">
              <p className="ml-2 font-serif font-bold">Group</p>
              <SelectDropdown
                value={selectedGroup}
                options={[...teachersGroups].map((g) => {
                  return {
                    name: `${g.name}`,
                    value: g.id,
                  };
                })}
                onChange={(v) => setSelectedGroup(v)}
              />
            </div>
            <div className="flex-[1] flex flex-col items-start justify-center gap-1">
              <p className="ml-2 font-serif font-bold">Student</p>
              <SelectDropdown
                value={selectedStudent}
                options={[...groupsStudents].map((s) => {
                  return {
                    name: `${s.firstName}`,
                    value: s.id,
                  };
                })}
                onChange={(v) => setSelectedStudent(v)}
              />
            </div>
          </div>
          <div className=" w-full flex-[9] flex p-2">
            <div className="flex-[1] border-r border-app-primary h-full p-2 flex flex-col items-center justify-center">
              <div className="w-[500px] h-[110px] flex flex-col items-center justify-between">
                <p className="self-start ml-2 font-serif font-bold">
                  Add funds
                </p>
                <input
                  title="Add funds"
                  onChange={(value) => setPaid(value.target.value)}
                  type="text"
                  className="w-full h-[45px] rounded-md p-2 border border-app-primary"
                  placeholder="Add funds"
                />
                <button
                  onClick={onAddPrice}
                  className="font-bold font-serif text-white w-[200px] h-[45px] self-end mt-2 border rounded-md bg-app-secondary-lighter hover:bg-app-secondary"
                >
                  Add
                </button>
              </div>
            </div>
            <div className="flex-[1] h-full p-2 flex flex-col items-center justify-center">
              {student.length !== 0 && (
                <>
                  <div className="w-[400px] h-[45px] p-1 flex items-center justify-around">
                    <img
                      src={student[0]?.img}
                      className="h-[45px] w-[45px] shadow-md  rounded-full hover:relative hover:shadow-xl  hover:w-[200px] hover:h-[200px] hover:top-[70px]"
                    />
                  </div>
                  <div className="w-[400px] h-[45px] p-1 border-b border-app-secondary-lighter flex items-center justify-around">
                    <p className="flex-1 text-center font-serif font-semibold text-black">
                      First Name
                    </p>
                    <p className="flex-1 text-center font-serif text-black">
                      {student[0]?.firstName}
                    </p>
                  </div>
                  <div className="w-[400px] h-[45px] p-1 border-b border-app-secondary-lighter flex items-center justify-around">
                    <p className="flex-1 text-center font-serif font-semibold text-black">
                      Discount
                    </p>
                    <p className="flex-1 text-center font-serif text-black">
                      {monthlyBill(student[0], teachersGroups).discount}%
                    </p>
                  </div>
                  <div className="w-[400px] h-[45px] p-1 border-b border-app-secondary-lighter flex items-center justify-around">
                    <p className="flex-1 text-center font-serif font-semibold text-black">
                      Price
                    </p>
                    <p className="flex-1 text-center font-serif text-app-secondary-lighter">
                      {monthlyBill(student[0], teachersGroups).price} so'm
                    </p>
                  </div>
                  <div className="w-[400px] h-[45px] p-1 border-b border-app-secondary-lighter flex items-center justify-around">
                    <p className="flex-1 text-center font-serif font-semibold text-black">
                      Paid
                    </p>
                    <p className="flex-1 text-center font-serif text-green-500">
                      {monthlyBill(student[0], teachersGroups).paid} so'm
                    </p>
                  </div>
                  <div className="w-[400px] h-[45px] p-1 border-b border-app-secondary-lighter flex items-center justify-around">
                    <p className="flex-1 text-center font-serif font-semibold text-black">
                      Debt
                    </p>
                    <p className="flex-1 text-center font-serif text-red-500">
                      {-monthlyBill(student[0], teachersGroups).debt} so'm
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default Cash;
