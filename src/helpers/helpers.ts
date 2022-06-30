import { SingleTask } from "../redux/tasksReducer";

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
