import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { UserActions } from 'src/store/features/user';
import { useAppDispatch } from 'src/store/hooks';
import { auth } from '../firebase/init';
import { getCurrentUser } from '../firebase/services/user';

const useFirebaseAuthentication = () => {
  const dispatch = useAppDispatch();

  const [loading, setLoading] = useState(false);
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    setLoading(true);

    const unlisten = auth.onAuthStateChanged(async (authUser) => {
      if (authUser) {
        setLoading(false);

        const userDoc = await getCurrentUser(authUser.email as string);

        userDoc && dispatch(UserActions.setUser(userDoc));

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
