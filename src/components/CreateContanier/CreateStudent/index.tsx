import { useState } from "react";

import AppCreateLayout from "src/components/shared/createLayout";

import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "src/store/hooks";

import { CASE, ROLE, User } from "src/models";

import AppLayout from "src/components/shared/layout";
import SelectDropdown from "src/components/shared/select";

import { MdDelete } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { Loader } from "src/components/shared/loader";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "src/lib/firebase/init";
import { createUser } from "src/lib/firebase/services/user";
import { UserActions } from "src/store/features/user";
import { UserSliceActions } from "src/store/features/users";

import NumberFormat from "react-number-format";

function CreateStudent() {
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
      case: CASE.existent,
      deletedTime: "",
    };

    console.log(data);

    try {
      const userId = await createUser(data);
      dispatch(UserActions.setUser({ ...data, id: userId }));
      dispatch(UserSliceActions.addUser({ ...data, id: userId }));
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
    } catch (error) {
      toast.error("There was error to add teacher");
      setIsSaving(false);
    }
  };

  return (
    <AppLayout>
      <AppCreateLayout>
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col items-center p-1 bg-white shadow-md"
        >
          <div className=" w-full h-auto flex items-center justify-center my-1">
            <p className=" font-bold font-serif text-lg">Create Student</p>
          </div>
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
          <div className="w-full h-auto bg-white flex flex-col items-center">
            <div className=" w-[60%] flex-[1] h-full flex items-center justify-between p-2">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
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
                <p className=" relative left-1 top-1 font-semibold">
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
            <div className="  w-[60%] flex-[1] h-full flex items-center justify-between p-2">
              <div>
                <p className=" relative left-1 top-1 font-semibold">Teacher</p>
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
                <p className=" relative left-1 top-1 font-semibold">Group</p>
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
            <div className=" w-[60%] flex-[1] h-full flex items-center justify-between p-2">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
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
                <p className=" relative left-1 top-1 font-semibold">Discount</p>
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
            <div className=" w-[60%] flex-[1] h-full  p-2">
              <div className=" w-full h-full">
                <p className=" relative left-1 top-1 font-semibold">About</p>
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

export default CreateStudent;
