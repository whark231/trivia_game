const express = require("express");

const lib = require("./db");
const path = require("path");

const app = express();

app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

let con;

app.post("/login", async (req, res) => {
  const { username } = req.query;
  const reg = /^[0-9a-zA-Z]+$/;
  if (!username.match(reg)) {
    res.status(400).send("invalid username");
  } else {
    if ((await lib.getScore(con, username)) == null) {
      await lib.addPlayer(con, { name: username, score: 0 });
    }
    res.status(204).send();
  }
});

app.get("/score", async (req, res) => {
  const { username } = req.query;
  try {
    const result = {
      highScores: await lib.getTopScores(con),
      userHighScore: (await lib.getScore(con, username)).score,
    };
    res.status(200).send(result);
  } catch (error) {
    res.status(404).send("Could not find player.");
  }
});

app.put("/score", async (req, res) => {
  const { username, score } = req.query;
  await lib.updateScore(con, username, score);
  res.status(201).send("score added");
});

app.get("/question", async (req, res) => {
  const result = await lib.getQuestions(con, 10);
  res.status(200).send(result);
});

app.delete("/user", async (req, res) => {
  const { username } = req.query;
  const result = await lib.deletePlayer(con, username);
  if (result) {
    res.status(200).send(result);
  } else {
    res.status(404).send("Could not find player to delete.");
  }
});

app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

app.listen(process.env.PORT || 5000, async () => {
  con = await lib.connect();
});

module.exports = { app };
