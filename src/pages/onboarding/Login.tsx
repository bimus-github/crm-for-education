import React, { useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../lib/firebase/init";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

import { BsPerson } from "react-icons/bs";
import { RiLockPasswordLine } from "react-icons/ri";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUpPress = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // ..
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        // ...
      })
      .catch((error) => {
        toast.error("Error to sign up");
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className="h-screen w-screen flex justify-center items-center bg-app-background">
      <form onSubmit={handleSubmit} className="space-y-10">
        <div className="  flex flex-col gap-5">
          <div className=" flex">
            <BsPerson className=" rounded-l-md h-[40px] w-[40px] bg-app-primary " />
            <input
              placeholder="Username"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=""
              id=""
              className="h-[40px] w-[300px] bg-white px-3 rounded-r-md"
            />
          </div>
          <div className=" flex">
            <RiLockPasswordLine className=" rounded-l-md h-[40px] w-[40px]  bg-app-primary" />

            <input
              placeholder="Password"
              type={"password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=""
              id=""
              className="h-[40px] w-[300px] px-3 rounded-r-md"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center">
          <div>
            <button
              type="submit"
              className="flex items-center text-black justify-center hover:bg-red-400 bg-app-primary h-[40px] w-[340px] rounded-[5px]   text-lg"
            >
              Login
            </button>

            <div className=" h-[40px] w-[340px] flex items-center justify-end">
              <Link to="/signUp">
                <p className="text-center text-blue-600"> Go to Sing Up</p>
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
