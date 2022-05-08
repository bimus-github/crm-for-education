import { ChangeEvent, useState } from "react";

import Loader from "../Components/Loader";

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";

import { storage } from "src/lib/firebase/init";

import IAM from "../../assets/iam.jpg";
import { MdDelete, MdCloudUpload } from "react-icons/md";
import toast from "react-hot-toast";

const SignUp = () => {
  const [img, setImg] = useState("");
  const [isLodaing, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);

  const onUpload = (e: any) => {
    console.log("hello");

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
          alert("Uploading has done successfully!!!");
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
      toast.custom("Img has deleted seccessfully!!!");
    });
  };

  const onSave = () => {
    console.log("hello");
  };

  return (
    <div className=" w-screen h-screen overflow-y-scroll flex justify-center items-start py-5 bg-app-background ">
      <form
        className=" w-[600px] h-auto border-2 border-dotted
       border-blue-500 flex flex-col justify-start 
       items-center gap-5 py-5  "
      >
        {isLodaing ? (
          <Loader />
        ) : (
          <>
            {!uploaded ? (
              <label id={"uploadImage"}>
                <div className=" flex gap-3 hover:bg-blue-400 justify-start rounded-lg items-center  w-[400px] h-[40px] border border-black pl-3 ">
                  <MdCloudUpload size={25} />
                  <p>Click here to upload.</p>
                  <input
                    type="file"
                    name="uploadImage"
                    accept="image/*"
                    onChange={(e) => onUpload(e)}
                    className="w-[0px] h-[0px]"
                  />
                </div>
              </label>
            ) : (
              <div className=" flex flex-col   w-full items-center">
                <div className=" ">
                  <img
                    src={img}
                    className="w-[400px] bg-white h-[400px] rounded-full shadow-2xl shadow-gray-800"
                  />
                </div>
                <div
                  onClick={onDeletImg}
                  className=" relative bottom-5 left-32 w-10 h-10 rounded-3xl hover:bg-red-500  bg-app-primary flex justify-center items-center"
                >
                  <MdDelete color="red" size={32} />
                </div>
              </div>
            )}
          </>
        )}
        <div className=" ">
          <input
            className="w-[400px] h-[40px] rounded-md pl-2 "
            type="text"
            placeholder="Name of School"
          />
        </div>

        <div className=" ">
          <textarea
            className="w-[400px] h-[100px] rounded-md p-2 "
            placeholder="About of School ..."
          />
        </div>

        <div>
          <button
            onClick={onSave}
            className=" w-[400px] h-[40px] rounded-md pl-2 bg-app-primary text-black "
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
