const Blog = require("../models/blogModel");
const User = require("../models/user");

const initialBlogs = [
  {
    title: "First Blog",
    author: "Khalifah",
    url: "https://LinkedIn.com",
    likes: 800000000,
    id: "63c0115f090aecab015fc679",
  },
  {
    title: "Second Blog",
    author: "Khalifah",
    url: "https://theguddeeds.com",
    likes: 5000000,
    id: "63c012868f92c4c6349192d1",
  },
  {
    title: "Third Blog",
    author: "Khalifah",
    url: "https://yahoo.com",
    likes: 5000,
    id: "63c11955a44216cd6e3c5276",
  },
  {
    title: "Fourth Blog",
    author: "Khalifah",
    url: "https://mdn.com",
    likes: 30000,
    id: "63c5373a1e269c14f3a60c44",
  },
];

const nonExistingId = async () => {
  const blog = new Blog({
    title: "Test Blog",
    author: "Admin",
    url: "https://test.com",
    likes: 11110000,
  });
  await blog.save();
  await blog.remove();

  return blog._id.toString();
};

const blogInDb = async () => {
  const blogs = await Blog.find({});

  return blogs.map((blog) => blog.toJSON());
};

const usersInDb = async () => {
  const users = await User.find({});
  return users.map((u) => u.toJSON());
};

module.exports = {
  initialBlogs,
  nonExistingId,
  blogInDb,
  usersInDb,
};
