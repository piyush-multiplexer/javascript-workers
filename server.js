const express = require("express");
const app = express();
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

app.get("/getData", (req, res) => {
  res.send(
    Array(50000)
      .fill(0)
      .map(() => Math.floor(Math.random() * 100))
  );
});

app.get("/multiply", (req, res) => {
  const multiply = req.query.number1 * req.query.number2;
  const result = isNaN(multiply) ? "Invalid input" : multiply;
  res.send({ result });
});

app.get("/hi", (req, res) => {
  res.send("Hi there!");
});

app.listen(port, () => {
  console.log(`Worker Server listening on port ${port}`);
});
