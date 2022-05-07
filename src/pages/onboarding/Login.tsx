import React, { useState } from 'react';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth';
import { auth } from '../../lib/firebase/init';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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
        toast.error('Error to sign up');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className='h-screen w-screen flex justify-center items-center bg-app-background'>
      <form onSubmit={handleSubmit} className='space-y-3'>
        <div className='mb-20'>
          <div>
            <input
              placeholder='Email'
              type='text'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              name=''
              id=''
              className='h-[50px] w-[250px] px-3'
            />
          </div>
          <div>
            <input
              placeholder='Password'
              type={'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              name=''
              id=''
              className='h-[50px] w-[250px] px-3'
            />
          </div>
        </div>

        <div className='flex flex-col justify-center items-center'>
          <div>
            <button
              type='submit'
              className='flex items-center justify-center bg-app-primary h-[50px] w-[200px] rounded-[5px] text-white text-lg'
            >
              Login{' '}
            </button>

            <Link to='/signUp'>
              <p className='text-center'> Go to Sing Up</p>
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
