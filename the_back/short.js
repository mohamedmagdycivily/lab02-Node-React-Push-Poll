const cors = require("cors");
const express = require("express");

const app = express();

app.use(cors());
app.use(express.json());

const messages = [];

app.post("/messages", (req, res) => {
  messages.push(req.body);
  res.status(204).end();
});

app.get("/messages", (req, res) => {
  console.log(
    "req.headers['previous-datetime']  = ",
    req.headers["previous-datetime"]
  );
  if (req.headers["previous-datetime"] === 0) {
    res.json(messages);
  } else {
    if (messages.length > 0) {
      let previousTime = req.headers["previous-datetime"];
      let newMessages = [];
      newMessages = messages.filter(
        (message) => message.currentDateTime > previousTime
      );
      res.json(newMessages);
    } else {
      res.json([]);
    }
  }
});

app.listen(3002, () => {
  console.log("server is listening on port 3002");
});
