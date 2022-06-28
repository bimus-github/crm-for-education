import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { Days, Group, ROLE } from "src/models";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import SelectDropdown from "../../select";
import { CheckboxIcon, UncheckedBoxIcon } from "src/components/shared/icons";
import toast from "react-hot-toast";
import {
  deleteGroup,
  updateGroup,
} from "../../../../lib/firebase/services/group";
import { GroupsSliceActions } from "src/store/features/groups";
import { GroupActions } from "src/store/features/group";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  item: any;
}

const ChanegGroup = ({ isOpen, setIsOpen, item }: Props) => {
  const dispatch = useAppDispatch();

  const usersSlice = useAppSelector((state) => state.usersSlice);

  const schoolSlice = useAppSelector((state) => state.schoolSlice);

  const teachers = Object.values(usersSlice).filter(
    (u) => u.role === ROLE.TEACHER
  );

  const [isSaving, setIsSaving] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState({
    name: teachers.filter((t) => t?.id === item?.teacher?.user)[0]?.firstName,
    value: teachers.filter((t) => t?.id === item?.teacher?.user)[0]?.id,
  });
  const [selectedLanguage, setSelectedLanguage] = useState({
    name: item?.language?.name,
    value: "0",
  });
  const [days, setDays] = useState<Days[]>([]);
  const [gorupName, setGroupName] = useState(item?.name);
  const [price, setPrice] = useState(item?.price);
  const [percentage, setPercentage] = useState(
    item?.teacher?.monthlyBillPercentage
  );
  const [startTime, setStartTime] = useState(item?.startedTime);
  const [endTime, setEndTime] = useState(item?.endTime);
  const [about, setAbout] = useState(item?.about);
  const [room, setRoom] = useState(item?.room);
  const [open, setOpen] = useState<boolean>(false);

  const languages = Object.values(usersSlice).filter(
    (u) => u.role === ROLE.TEACHER && u?.id === selectedTeacher?.value
  )[0]?.languages;

  const onClear = () => {
    setSelectedTeacher({
      name: teachers.filter((t) => t?.id === item?.teacher?.user)[0]?.firstName,
      value: teachers.filter((t) => t?.id === item?.teacher?.user)[0]?.id,
    });
    setSelectedLanguage({
      name: item?.language?.name,
      value: "0",
    });
    setDays([]);
    setGroupName(item?.name);
    setPrice(item?.price);
    setPercentage(item?.teacher?.monthlyBillPercentage);
    setStartTime(item?.startedTime);
    setEndTime(item?.endTime);
    setAbout(item?.about);
    setRoom(item?.room);
  };

  const onHandleSubmit = async (e: any) => {
    const data: Group = {
      id: item?.id,
      name: gorupName,
      language: selectedLanguage,
      price: price,
      startedTime: item?.startedTime,
      school: item?.school,
      teacher: {
        user: selectedTeacher.value,
        monthlyBillPercentage: percentage,
      },
      schedule: {
        days: days ? days : item?.days,
        time: {
          start: startTime,
          end: endTime,
        },
      },
      room: room,
    };

    setIsSaving(true);

    try {
      const groupId = await updateGroup(data);
      dispatch(GroupsSliceActions.deleteGroup(item));
      dispatch(GroupActions.setGroup({ ...data, id: groupId }));
      dispatch(GroupsSliceActions.addGroup({ ...data, id: groupId }));
      toast.success("Group has successfully been added");
      setIsSaving(false);
      setIsOpen(false);
    } catch (error) {
      console.log(error);
      toast.error("There was error to add Group");
      setIsSaving(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => {
            setIsOpen(false);
          }}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-[800px] h-[550px] flex flex-col items-center transform overflow-hidden rounded-2xl bg-white p-6 text-center align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg  font-medium leading-6 text-gray-900"
                  >
                    Change group - {item?.name}
                  </Dialog.Title>
                  <div className="h-[450px] w-[700px] py-2 flex flex-col items-center  gap-2">
                    <div className=" w-full flex-1 flex justify-between items-center">
                      <div>
                        <p className=" text-sm relative text-left left-1 top-1 font-mono">
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
                        <p className=" text-sm relative text-left left-1 top-1 font-mono">
                          Price
                        </p>
                        <input
                          onChange={(e) => setPrice(e.target.value)}
                          title="Price"
                          value={price}
                          className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                          type="text"
                          placeholder="Price"
                        />
                      </div>
                    </div>
                    <div className=" w-full flex-1 flex justify-between items-center">
                      <div>
                        <p className=" text-sm relative text-left left-1 top-1 font-mono">
                          Teacher
                        </p>
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
                      <div className="flex items-center justify-around ">
                        <div>
                          <p className=" relative  text-left left-1 top-1 text-sm font-mono">
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
                          <p className="relative text-left left-1 top-1 text-sm font-mono">
                            End Time
                          </p>
                          <input
                            onChange={(e) => setEndTime(e.target.value)}
                            value={endTime}
                            className="w-[146px] h-[40px] ml-2 rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                            type="time"
                            placeholder="15:00"
                          />
                        </div>
                      </div>
                    </div>
                    <div className=" w-full flex-1 flex justify-between items-center">
                      <div>
                        <p className=" relative text-left left-1 top-1 text-sm font-mono">
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
                        <p className=" relative text-left left-1 top-1 text-sm font-mono">
                          Language
                        </p>
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
                        <p className=" text-left  relative left-1 top-1">
                          About
                        </p>
                        <textarea
                          onChange={(e) => setAbout(e.target.value)}
                          value={about}
                          title="About"
                          className="w-[480px] h-[60px] rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                          placeholder="About ..."
                        />
                      </div>
                      <div className="">
                        <p className=" relative left-1 top-1 text-left">Room</p>
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
                    <div className=" w-[600px] flex-1 flex justify-between items-center">
                      <div
                        className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                        onClick={() => {
                          if (days?.includes("Mon")) {
                            const updatedDays = [...days];
                            const idx = days?.findIndex(
                              (item) => item === "Mon"
                            );
                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Mon"]);
                        }}
                      >
                        {days?.includes("Mon") ? (
                          <CheckboxIcon className="w-5" />
                        ) : (
                          <UncheckedBoxIcon className="w-5" />
                        )}
                        Mon
                      </div>
                      <div
                        className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                        onClick={() => {
                          if (days?.includes("Tue")) {
                            const updatedDays = [...days];
                            const idx = days?.findIndex(
                              (item) => item === "Tue"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Tue"]);
                        }}
                      >
                        {days?.includes("Tue") ? (
                          <CheckboxIcon className="w-5" />
                        ) : (
                          <UncheckedBoxIcon className="w-5" />
                        )}
                        Tue
                      </div>
                      <div
                        className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                        onClick={() => {
                          if (days?.includes("Wed")) {
                            const updatedDays = [...days];
                            const idx = days?.findIndex(
                              (item) => item === "Wed"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Wed"]);
                        }}
                      >
                        {days?.includes("Wed") ? (
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
                            const idx = days.findIndex(
                              (item) => item === "Thurs"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Thurs"]);
                        }}
                      >
                        {days?.includes("Thurs") ? (
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
                            const idx = days.findIndex(
                              (item) => item === "Fri"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Fri"]);
                        }}
                      >
                        {days?.includes("Fri") ? (
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
                            const idx = days.findIndex(
                              (item) => item === "Sat"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Sat"]);
                        }}
                      >
                        {days?.includes("Sat") ? (
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
                            const idx = days.findIndex(
                              (item) => item === "Sun"
                            );

                            updatedDays.splice(idx, 1);
                            return setDays(updatedDays);
                          }

                          setDays([...days, "Sun"]);
                        }}
                      >
                        {days?.includes("Sun") ? (
                          <CheckboxIcon className="w-5" />
                        ) : (
                          <UncheckedBoxIcon className="w-5" />
                        )}
                        Sun
                      </div>
                    </div>
                    <div className=" w-[600px] flex-1 flex justify-between items-center">
                      <button
                        onClick={() => setIsOpen(false)}
                        className="text-sm hover:bg-app-secondary bg-app-secondary-lighter font-mono w-[180px] rounded-md h-[35px]"
                      >
                        Go Back
                      </button>
                      <button
                        onClick={onClear}
                        disabled={isSaving}
                        className="text-sm bg-red-500 hover:bg-red-600 font-mono w-[180px] rounded-md h-[35px]"
                      >
                        Clear
                      </button>
                      <button
                        onSubmit={onHandleSubmit}
                        disabled={isSaving}
                        className="text-sm bg-app-primary hover:bg-yellow-600 font-mono w-[180px] rounded-md  h-[35px]"
                      >
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default ChanegGroup;
