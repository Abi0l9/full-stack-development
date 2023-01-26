const config = require("./utils/config");
const express = require("express");
require("express-async-errors");
const app = express();
const middleware = require("./utils/middleware");
const cors = require("cors");
const Blog = require("./models/blogModel");
const blogRouter = require("./controller/blog");
const userRouter = require("./controller/user");
const loginRouter = require("./controller/login");
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
app.use(middleware.requestLogger);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blogs", blogRouter);

app.use(middleware.errorHandler);
module.exports = app;
