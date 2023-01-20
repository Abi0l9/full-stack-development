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

  const result = await blog.save();
  // console.log(response)
  return response.status(201).json(result);
});

module.exports = blogRouter;
