import { ref, set, child, get } from "firebase/database";
import { SingleTask } from "../redux/tasksReducer";
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

export const filterTasks = (str: string, arr: SingleTask[], tagFilter: boolean): SingleTask[] | [] => {
  return tagFilter
    ? arr.filter((item) => item.tags.includes(str.toLocaleLowerCase()))
    : arr.filter((item) => item.text.includes(str.toLocaleLowerCase()));
};

export const setData = (baseName: string, baseData: SingleTask[] | string | boolean): void => {
  set(ref(database, `/${baseName}`), baseData);
};

// export const getData = (baseName: string) => {
//   const dbRef = ref(database);
//   get(child(dbRef, `/${baseName}`))
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val();
//       }
//       return null;
//     })
//     .catch((error) => error);
// };

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
