import { User } from 'firebase/auth';
import { useEffect, useState } from 'react';
import { auth } from '../firebase/init';

const useFirebaseAuthentication = () => {
  const [authUser, setAuthUser] = useState<User | null>(null);

  useEffect(() => {
    const unlisten = auth.onAuthStateChanged((authUser) => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });

    return () => unlisten();
  }, []);

  return authUser;
};

export default useFirebaseAuthentication;
