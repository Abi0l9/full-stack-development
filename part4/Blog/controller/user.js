const bcrypt = require("bcrypt");
const userRouter = require("express").Router();
const { request } = require("../app");
const User = require("../models/user");

userRouter.post("", async (request, response) => {
  const { username, name, password } = request.body;

  if (password.length < 3) {
    return response.status(400).json("password is too short").end();
  }
  const saltRounds = 10;
  const passwordHash = await bcrypt.hash(password, saltRounds);

  const user = new User({
    username,
    name,
    passwordHash,
  });

  const savedUser = await user.save();

  response.status(201).json(savedUser);
});

userRouter.get("", async (request, response) => {
  const result = await User.find({}).populate("blogs", { title: 1, likes: 1 });

  return response.json(result).end();
});

userRouter.get("/:userId", async (request, response) => {
  const { userId } = request.params;
  const result = await User.findById(userId).populate("blogs", {
    title: 1,
    likes: 1,
  });

  if (result) {
    return response.json(result).end();
  }
  response.status(404).json({ message: "User not found!" }).end();
});

userRouter.delete("/:userId", async (request, response) => {
  const { userId } = request.params;
  const result = await User.findByIdAndRemove(userId);

  if (result) {
    return response.json({ message: "User deleted successfully!" }).end();
  }
  response.status(404).json({ message: "User not found!" }).end();
});

module.exports = userRouter;
