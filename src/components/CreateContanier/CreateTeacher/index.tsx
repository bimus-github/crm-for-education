import React, { useState } from "react";

import AppLayout from "src/components/shared/layout";
import AppCreateLayout from "src/components/shared/createLayout";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { storage } from "src/lib/firebase/init";

import toast from "react-hot-toast";
import Loader from "src/components/Loader";

import { MdDelete } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { CASE, Language, ROLE, User } from "src/models";
import { CheckboxIcon, UncheckedBoxIcon } from "src/components/shared/icons";
import { createUser } from "src/lib/firebase/services/user";
import { useAppDispatch, useAppSelector } from "src/store/hooks";
import { UserActions } from "src/store/features/user";
import NumberFormat from "react-number-format";
import { UserSliceActions } from "src/store/features/users";

function CreateTeacher() {
  const dispatch = useAppDispatch();

  const schoolSlice = useAppSelector((state) => state.schoolSlice);

  const [isSaving, setIsSaving] = useState(false);
  const [img, setImg] = useState("");
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [number, setNumber] = useState("");
  const [email, setEmail] = useState("");
  const [about, setAbout] = useState("");
  const [langs, setLangs] = useState<Language[]>([]);
  const [password, setPassword] = useState("");

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
    setAbout("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setNumber("");
    setPassword("");
    setLangs([]);

    if (img !== "") {
      setIsLoading(true);
      const deletRef = ref(storage, img);

      deleteObject(deletRef).then(() => {
        setImg("");
        setUploaded(false);
        setIsLoading(false);
        toast.custom("Iamge has deleted seccessfully!!!");
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      about === "" ||
      email === "" ||
      firstName === "" ||
      lastName === "" ||
      number === "" ||
      password === ""
    ) {
      return toast.error("Required. Please, fill in all the boxes!");
    }

    const data: User = {
      id: "",
      role: ROLE.TEACHER,
      case: CASE.existent,
      firstName: firstName,
      lastName: lastName,
      phone: number,
      email,
      about,
      img,
      languages: langs,
      school: schoolSlice.id,
      startedTime: Date.now().toString(),
      password: password,
    };

    setIsSaving(true);

    console.log(data);

    try {
      const userId = await createUser(data);
      dispatch(UserSliceActions.addUser({ ...data, id: userId }));
      dispatch(UserActions.setUser({ ...data, id: userId }));
      toast.success("Teacher has successfully been added");
      setAbout("");
      setEmail("");
      setFirstName("");
      setLastName("");
      setNumber("");
      setLangs([]);
      setIsSaving(false);
      setIsLoading(true);
      setImg("");
      setUploaded(false);
      setIsLoading(false);
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
            <p className=" font-bold font-serif text-lg">Create Teacher</p>
          </div>

          <>
            {!uploaded ? (
              <label id={"uploadImage"} className="cursor-pointer">
                <div className=" w-full h-[100px] flex flex-col items-center my-2">
                  {isLoading ? (
                    <Loader />
                  ) : (
                    <>
                      <div className=" w-[100px] h-[100px] rounded-full shadow-lg p-3  hover:bg-app-background">
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

          <div className=" w-[655px] h-full flex flex-col items-center">
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
              <div>
                <p className=" relative left-1 top-1 font-semibold">
                  First Name
                </p>
                <input
                  onChange={(e) => setFirstName(e.target.value)}
                  title="First Name"
                  value={firstName}
                  className="w-[299px] h-[40px] rounded-[5px] border shadow-lg pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="First Name"
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
                  className="w-[299px] h-[40px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="text"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className=" my-1 w-full flex-[1] h-full flex items-center justify-between">
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
                <p className=" relative left-1 top-1 font-semibold">Email</p>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  title="Email"
                  value={email}
                  className="w-[299px] h-[40px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="email"
                  placeholder="Email"
                />
              </div>
            </div>
            <div className=" my-1 w-full flex-[1.3] h-full flex items-center justify-between">
              <div className="w-[299px] h-full">
                <p className=" relative left-1 top-1 font-semibold">About</p>
                <textarea
                  onChange={(e) => setAbout(e.target.value)}
                  value={about}
                  required
                  title="About"
                  className="w-full  rounded-[5px] border pl-2 outline-none shadow-lg ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  placeholder="About ..."
                />
              </div>
              <div className="h-full w-[299px] flex flex-col justify-start">
                <p className=" relative left-1 top-1 font-semibold">Password</p>
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  title="Password"
                  value={password}
                  className="w-[299px] h-[40px] rounded-[5px] border pl-2 shadow-lg outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400"
                  type="password"
                  placeholder="Password"
                />
              </div>
            </div>
            <div className=" -my-6 w-full flex-[1] h-full flex items-center justify-around">
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (langs.includes("uz")) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === "uz");
                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, "uz"]);
                }}
              >
                {langs.includes("uz") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Uzb
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (langs.includes("en")) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === "en");

                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, "en"]);
                }}
              >
                {langs.includes("en") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Eng
              </div>
              <div
                className=" flex items-center gap-1 justify-start font-serif text-app-secondary-lighter"
                onClick={() => {
                  if (langs.includes("ru")) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === "ru");

                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, "ru"]);
                }}
              >
                {langs.includes("ru") ? (
                  <CheckboxIcon className="w-5" />
                ) : (
                  <UncheckedBoxIcon className="w-5" />
                )}
                Ru
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

export default CreateTeacher;
