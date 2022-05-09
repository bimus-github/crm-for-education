import React, { useState } from 'react';

import AppLayout from 'src/components/shared/layout';
import AppCreateLayout from 'src/components/shared/createLayout';

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';
import { storage } from 'src/lib/firebase/init';

import toast from 'react-hot-toast';
import Loader from 'src/components/Loader';

import { MdDelete } from 'react-icons/md';
import { BsPerson } from 'react-icons/bs';
import { Language, ROLE, Teacher } from 'src/models';
import { CheckboxIcon, UncheckedBoxIcon } from 'src/components/shared/icons';

function CreateTeacher() {
  const [data, setData] = useState({});

  const [img, setImg] = useState('');
  const [uploaded, setUploaded] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [number, setNumber] = useState('');
  const [email, setEmail] = useState('');
  const [about, setAbout] = useState('');
  const [langs, setLangs] = useState<Language[]>([]);

  const onUploadImg = (e: any) => {
    setIsLoading(true);

    const imageFile = e.target.files[0];
    const imageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const upLoadTask = uploadBytesResumable(imageRef, imageFile);

    upLoadTask.on(
      'state_changed',
      (snapshot) => {
        console.log(snapshot);
      },
      (error) => {
        toast.error('Error to uploading!!!');
        console.log(error);
      },
      () => {
        getDownloadURL(upLoadTask.snapshot.ref).then((downloadUrl) => {
          toast.error('Uploading has done successfully');
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
      setImg('');
      setUploaded(false);
      setIsLoading(false);
      toast.custom('Iamge has deleted seccessfully!!!');
    });
  };

  const onClear = () => {
    setAbout('');
    setEmail('');

    setFirstName('');
    setLastName('');
    setNumber('');
    setLangs([]);

    if (img !== '') {
      setIsLoading(true);
      const deletRef = ref(storage, img);
      deleteObject(deletRef).then(() => {
        setImg('');
        setUploaded(false);
        setIsLoading(false);
        toast.custom('Iamge has deleted seccessfully!!!');
      });
    }
  };

  const onSave = () => {
    if (
      about === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '' ||
      number === '' ||
      !img.length
    ) {
      return toast.error('Required. Please, fill in all the boxes!');
    } else {
      const data: Teacher = {
        id: '',
        role: ROLE.TEACHER,
        firstName: firstName,
        lastName: lastName,
        phone: number,
        email,
        about,
        img,
        groups: [],
        languages: [],
      };

      setData(data);
    }
  };
  console.log(data);

  return (
    <AppLayout>
      <AppCreateLayout>
        <div className='w-full h-full flex flex-col items-center p-2 bg-white shadow-md'>
          <div className=' w-full h-auto flex items-center justify-center my-2'>
            <p className=' font-bold font-serif text-lg'>Create Teacher</p>
          </div>

          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!uploaded ? (
                <label id={'uploadImage'} className='cursor-pointer'>
                  <div className=' w-full h-[90px] flex flex-col items-center my-2'>
                    <div className=' w-[70px] h-[70px] rounded-full shadow-lg p-3  hover:bg-app-background'>
                      <BsPerson className=' w-full h-full hover:text-app-secondary   text-app-secondary-lighter' />
                    </div>
                    <p className=' font-serif text-base text-app-secondary-lighter mt-2'>
                      Profile Photo
                    </p>
                  </div>
                  <input
                    onChange={(e) => onUploadImg(e)}
                    type='file'
                    name='uploadImage'
                    accept='image/*'
                    className='w-[0px] h-[0px]'
                  />
                </label>
              ) : (
                <div className='flex flex-col w-full items-center'>
                  <div className=' '>
                    <img
                      alt='profile'
                      src={img}
                      className='w-[90px] bg-white h-[90px] rounded-full shadow-md'
                    />
                  </div>
                  <div
                    onClick={onDeletImg}
                    className=' relative bottom-5 left-32 w-6 h-6 rounded-3xl hover:bg-red-500 bg-app-primary flex justify-center items-center'
                  >
                    <MdDelete color='red' size={20} />
                  </div>
                </div>
              )}
            </>
          )}
          <div className=' w-[580px] h-full flex flex-col items-center'>
            <div className=' my-1 w-full flex-[1] h-full flex items-center justify-around'>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                title='First Name'
                value={firstName}
                className='w-[220px] h-[30px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
                type='text'
                placeholder='First Name'
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                title='Last Name'
                value={lastName}
                className='w-[220px] h-[30px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
                type='text'
                placeholder='Last Name'
              />
            </div>
            <div className=' my-1 w-full flex-[1] h-full flex items-center justify-around'>
              <input
                onChange={(e) => setNumber(e.target.value)}
                value={number}
                title='Phone'
                className='w-[220px] h-[30px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
                type='text'
                placeholder='Phone'
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                title='Email'
                value={email}
                className='w-[220px] h-[30px] rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
                type='email'
                placeholder='Email'
              />
            </div>
            <div className=' my-1 w-full flex-[1.4] h-full flex items-center justify-center'>
              <textarea
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                required
                title='About'
                className='w-[507px] h-full rounded-[5px] pl-2 outline-none ring-[1px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
                placeholder='About ...'
              />
            </div>
            <div className=' w-full flex-[1] h-full flex items-center justify-around'>
              <div
                className=' flex items-center gap-1 justify-start font-serif text-app-secondary-lighter'
                onClick={() => {
                  if (langs.includes('uz')) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === 'uz');

                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, 'uz']);
                }}
              >
                {langs.includes('uz') ? (
                  <CheckboxIcon className='w-5' />
                ) : (
                  <UncheckedBoxIcon className='w-5' />
                )}
                Uzb
              </div>
              <div
                className=' flex items-center gap-1 justify-start font-serif text-app-secondary-lighter'
                onClick={() => {
                  if (langs.includes('en')) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === 'en');

                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, 'en']);
                }}
              >
                {langs.includes('en') ? (
                  <CheckboxIcon className='w-5' />
                ) : (
                  <UncheckedBoxIcon className='w-5' />
                )}
                Eng
              </div>
              <div
                className=' flex items-center gap-1 justify-start font-serif text-app-secondary-lighter'
                onClick={() => {
                  if (langs.includes('ru')) {
                    const updatedLangs = [...langs];
                    const idx = langs.findIndex((item) => item === 'ru');

                    updatedLangs.splice(idx, 1);
                    return setLangs(updatedLangs);
                  }

                  setLangs([...langs, 'ru']);
                }}
              >
                {langs.includes('ru') ? (
                  <CheckboxIcon className='w-5' />
                ) : (
                  <UncheckedBoxIcon className='w-5' />
                )}
                Ru
              </div>
            </div>
            <div className=' w-full flex-[1] h-full flex items-center justify-center gap-10'>
              <button
                onClick={onClear}
                type='submit'
                className=' w-[150px] h-[30px] rounded-md pl-2 bg-orange-400 text-white font-bold '
              >
                Clear
              </button>
              <button
                onClick={onSave}
                type='submit'
                className=' w-[150px] h-[30px] rounded-md pl-2 bg-app-primary text-white font-bold '
              >
                Save
              </button>
            </div>
          </div>
        </div>
      </AppCreateLayout>
    </AppLayout>
  );
}

export default CreateTeacher;
