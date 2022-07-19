import { ref, set, child, get } from "firebase/database";
import { SingleTask } from "../types";
import { database } from "../firebase";

export const addingHashTag = (str: string): string => {
  return (
    str &&
    str
      .split(" ")
      .map((item) => `#${item.toLowerCase()}`)
      .join(" ")
  );
};

export const filterTasks = (str: string, arr: SingleTask[], tagFilter: boolean): SingleTask[] => {
  return tagFilter
    ? arr.filter((item) => item.tags.toLowerCase().includes(str.toLowerCase()))
    : arr.filter((item) => item.text.toLowerCase().includes(str.toLowerCase()));
};

export const setData = (baseName: string, baseData: SingleTask[] | string | boolean): void => {
  set(ref(database, `/${baseName}`), baseData);
};

export const getData = () => {
  const dbRef = ref(database);
  get(child(dbRef, "baseData"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      }
      return null;
    })
    .catch((error) => error);
};

export const getAllData = async () => {
  const dbRef = ref(database);
  const response = await get(child(dbRef, "baseData"));
  const allTasks = await response.val();
  const allTasksList = allTasks ?? [];
  return allTasksList;
};

export const returnErrorText = (e: Error) => {
  const error = e;
  return error.message;
};
