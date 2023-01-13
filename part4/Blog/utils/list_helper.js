const dummy = (blogs) => 1;

const totalLikes = (blogs) => {
  const likes = blogs
    .map((blog) => blog.likes)
    .reduce((sum, item) => sum + item, 0);

  return blogs.length > 1 ? likes : blogs[0].likes;
};

module.exports = { dummy, totalLikes };
