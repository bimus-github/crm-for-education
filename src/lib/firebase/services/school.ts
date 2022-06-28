import { School } from 'src/models';
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  setDoc,
} from 'firebase/firestore';
import { firestore } from '../init';

export const SCHOOL_PATH = 'schools';

export const createSchool = async (school: School) => {
  const docRef = doc(collection(firestore, SCHOOL_PATH));

  await setDoc(docRef, { ...school, id: docRef.id });

  return docRef.id;
};

export const getSchool = async (school: string) => {
  let schoolDoc: School | null = null;

  const q = query(
    collection(firestore, SCHOOL_PATH),
    where('admins', 'array-contains-any', [school])
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    schoolDoc = doc.data() as School;
  });

  return schoolDoc as unknown as School;
};
