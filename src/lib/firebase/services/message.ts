import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { Message } from "src/models";
import { firestore } from "../init";

export const NOTE_PATH = "notes";

export const createNote = async (note: Message) => {
  const docRef = doc(collection(firestore, NOTE_PATH));

  await setDoc(docRef, { ...note, id: docRef.id });

  return docRef.id;
};

export const getAllNotes = async (school: string) => {
  const q = query(
    collection(firestore, NOTE_PATH),
    where("school", "==", school)
  );

  const notes: Message[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    notes.push(doc.data() as Message);
  });

  return notes;
};

export const deleteNote = async (noteId: string) => {
  deleteDoc(doc(firestore, NOTE_PATH, noteId));
};
