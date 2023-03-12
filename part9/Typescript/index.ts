import express from "express";

const app = express();
app.use(express.json());

app.get("/hello", (_request, response) => response.send("Hello Fullstack!"));

const PORT = 3003;
app.listen(PORT, () => console.log("Listening to port ", PORT));
