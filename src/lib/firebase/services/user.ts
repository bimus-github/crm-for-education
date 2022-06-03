import { User } from "src/models";
import {
  collection,
  where,
  query,
  getDocs,
  doc,
  setDoc,
  getDoc,
  deleteDoc,
} from "firebase/firestore";
import { firestore } from "../init";

export const USERS_PATH = "users";

export const createUser = async (user: User) => {
  const docRef = doc(collection(firestore, USERS_PATH));

  await setDoc(docRef, { ...user, id: docRef.id });

  return docRef.id;
};

export const getCurrentUser = async (user: string) => {
  let userDoc: User | null = null;

  const q = query(
    collection(firestore, USERS_PATH),
    where("email", "==", user)
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    userDoc = doc.data() as User;
  });

  return userDoc;
};

export const getAllUsers = async (school: string) => {
  const q = query(
    collection(firestore, USERS_PATH),
    where("school", "==", school)
  );

  const users: User[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    users.push(doc.data() as User);
  });

  return users;
};

export const deleteUser = async (user: string) => {
  await deleteDoc(doc(firestore, USERS_PATH, user));
};

export const updateUser = async (user: User) => {
  await setDoc(doc(firestore, USERS_PATH, user.id), user);
  return user.id;
};
