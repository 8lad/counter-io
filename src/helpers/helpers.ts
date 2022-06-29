export const addingHashTag = (str: string) => {
  return (
    str &&
    str
      .split(" ")
      .map((item) => `#${item.toLowerCase()}`)
      .join(" ")
  );
};
