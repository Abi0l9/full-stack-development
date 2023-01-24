const blogRouter = require("express").Router();
const { request, response } = require("../app");
const Blog = require("../models/blogModel");
require("../utils/middleware");

blogRouter.get("/info", (req, res) => res.send("Welcome!"));
blogRouter.get("", async (request, response) => {
  const result = await Blog.find({});

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
  const blog = new Blog(request.body);

  if (blog.title === undefined || blog.url === undefined) {
    return response
      .status(400)
      .json({ message: "title/url field is required" })
      .end();
  }

  const result = await blog.save();
  return response.status(201).json(result);
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
