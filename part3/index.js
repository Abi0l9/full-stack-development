const express = require("express");
const app = express();
app.use(express.json());
const PORT = 3001;

const persons = [
  {
    id: 1,
    name: "Khalifah",
    number: "09065909090",
  },
  {
    id: 2,
    name: "Kashy",
    number: "08090765432",
  },
  {
    id: 3,
    name: "Wale",
    number: "09058786758",
  },
  {
    id: 4,
    name: "Abiola",
    number: "08078685848",
  },
];

app.get("/api/persons", (req, res) => res.json(persons));

app.listen(PORT, console.log("\n App running on port ", PORT));
