const router = require("express").Router();
const Blog = require("../models/blogModel");
const User = require("../models/user");

router.post("/reset", async (request, response) => {
  await Blog.deleteMany({});
  await User.deleteMany({});

  return response.status(204).end();
});

module.exports = router;
