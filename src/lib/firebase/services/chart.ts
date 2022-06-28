import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { ChartLine } from "src/models";
import { firestore } from "../init";

export const CHART_PATH = "charts";

export const createChart = async (chart: ChartLine) => {
  const docRef = doc(collection(firestore, CHART_PATH));

  await setDoc(docRef, { ...chart, id: docRef.id });

  return docRef.id;
};

export const getAllChart = async (school: string) => {
  const q = query(
    collection(firestore, CHART_PATH),
    where("school", "==", school)
  );

  const chart: ChartLine[] = [];

  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    chart.push(doc.data() as ChartLine);
  });

  return chart;
};

export const deleteChart = async (chart: ChartLine) => {
  deleteDoc(doc(firestore, CHART_PATH, chart.id));
};
