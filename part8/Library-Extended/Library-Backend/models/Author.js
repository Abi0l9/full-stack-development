const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    minlength: 4,
  },
  born: {
    type: Number,
  },
  favouriteGenre: String,
});

schema.plugin(uniqueValidator);

const Book = mongoose.model("Author", schema);
module.exports = Book;
