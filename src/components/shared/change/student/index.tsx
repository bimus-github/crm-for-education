import { Dialog, Transition } from "@headlessui/react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { BsPerson } from "react-icons/bs";
import { MdDelete } from "react-icons/md";
import NumberFormat from "react-number-format";
import { storage } from "src/lib/firebase/init";
import { updateUser } from "src/lib/firebase/services/user";

import { CASE, ROLE, User } from "src/models";
import { UserActions } from "src/store/features/user";

import { UserSliceActions } from "src/store/features/users";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { Loader } from "../../loader";
import SelectDropdown from "../../select";

interface Props {
  isOpen: boolean;
  setIsOpen: (v: boolean) => void;
  item: any;
}

function ChangeStudent({ isOpen, setIsOpen, item }: Props) {
  const dispatch = useAppDispatch();

  const groupsSlice = useAppSelector((state) => state.groupsSlice);

  const teachersSlice = useAppSelector((s) => s.usersSlice);

  const teachers = Object.values(teachersSlice)?.filter(
    (t) => t?.role === ROLE.TEACHER
  );

  const [selectedTeacher, setSelectedTeacher] = useState({
    name: "Teacher",
    value: "Teacher",
  });
  const [selectedGroup, setSelectedGroup] = useState({
    name: "Group",
    value: "Group",
  });
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [sale, setSale] = useState("");
  const [about, setAbout] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [img, setImg] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const groups = Object.values(groupsSlice)?.filter(
    (g) => g.teacher.user === selectedTeacher?.value
  );

  const onUploadImg = (e: any) => {
    setIsLoading(true);

    const imageFile = e.target.files[0];
    const imageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const upLoadTask = uploadBytesResumable(imageRef, imageFile);

    upLoadTask.on(
      "state_changed",
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        toast.error("Error to uploading!!!");
        console.log(error);
      },
      () => {
        getDownloadURL(upLoadTask.snapshot.ref).then((downloadUrl) => {
          toast.success("Uploading has done successfully");
          setImg(downloadUrl);
          setUploaded(true);
          setIsLoading(false);
        });
      }
    );
  };

  const onDeletImg = () => {
    setIsLoading(true);

    const deletRef = ref(storage, img);

    deleteObject(deletRef).then(() => {
      setImg("");
      setUploaded(false);
      setIsLoading(false);
      toast.custom("Iamge has deleted seccessfully!!!");
    });
  };

  const onClear = () => {
    onDeletImg();
    setSelectedTeacher({
      name: "Teacher",
      value: "Teacher",
    });
    setSelectedGroup({
      name: "Group",
      value: "Group",
    });
    setFirstName("");
    setLastName("");
    setNumber("");
    setSale("");
    setAbout("");
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      selectedTeacher ==
        {
          name: "Teacher",
          value: "Teacher",
        } ||
      selectedGroup ==
        {
          name: "Group",
          value: "Group",
        } ||
      firstName == "" ||
      lastName == "" ||
      number == "" ||
      // img?.length ||
      sale == "" ||
      about == ""
    ) {
      return toast.error("Required. Please, fill in all the boxes!");
    }

    setIsSaving(true);

    const data: User = {
      id: "",
      case: CASE.existent,
      firstName,
      lastName,
      phone: number,
      role: ROLE.STUDENT,
      sale: sale,
      about: about,
      teacher: selectedTeacher.value,
      group: selectedGroup.value,
      school: groups[0].school,
      email: "",
      img: img,
      startedTime: Date.now().toString(),
      paid: 0,
    };

    console.log(data);

    try {
      updateUser(data);
      dispatch(UserSliceActions.removeUser(item));
      dispatch(UserSliceActions.addUser(data));
      dispatch(UserActions.setUser(data));
      toast.success("Teacher has successfully been added");
      setSelectedTeacher({
        name: "Teacher",
        value: "Teacher",
      });
      setSelectedGroup({
        name: "Group",
        value: "Group",
      });
      setImg("");
      setUploaded(false);
      setIsLoading(false);
      setFirstName("");
      setLastName("");
      setNumber("");
      setSale("");
      setAbout("");
      setIsSaving(false);
      setIsOpen(false);
    } catch (error) {
      toast.error("There was error to add teacher");
      setIsSaving(false);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => setIsOpen(false)}
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
                    className=" text-lg font-medium leading-6 text-gray-900"
                  >
                    Change Teacher - "{item?.firstName}"
                  </Dialog.Title>
                  <form
                    onSubmit={handleSubmit}
                    className="h-[540px] w-[700px]  flex flex-col items-center p-1 "
                  >
                    <>
                      {!uploaded ? (
                        <label id={"uploadImage"} className="cursor-pointer">
                          <div className=" w-full h-[70px] flex flex-col items-center ">
                            {isLoading ? (
                              <Loader />
                            ) : (
                              <>
                                <div className=" w-[70px] h-[70px] rounded-full shadow-lg p-3  hover:bg-app-background">
                                  <BsPerson className=" w-full h-full hover:text-app-secondary   text-app-secondary-lighter" />
                                </div>
                                <p className=" font-serif text-base text-app-secondary-lighter mt-2">
                                  Profile Photo
                                </p>
                              </>
                            )}
                          </div>
                          <input
                            onChange={(e) => onUploadImg(e)}
                            type="file"
                            name="uploadImage"
                            accept="image/*"
                            className="w-[0px] h-[0px]"
                          />
                        </label>
                      ) : (
                        <div className="flex flex-col w-full items-center">
                          <div className=" ">
                            <img
                              alt="profile"
                              src={img}
                              className="w-[90px] bg-white h-[90px] rounded-full shadow-md"
                            />
                          </div>
                          <div
                            onClick={onDeletImg}
                            className=" relative bottom-5 left-32 w-6 h-6 rounded-3xl hover:bg-red-500 bg-app-primary flex justify-center items-center"
                          >
                            <MdDelete color="red" size={20} />
                          </div>
                        </div>
                      )}
                    </>
                    <div className="w-full h-auto  flex flex-col items-center">
                      <div className=" w-full flex-[1] h-full flex items-center justify-between p-2">
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            First Name
                          </p>
                          <input
                            onChange={(e) => setFirstName(e.target.value)}
                            value={firstName}
                            className="w-[299px] h-[45px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                            type="text"
                            placeholder="First Name"
                            title="First Name"
                          />
                        </div>
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            Last Name
                          </p>
                          <input
                            onChange={(e) => setLastName(e.target.value)}
                            title="Last Name"
                            value={lastName}
                            className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                            type="text"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div className=" w-full flex-[1] h-full flex items-center justify-between p-2">
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            Teacher
                          </p>
                          <SelectDropdown
                            value={selectedTeacher}
                            options={[...teachers].map((t) => {
                              return {
                                name: t.firstName,
                                value: t.id,
                              };
                            })}
                            onChange={(v) => setSelectedTeacher(v)}
                          />
                        </div>
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            Group
                          </p>
                          <SelectDropdown
                            value={selectedGroup}
                            options={[...groups].map((g) => {
                              return {
                                name: g.name,
                                value: g.id,
                              };
                            })}
                            onChange={(v) => setSelectedGroup(v)}
                          />
                        </div>
                      </div>
                      <div className=" w-full flex-[1] h-full flex items-center justify-between p-2">
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            Phone number
                          </p>
                          <NumberFormat
                            placeholder="Phone"
                            value={number}
                            onValueChange={(values) => {
                              const { formattedValue, value } = values;

                              setNumber(value);
                            }}
                            format="+998 (##) ###-##-##, 998 (##) ### ## ##"
                            mask="_"
                            className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                          />
                        </div>
                        <div>
                          <p className=" relative text-left left-1 top-1 font-serif">
                            Discount
                          </p>
                          <input
                            onChange={(e) => setSale(e.target.value)}
                            title="Sale"
                            value={sale}
                            className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                            type="text"
                            placeholder="10%"
                          />
                        </div>
                      </div>
                      <div className=" w-full flex-[1] h-full  p-2">
                        <div className=" w-full h-full">
                          <p className=" relative text-left left-1 top-1 font-serif">
                            About
                          </p>
                          <textarea
                            onChange={(e) => setAbout(e.target.value)}
                            value={about}
                            required
                            title="About"
                            className="w-full h-[full] rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                            placeholder="About ..."
                          />
                        </div>
                      </div>
                      <div className=" w-full flex-[1] h-full flex items-center justify-center gap-10">
                        <button
                          onClick={() => setIsOpen(false)}
                          type="button"
                          className=" w-[200px] h-[40px] border rounded-[5px] bg-app-secondary-lighter shadow-lg text-white font-bold "
                        >
                          Back
                        </button>
                        <button
                          onClick={onClear}
                          disabled={isSaving}
                          type="button"
                          className=" w-[200px] h-[40px] border rounded-[5px] pl-2 bg-red-500 shadow-lg text-white font-bold "
                        >
                          Clear
                        </button>
                        <button
                          disabled={isSaving}
                          className=" w-[200px] h-[40px] border rounded-[5px] bg-app-primary shadow-lg text-white font-bold "
                          type="submit"
                        >
                          Save
                        </button>
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}

export default ChangeStudent;
