const config = require("./utils/config");
const requestLogger = require("./utils/middleware");
const http = require("http");
const express = require("express");
const app = express();
const cors = require("cors");
const blogRouter = require("./controller/blog");
const { info } = require("./utils/logger");

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect(config.MONGODB_URI).then(() => {
  info("connected to MongoDB");
});

app.use(cors());
app.use(express.json());
app.use(requestLogger);

app.use("/api/blogs", blogRouter);

const PORT = config.PORT;

app.listen(PORT, () => {
  info(`Server running on port ${PORT}`);
});
