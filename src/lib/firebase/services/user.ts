import { User } from 'src/models';
import { collection, addDoc, where, query, getDocs } from 'firebase/firestore';
import { firestore } from '../init';

export const USERS_PATH = 'users';

export const createUser = async (user: User) => {
  const docRef = await addDoc(collection(firestore, USERS_PATH), user);

  return docRef.id;
};

export const getCurrentUser = async (user: string) => {
  let userDoc: User | null = null;

  const q = query(
    collection(firestore, USERS_PATH),
    where('email', '==', user)
  );

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, ' => ', doc.data());
    userDoc = doc.data() as User;
  });

  return userDoc;
};
