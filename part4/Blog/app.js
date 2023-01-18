const config = require("./utils/config");
const express = require("express");
const app = express();
const requestLogger = require("./utils/middleware");
const cors = require("cors");
const Blog = require("./models/blogModel");
const blogRouter = require("./controller/blog");
const { info, errors } = require("./utils/logger");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    info("connected to MongoDB");
  })
  .catch((error) => errors(error));

app.use(cors());
app.use(express.json());
app.use(requestLogger);

// app.use("/api/blogs", blogRouter);
app.get("/info", (req, res) => res.send("Welcome!"));

app.get("/api/blogs", (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs);
  });
});

app.post("/api/blogs", (request, response) => {
  const blog = new Blog(request.body);

  blog.save().then((result) => {
    response.status(201).json(result);
  });
});

module.exports = app;
