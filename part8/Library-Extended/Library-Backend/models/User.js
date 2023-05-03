const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    minlength: 4,
  },
  favoriteGenre: {
    type: String,
    required: true,
  },
});

schema.plugin(uniqueValidator);

const User = mongoose.model("User", schema);
module.exports = User;
