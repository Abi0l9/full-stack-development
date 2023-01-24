const blogRouter = require("express").Router();
const Blog = require("../models/blogModel");
require("../utils/middleware");

blogRouter.get("/info", (req, res) => res.send("Welcome!"));
blogRouter.get("", async (request, response) => {
  const result = await Blog.find({});

  return response.json(result);
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

module.exports = blogRouter;
