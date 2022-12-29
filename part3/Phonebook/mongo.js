const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("give password as argument");
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://Abiola:${password}@cluster0.qv2xexc.mongodb.net/phonebook?retryWrites=true&w=majority`;

mongoose.connect(url);

const phonebookSchema = new mongoose.Schema({
  name: String,
  number: Number,
});

const Phonebook = mongoose.model("Phonebook", phonebookSchema);

const phonebook = new Phonebook({
  name: process.argv[3],
  number: process.argv[4],
});

phonebook.number &&
  phonebook.save().then((result) => {
    console.log(
      `added ${phonebook.name} number ${phonebook.number} to phonebook`
    );
    mongoose.connection.close();
  });

if (!phonebook.name && !phonebook.number) {
  Phonebook.find({}).then((result) => {
    result.forEach((record) => console.log(`${record.name} ${record.number}`));
    mongoose.connection.close();
  });
}
