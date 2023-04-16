export const blogSorter = (blogs) => {
  return blogs?.sort(
    (first, second) => Number(second.likes) - Number(first.likes)
  );
};
