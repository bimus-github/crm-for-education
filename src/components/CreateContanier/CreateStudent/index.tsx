import { useState, Fragment } from "react";

import { Listbox, Combobox, Transition } from "@headlessui/react";
import { AiOutlineCheck } from "react-icons/ai";
import { HiOutlineSelector } from "react-icons/hi";

import AppLayout from "src/components/shared/layout";
import AppCreateLayout from "src/components/shared/createLayout";
import toast from "react-hot-toast";

const teachers = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];
const groups = [
  { name: "Wade Cooper" },
  { name: "Arlene Mccoy" },
  { name: "Devon Webb" },
  { name: "Tom Cook" },
  { name: "Tanya Fox" },
  { name: "Hellen Schmidt" },
];

function CreateStudent() {
  const [selectedTeacher, setSelectedTeacher] = useState(teachers[0]);
  const [selectedGroup, setSelectedGroup] = useState(groups[0]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [sale, setSale] = useState("");
  const [about, setAbout] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  const onClear = () => {
    if (
      selectedTeacher == teachers[0] ||
      selectedGroup == groups[0] ||
      firstName == "" ||
      lastName == "" ||
      number == "" ||
      sale == "" ||
      about == ""
    ) {
      return toast.error("Required. Please, fill in all the boxes!");
    }
  };

  const handleSubmit = (e: any) => {
    e.preventDeafult();
    const data = {
      id: "",
      firstName,
      lastName,
      phone: number,
      sale: sale,
      about,
      teacher: selectedTeacher.name,
      group: selectedGroup.name,
    };
    toast.success("Group has successfully been added", data);
  };

  return (
    <AppLayout>
      <AppCreateLayout>
        <div className="w-full h-full bg-white shadow-md flex flex-col items-center">
          <div className=" w-full h-[5%] flex items-center justify-center font-bold font-serif text-lg">
            Create Student
          </div>
          <form
            onSubmit={handleSubmit}
            className=" h-[95%] w-full flex flex-col justify-around items-center pb-2"
          >
            <div className=" my-1 w-[60%] flex-[1] h-full flex items-center justify-between p-2">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  First Name
                </p>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  value={firstName}
                  className="w-[299px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="First Name"
                  title="First Name"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Last Name
                </p>
                <input
                  onChange={(e) => setLastName(e.target.value)}
                  title="Last Name"
                  value={lastName}
                  className="w-[299px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className=" my-1 w-[60%] flex-[1] h-full flex items-center justify-between p-2">
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
                        {teachers.map((person, personIdx) => (
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
                <p className=" relative left-1 top-1 font-semibold">Group</p>
                <Listbox value={selectedGroup} onChange={setSelectedGroup}>
                  <div className="relative mt-2 z-[2]">
                    <Listbox.Button className="w-[299px] h-[53px] flex justify-between items-center rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400">
                      <span className="block truncate">
                        {selectedGroup.name}
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
                        {groups.map((person, personIdx) => (
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
            <div className=" my-1 w-[60%] flex-[1] h-full flex items-center justify-between p-2">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  Phone number
                </p>
                <input
                  onChange={(e) => setNumber(e.target.value)}
                  title="Phone number"
                  value={number}
                  className="w-[299px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="Phone"
                />
              </div>
              <div>
                <p className=" relative left-1 top-1 font-semibold">Sale</p>
                <input
                  onChange={(e) => setSale(e.target.value)}
                  title="Sale"
                  value={sale}
                  className="w-[299px] h-[53px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="10%"
                />
              </div>
            </div>
            <div className=" my-1 w-[60%] flex-[1.3] h-full  p-2">
              <div className=" w-full h-full">
                <p className=" relative left-1 top-1 font-semibold">About</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  required
                  title="About"
                  className="w-full h-[90%] rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  placeholder="About ..."
                />
              </div>
            </div>
            <div className=" w-full flex-[1] h-full flex items-center justify-center gap-10">
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
          </form>
        </div>
      </AppCreateLayout>
    </AppLayout>
  );
}

export default CreateStudent;
