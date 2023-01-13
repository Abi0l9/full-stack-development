const config = require("./utils/config");
// const requestLogger = require("./utils/middleware");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controller/blog");
const mongoose = require("mongoose");
// const blogSchema = mongoose.Schema({
//   title: String,
//   author: String,
//   url: String,
//   likes: Number,
// });

// blogSchema.set("toJSON", {
//   transform: (document, returnedObject) => {
//     returnedObject.id = returnedObject._id.toString();
//     delete returnedObject._id;
//     delete returnedObject.__v;
//   },
// });
// const Blog = mongoose.model("Blog", blogSchema);

mongoose.set("strictQuery", true);
mongoose.connect(config.MONGODB_URI).then(() => {
  console.log("connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogRouter);
// app.get("/info", (req, res) => res.send("Welcome!"));
// app.get("/api/blogs", (request, response) => {
//   Blog.find({}).then((blogs) => {
//     response.json(blogs);
//   });
// });

// app.post("/api/blogs", (request, response) => {
//   const blog = new Blog(request.body);

//   blog.save().then((result) => {
//     response.status(201).json(result);
//   });
// });

const PORT = config.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
