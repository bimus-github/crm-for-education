import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Group } from "src/models";
import { firestore } from "../init";

export const GROUP_PATH = "groups";

export const createGroup = async (group: Group) => {
  const docRef = doc(collection(firestore, GROUP_PATH));

  await setDoc(docRef, { ...group, id: docRef.id });

  return docRef.id;
};

export const getAllGroups = async (school: string) => {
  const q = query(
    collection(firestore, GROUP_PATH),
    where("school", "==", school)
  );

  const groups: Group[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    groups.push(doc.data() as Group);
  });

  return groups;
};

export const deleteGroup = async (group: string) => {
  deleteDoc(doc(firestore, GROUP_PATH, group));
};
