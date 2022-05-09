import { useState } from 'react';

import Loader from '../../components/Loader';

import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from 'firebase/storage';

import { auth, storage } from 'src/lib/firebase/init';

import { MdDelete, MdCloudUpload } from 'react-icons/md';
import toast from 'react-hot-toast';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { ROLE, User } from 'src/models';
import { SelectRole } from 'src/components/signup/SelectRole';
import { createUser } from 'src/lib/firebase/services/user';
import { useAppDispatch } from 'src/store/hooks';
import { UserActions } from 'src/store/features/user';

const SignUp = () => {
  const dispatch = useAppDispatch();

  const [img, setImg] = useState('');
  const [isLodaing, setIsLoading] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [school, setSchool] = useState('');
  const [about, setAbout] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [role, setRole] = useState(ROLE.ADMIN);

  const onUpload = (e: any) => {
    console.log('hello');

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

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!img.length) {
      return toast.error('Required. Please, upload school logo');
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // const user = userCredential.user;

        const user: User = {
          id: '',
          email,
          firstName,
          lastName,
          phone: '',
          role: ROLE.ADMIN,
          about: '',
          img: '',
        };

        try {
          const userId = await createUser(user);
          dispatch(UserActions.setUser({ ...user, id: userId }));
        } catch (error) {
          toast.error('There was error to sign up');
        }
      })
      .catch((error) => {
        toast.error('There was error to sign up');
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <div className='w-full flex justify-center items-center py-5 bg-app-background'>
      <form
        onSubmit={onSubmit}
        className='w-[600px] h-auto flex flex-col justify-start items-center gap-5 py-5 bg-white shadow-md rounded-[5px]'
      >
        {isLodaing ? (
          <Loader />
        ) : (
          <>
            {!uploaded ? (
              <label id={'uploadImage'} className='cursor-pointer'>
                <div className='justify-start rounded-lg items-center'>
                  <div className='flex flex-col justify-center items-center h-[200px] w-[200px] rounded-[99px] bg-white hover:bg-app-secondary shadow-md border bg-app-background hover:text-white'>
                    <MdCloudUpload size={35} />
                    <p>Click here to upload.</p>
                  </div>
                  <input
                    type='file'
                    name='uploadImage'
                    accept='image/*'
                    onChange={(e) => onUpload(e)}
                    className='w-[0px] h-[0px]'
                  />
                </div>
              </label>
            ) : (
              <div className='flex flex-col w-full items-center'>
                <div className=' '>
                  <img
                    alt='profile'
                    src={img}
                    className='w-[400px] bg-white h-[400px] rounded-full shadow-md'
                  />
                </div>
                <div
                  onClick={onDeletImg}
                  className=' relative bottom-5 left-32 w-10 h-10 rounded-3xl hover:bg-red-500 bg-app-primary flex justify-center items-center'
                >
                  <MdDelete color='red' size={32} />
                </div>
              </div>
            )}
          </>
        )}
        <p className='text-lg font-bold'>School info</p>
        <div className=' '>
          <input
            required
            value={school}
            onChange={(e) => setSchool(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='text'
            placeholder='Name of School'
          />
        </div>

        <div className=' '>
          <textarea
            required
            value={about}
            onChange={(e) => setAbout(e.target.value)}
            className='w-[400px] h-[100px] rounded-md p-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            placeholder='About of School ...'
          />
        </div>

        <p className='text-lg font-bold'>Credentials</p>
        <div className=' '>
          <input
            required
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='text'
            placeholder='First Name'
          />
        </div>
        <div className=' '>
          <input
            required
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='text'
            placeholder='Last Name'
          />
        </div>
        <div className=' '>
          <input
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='email'
            placeholder='Email'
          />
        </div>

        <div className=' '>
          <input
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='password'
            placeholder='Password'
          />
        </div>

        <div className=' '>
          <input
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-[400px] h-[40px] rounded-md pl-2 outline-none ring-[3px] focus:ring-app-primary focus:ring-offset-2 hover:ring-blue-400'
            type='password'
            placeholder='Confirm Password'
          />
        </div>

        <SelectRole selected={role} setSelected={(role) => setRole(role)} />

        <div>
          <button
            type='submit'
            className=' w-[400px] h-[40px] rounded-md pl-2 bg-app-primary text-white font-bold mt-5'
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default SignUp;
