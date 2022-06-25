import { useState } from "react";

import AppLayout from "src/components/shared/layout";
import AppCreateLayout from "src/components/shared/createLayout";

import { CASE, Days, Group, ROLE } from "../../../models/index";

import { CheckboxIcon, UncheckedBoxIcon } from "src/components/shared/icons";
import toast from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import SelectDropdown from "src/components/shared/select";
import { createGroup } from "src/lib/firebase/services/group";
import { GroupActions } from "src/store/features/group";
import { GroupsSliceActions } from "src/store/features/groups";

function CreateGroup() {
  const dispatch = useAppDispatch();

  const usersSlice = useAppSelector((state) => state.usersSlice);

  const schoolSlice = useAppSelector((state) => state.schoolSlice);

  const teachers = Object.values(usersSlice).filter(
    (u) => u.role === ROLE.TEACHER && u.case === CASE.existent
  );

  const [isSaving, setIsSaving] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({
    name: "Teacher",
    value: "Teacher",
  });
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: "Language",
    value: "0",
  });
  const [days, setDays] = useState<Days[]>([]);
  const [gorupName, setGroupName] = useState("");
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [about, setAbout] = useState("");
  const [room, setRoom] = useState("");

  const languages = Object.values(usersSlice).filter(
    (u) =>
      u.role === ROLE.TEACHER &&
      u.firstName.toLocaleLowerCase() ===
        selectedTeacher.name.toLocaleLowerCase()
  )[0]?.languages;

  console.log(Object.values(usersSlice));

  const onClear = () => {
    setGroupName("");
    setPrice("");
    setPercentage("");
    setStartTime("");
    setEndTime("");
    setAbout("");
    setRoom("");
    setSelectedTeacher({ name: "Teacher", value: "Teacher" });
    setSelectedLanguage({
      name: "Language",
      value: "0",
    });
    setDays([]);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      days == [] ||
      gorupName == "" ||
      price == "" ||
      percentage == "" ||
      startTime == "" ||
      endTime == "" ||
      about == "" ||
      room == "" ||
      selectedLanguage ==
        {
          name: "Language",
          value: "0",
        }
    ) {
      return toast.error("Required. Please, fill in all the boxes!");
    }

    const data: Group = {
      id: "",
      name: gorupName,
      case: CASE.existent,
      language: selectedLanguage,
      teacher: {
        user: selectedTeacher.value,
        monthlyBillPercentage: percentage,
      },
      schedule: {
        days: days,
        time: {
          start: startTime,
          end: endTime,
        },
      },
      school: schoolSlice.id,
      startedTime: Date.now().toString(),
      price: Number(price),
      room: room,
    };

    console.log(data);

    setIsSaving(true);

    try {
      const groupId = await createGroup(data);
      dispatch(GroupActions.setGroup({ ...data, id: groupId }));
      dispatch(GroupsSliceActions.addGroup({ ...data, id: groupId }));
      toast.success("Teacher has successfully been added");
      setIsSaving(false);
      onClear();
    } catch (error) {
      console.log(error);
      toast.error("There was error to add teacher");
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <AppCreateLayout>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-center justify-center bg-white shadow-md px-3"
        >
          <div className=" w-full h-auto flex items-center justify-center my-1">
            <p className=" font-bold font-serif text-lg">Create Group</p>
          </div>
          <div className=" w-[700px] h-full flex flex-col items-center">
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Group Name
                </p>
                <input
                  onChange={(e) => setGroupName(e.target.value)}
                  title="Group name"
                  value={gorupName}
                  className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="Name"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">Price</p>
                <input
                  onChange={(e) => setPrice(e.target.value)}
                  title="Price"
                  value={price}
                  className="w-[299px] h-[40px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="number"
                  placeholder="500 000 so'm"
                />
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">Teacher</p>
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
              <div className="flex items-start  gap-3 ">
                <div>
                  <p className=" relative left-1 top-1 font-semibold">
                    Start Time
                  </p>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                    title="Start Time"
                    className="w-[146px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                    type="time"
                    placeholder="12:00"
                  />
                </div>
                <div>
                  <p className=" relative left-1 top-1 font-semibold">
                    End Time
                  </p>
                  <input
                    onChange={(e) => setEndTime(e.target.value)}
                    value={endTime}
                    className="w-[146px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                    type="time"
                    placeholder="15:00"
                  />
                </div>
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Percentage
                </p>
                <input
                  title="Percentage"
                  onChange={(e) => setPercentage(e.target.value)}
                  value={percentage}
                  className="w-[299px] h-[40px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="10%"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">Language</p>
                <SelectDropdown
                  value={selectedLanguage}
                  options={
                    languages
                      ? languages.map((t) => {
                          return {
                            name: `${t}`,
                            value: t,
                          };
                        })
                      : []
                  }
                  onChange={(v) => setSelectedLanguage(v)}
                />
              </div>
            </div>
            <div className="w-full flex-[1] h-full flex items-start justify-between">
              <div className="">
                <p className="  relative left-1 top-1 font-semibold">About</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  required
                  title="About"
                  className="w-[480px] h-[60px] rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  placeholder="About ..."
                />
              </div>
              <div className="">
                <p className=" relative left-1 top-1 font-semibold">Room</p>
                <input
                  onChange={(e) => setRoom(e.target.value)}
                  value={room}
                  title="Start Time"
                  className="w-[146px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="A1"
                />
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full  flex justify-between">
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Mon")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Mon");
                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Mon"]);
                }}
              >
                {days.includes("Mon") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Mon
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Tue")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Tue");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Tue"]);
                }}
              >
                {days.includes("Tue") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Tue
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Wed")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Wed");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Wed"]);
                }}
              >
                {days.includes("Wed") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Wed
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Thurs")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Thurs");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Thurs"]);
                }}
              >
                {days.includes("Thurs") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Thurs
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Fri")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Fri");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Fri"]);
                }}
              >
                {days.includes("Fri") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Fri
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Sat")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Sat");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Sat"]);
                }}
              >
                {days.includes("Sat") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Sat
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (days.includes("Sun")) {
                    const updatedDays = [...days];
                    const idx = days.findIndex((item) => item === "Sun");

                    updatedDays.splice(idx, 1);
                    return setDays(updatedDays);
                  }

                  setDays([...days, "Sun"]);
                }}
              >
                {days.includes("Sun") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Sun
              </div>
            </div>
            <div className=" my-1 w-[40%] flex-[1] h-full flex items-center justify-between gap-10">
              <button
                onClick={onClear}
                disabled={isSaving}
                type="button"
                className=" w-[200px] h-[40px] border rounded-[5px] bg-app-secondary-lighter shadow-lg text-white font-bold "
              >
                Cancel
              </button>
              <button
                disabled={isSaving}
                type="submit"
                className=" w-[200px] h-[40px] border rounded-[5px] pl-2 bg-red-500 shadow-lg text-white font-bold "
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </AppCreateLayout>
    </AppLayout>
  );
}

export default CreateGroup;
