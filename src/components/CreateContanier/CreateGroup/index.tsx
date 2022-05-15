import { Fragment, useState } from "react";

import { Listbox, Combobox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";

import AppLayout from "src/components/shared/layout";
import AppCreateLayout from "src/components/shared/createLayout";

import { Days, Group, Subjects } from "../../../models/index";

import { CheckboxIcon, UncheckedBoxIcon } from "src/components/shared/icons";
import { group } from "console";
import toast from "react-hot-toast";

const people = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const language = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

const subjects = [
  { id: 1, name: "Wade Cooper" },
  { id: 2, name: "Arlene Mccoy" },
  { id: 3, name: "Devon Webb" },
  { id: 4, name: "Tom Cook" },
  { id: 5, name: "Tanya Fox" },
  { id: 6, name: "Hellen Schmidt" },
];

function CreateGroup() {
  const [isSaving, setIsSaving] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(people[0]);
  const [selectedSubject, setSelectedSubject] = useState(subjects[0]);
  const [selectedLanguage, setSelectedLanguage] = useState(language[0]);
  const [days, setDays] = useState<Days[]>([]);
  const [gorupName, setGroupName] = useState("");
  const [price, setPrice] = useState("");
  const [percentage, setPercentage] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [about, setAbout] = useState("");

  const onClear = () => {
    setGroupName("");
    setPrice("");
    setPercentage("");
    setStartTime("");
    setEndTime("");
    setAbout("");
    setSelectedTeacher(people[0]);
    setSelectedSubject(subjects[0]);
    setSelectedLanguage(language[0]);
    setDays([]);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (
      days == [] ||
      gorupName == "" ||
      price == "" ||
      percentage == "" ||
      startTime == "" ||
      endTime == "" ||
      about == "" ||
      selectedTeacher == people[0] ||
      selectedSubject == subjects[0] ||
      selectedLanguage == language[0]
    ) {
      return toast.error("Required. Please, fill in all the boxes!");
    }

    const data: Group = {
      id: "",
      name: gorupName,
      language: selectedLanguage,
      monthlyBill: price,
      teacher: {
        user: selectedTeacher.name,
        monthlyBillPercentage: percentage,
      },
      students: [],
      schedule: {
        days: days,
        time: {
          start: Number(startTime),
          end: Number(endTime),
        },
      },
    };

    toast.success("Group has successfully been added", data);
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
          <div className=" w-[90%] h-full flex flex-col items-center">
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Group Name
                </p>
                <input
                  onChange={(e) => setGroupName(e.target.value)}
                  title="Group name"
                  value={gorupName}
                  className="w-[299px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
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
                  className="w-[299px] h-[53px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="500 000 so'm"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">Teacher</p>
                <Listbox value={selectedTeacher} onChange={setSelectedTeacher}>
                  <div className="relative mt-2 z-[2]">
                    <Listbox.Button className="w-[299px] h-[53px] flex justify-between items-center rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400">
                      <span className="block truncate">
                        {selectedTeacher.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiOutlineSelector
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {people.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <AiOutlineCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">Subject</p>
                <Listbox value={selectedSubject} onChange={setSelectedSubject}>
                  <div className="relative mt-1 z-[1]">
                    <Listbox.Button className="w-[299px] h-[53px] flex justify-between items-center rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400">
                      <span className="block truncate">
                        {selectedSubject.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiOutlineSelector
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {subjects.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <AiOutlineCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Percentage
                </p>
                <input
                  title="Percentage"
                  onChange={(e) => setPercentage(e.target.value)}
                  value={percentage}
                  className="w-[299px] h-[53px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="10%"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">Language</p>
                <Listbox
                  value={selectedLanguage}
                  onChange={setSelectedLanguage}
                >
                  <div className="relative mt-1 z-[1]">
                    <Listbox.Button className="w-[299px] h-[53px] flex justify-between items-center rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400">
                      <span className="block truncate">
                        {selectedLanguage.name}
                      </span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <HiOutlineSelector
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {language.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-amber-100 text-amber-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                    <AiOutlineCheck
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className="  relative left-1 top-1 font-semibold">About</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  required
                  title="About"
                  className="w-[655px] h-[100px] rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  placeholder="About ..."
                />
              </div>
              <div className="flex items-start relative -top-[24px] gap-3 ">
                <div>
                  <p className=" relative left-1 top-1 font-semibold">
                    Start Time
                  </p>
                  <input
                    onChange={(e) => setStartTime(e.target.value)}
                    value={startTime}
                    title="Start Time"
                    className="w-[146px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                    type="number"
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
                    className="w-[146px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                    type="number"
                    placeholder="15:00"
                  />
                </div>
              </div>
            </div>
            <div className=" my-1 w-[65%] flex-[1] h-full self-start flex justify-between">
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
            <div className=" my-1 w-[50%] flex-[1] h-full flex items-center justify-between gap-10">
              <button
                onClick={onClear}
                disabled={isSaving}
                type="button"
                className=" w-[200px] h-[45px] border rounded-[5px] bg-app-secondary-lighter shadow-lg text-white font-bold "
              >
                Cancel
              </button>
              <button
                disabled={isSaving}
                type="submit"
                className=" w-[200px] h-[45px] border rounded-[5px] pl-2 bg-red-500 shadow-lg text-white font-bold "
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
