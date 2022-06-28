import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { SchoolSliceActions } from 'src/store/features/school';
import { UserActions } from 'src/store/features/user';
import { UserSliceActions } from 'src/store/features/users';
import { useAppDispatch } from 'src/store/hooks';
import { auth } from '../firebase/init';
import { getSchool } from '../firebase/services/school';
import { getAllUsers, getCurrentUser } from '../firebase/services/user';

const useFirebaseAuthentication = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    const unlisten = auth.onAuthStateChanged(async (authUser) => {
      if (authUser && authUser?.email) {
        setLoading(false);

        const userDoc = await getCurrentUser(authUser.email as string);
        const school = await getSchool(authUser.email);
        const users = await getAllUsers(school.id);

        if (userDoc) {
          dispatch(UserActions.setUser(userDoc));
        }

        dispatch(UserSliceActions.addMultipleUsers(users));
        dispatch(SchoolSliceActions.setSchool(school));

        return setAuthUser(authUser);
      }

      setAuthUser(null);
      setLoading(false);
      // authUser ? setAuthUser(authUser) : setAuthUser(null);
    });

    return () => unlisten();
  }, []);

  return { authUser, loading };
};

export default useFirebaseAuthentication;
