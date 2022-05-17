import {
  collection,
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

export const getGroup = async (group: string) => {
  let groupDoc: Group | null = null;

  const q = query(
    collection(firestore, GROUP_PATH),
    where("admins", "array-contains-any", [group])
  );

  const querySnapshot = await getDocs(q);

  querySnapshot.forEach((doc) => {
    groupDoc = doc.data() as Group;
  });

  return groupDoc as unknown as Group;
};
