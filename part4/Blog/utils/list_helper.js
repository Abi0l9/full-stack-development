const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likes = blogs
    .map((blog) => blog.likes)
    .reduce((sum, item) => sum + item, 0);

  return blogs.length > 1 ? likes : blogs[0].likes;
};

const favoriteBlog = (blogs) => {
  const max = blogs
    .map((blog) => blog.likes)
    .sort((a, b) => a - b)
    .at(-1);

  return blogs.filter((blog) => blog.likes === max)[0].likes;
};

module.exports = { dummy, totalLikes, favoriteBlog };
