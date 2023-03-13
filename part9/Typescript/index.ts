import express from "express";
import { calculateBmi } from "./bmiCalculator";
import { isNumber } from "./utils";

const app = express();
app.use(express.json());

app.get("/hello", (_request, response) => response.send("Hello Fullstack!"));

app.get("/bmi", (request, response) => {
  const { height, weight } = request.query;
  const bmi = calculateBmi(Number(height), Number(weight));

  if (!weight || !height || !isNumber(weight) || !isNumber(height)) {
    return response.status(400).json({ error: `malformated parameters` }).end();
  }

  return response.status(200).json({ weight, height, bmi }).end();
});

const PORT = 3003;
app.listen(PORT, () => console.log("Listening to port ", PORT));
