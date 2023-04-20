export const blogSorter = (blogs) => {
  return blogs?.sort(
    (first, second) => Number(second.likes) - Number(first.likes)
  );
};

export const groupBlogsByAuthor = (blogs) => {
  const createdBlogs = blogs
    ?.map((blog) => {
      return { name: blog.user.name, id: blog.user.id };
    })
    .reduce((obj, { name, id }) => {
      (obj[name] = obj[name] || []).push({ id, name });
      return obj;
    }, {});

  const groupedBlogs = Object.entries(createdBlogs).map(([author, arr]) => {
    return {
      author,
      id: arr.at(0).id,
      blogsNum: arr.length,
    };
  });

  return groupedBlogs;
};
