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

const mostBlogs = (blogss) => {
  const info = blogss
    .map((blog) => blog.author)
    .reduce((obj, item) => {
      obj[item] = obj[item] ? (obj[item] += 1) : 1;
      return obj;
    }, {});

  const max = Object.values(info)
    .sort((a, b) => a - b)
    .at(-1);

  const author = Object.keys(info).at(max - 1);
  const result = { author: author, blogs: max };

  return result;
};

const mostLikes = (blogss) => {
  const query = blogss.map((blog) => {
    return { author: blog.author, likes: blog.likes };
  });
  const result = query.sort((a, b) => a.likes - b.likes).at(-1);
  let count = 0;

  for (let i = 0; i < query.length; i++) {
    let currBlog = query[i];
    if (currBlog.author === result.author) {
      count += currBlog.likes;
    }
  }
  result.likes = count;

  return result;
};

module.exports = { dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes };
