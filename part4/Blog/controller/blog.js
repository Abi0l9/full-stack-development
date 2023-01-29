const blogRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const Blog = require("../models/blogModel");
const User = require("../models/user");

blogRouter.get("/info", (req, res) => res.send("Welcome!"));
blogRouter.get("", async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET);

  const result = await User.findById(decodedToken.id).populate("blogs", {
    title: 1,
    url: 1,
    likes: 1,
  });

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

blogRouter.post("", async (request, response) => {
  const body = request.body;

  const decodedToken = jwt.verify("getTokenFrom(request)", process.env.SECRET);
  if (!decodedToken.id) {
    return response.status(401).json({ error: "token invalid" });
  }

  const user = await User.findById(decodedToken.id);

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

  console.log(user);

  const result = await blog.save();

  user.blogs = user.blogs.concat(result.id);
  await user.save();

  return response.status(201).json(result);
});

blogRouter.patch("/:blogId", async (request, response) => {
  const blogId = request.params.blogId;
  const body = request.body;

  const blog = await Blog.findByIdAndUpdate(blogId, { likes: body.likes });
  if (blog) {
    response.json({ message: "successful" }).end();
  } else {
    return response.json({ message: "blog not found" }).status(404).end();
  }
});

blogRouter.delete("/:blogId", async (request, response) => {
  const blogId = request.params.blogId;

  const blog = await Blog.findByIdAndRemove(blogId);
  if (blog) {
    response.json({ message: "successful" }).end();
  } else {
    return response.json({ message: "blog not found" }).status(404).end();
  }
});

module.exports = blogRouter;
