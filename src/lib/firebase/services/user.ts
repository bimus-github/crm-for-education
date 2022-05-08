import { User } from 'src/models';
import { collection, addDoc } from 'firebase/firestore';
import { firestore } from '../init';

export const USERS_PATH = 'users';

export const createUser = async (user: User) => {
  const docRef = await addDoc(collection(firestore, USERS_PATH), user);

  return docRef.id;
};
