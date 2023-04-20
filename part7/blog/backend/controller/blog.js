const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
const User = require("../models/user");
const userExtractor = require("../utils/middleware").userExtractor;
const { v1: uuidv1 } = require("uuid");

const id = uuidv1();

blogRouter.get("/info", (req, res) => res.send("Welcome!"));
blogRouter.get("", async (request, response) => {
  // const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const result = await Blog.find({}).populate("user", { username: 1, name: 1 });

  return response.json(result);
});

blogRouter.get("/:blogId", async (request, response) => {
  const blogId = request.params.blogId;

  const blog = await Blog.findById(blogId);
  if (blog) {
    return response.json(blog).end();
  }

  return response.json({ message: "blog not found" }).status(404).end();
});

blogRouter.post("", userExtractor, async (request, response) => {
  const body = request.body;

  const user = await User.findById(request.user);

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
    user: user._id,
  });

  if (blog.title === undefined || blog.url === undefined) {
    return response
      .status(400)
      .json({ message: "title/url field is required" })
      .end();
  }

  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);
  await user.save();

  return response.status(201).json(result);
});

blogRouter.patch("/:blogId", async (request, response) => {
  const blogId = request.params.blogId;
  const body = request.body;

  // const blog = await Blog.findByIdAndUpdate(blogId, { likes: body.likes });
  const blog = await Blog.findByIdAndUpdate(blogId, request.body);
  if (blog) {
    response.json({ message: "successful" }).end();
  } else {
    return response.status(404).json({ message: "blog not found" }).end();
  }
});

blogRouter.post("/:blogId/comments", async (request, response) => {
  const blogId = request.params.blogId;
  const body = request.body;

  const blog = await Blog.findById(blogId);

  if (blog) {
    const newData = { ...body, id };
    blog.comments = blog.comments.concat(newData);
    await blog.save();
    return response.status(200).json(newData).end();
  } else {
    return response.status(404).json({ message: "blog not found" }).end();
  }
});

blogRouter.delete("/:blogId", userExtractor, async (request, response) => {
  const blogId = request.params.blogId;
  const user = request.user;

  if (!user) {
    return response.status(401).json({ error: "token invalid" });
  }

  const blogToDelete = await Blog.findById(blogId);
  if (!blogToDelete) {
    return response.status(404).json({ message: "blog not found" }).end();
  }

  if (blogToDelete.user.toString() === user) {
    await Blog.findByIdAndRemove(blogId);
    return response.json({ message: "Blog deleted successfully" }).end();
  } else {
    return response
      .status(403)
      .json({ message: "You have no permission to delete this blog." })
      .end();
  }
});

module.exports = blogRouter;
