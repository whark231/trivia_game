const lib = require("./db");

// declare db object
let db;
let url =
  "mongodb+srv://cis350:cis350@cluster0.apffl.mongodb.net/cis350?retryWrites=true&w=majority";
const player = { name: "john", score: 0 };
const player2 = { name: "adam", score: 5 };
const player3 = { name: "bob", score: 10 };
const badplayer = "badplayer";

const resetdb = async (collection) => {
  await db.collection(collection).deleteMany({});
};

test("addPlayer inserts a new player", async () => {
  db = await lib.connect();
  await resetdb("user");
  await lib.addPlayer(db, player);
  const newPlayer = await db.collection("user").findOne({ name: "john" });
  expect(newPlayer.name).toEqual("john");
});

// add john with score 10
// check john score is 10 using the getScore function
test("getScore gets correct score", async () => {
  db = await lib.connect();
  await resetdb("user");
  await lib.addPlayer(db, player);
  const score = await lib.getScore(db, "john");
  expect(score.name).toEqual(player.name);
  expect(score.score).toEqual(player.score);
});

// add john with score 0
// update john score to 5 using the updateScore function
// check john score is 5
test("updateScore gets correct score", async () => {
  db = await lib.connect();
  await resetdb("user");
  await lib.addPlayer(db, player);
  await lib.updateScore(db, player.name, 5);
  const score = await lib.getScore(db, player.name);
  expect(score.name).toEqual(player.name);
  expect(score.score).toEqual(5);
});

// add john with score 0
// check john score is 0
// delete john with deletePlayer function
// check john does not exist (may need to modify getScore function to not throw error and instead return meaningful error message)
test("delete player", async () => {
  db = await lib.connect();
  await resetdb("user");
  await lib.addPlayer(db, player);
  const score = await lib.getScore(db, player.name);
  expect(score.name).toEqual(player.name);
  expect(score.score).toEqual(player.score);
  await lib.deletePlayer(db, "john");
  expect(await lib.getScore(db, "john")).toBeNull();
});

// add john with score 0
// add adam with score 5
// add bob with score 10
// get top scores with getTopScores function
// check result is equal to bob, adam, john with correct scores
test("getTopScores gets top scores", async () => {
  db = await lib.connect();
  await resetdb("user");
  await lib.addPlayer(db, player);
  await lib.addPlayer(db, player2);
  await lib.addPlayer(db, player3);
  const scores = await lib.getTopScores(db);
  expect(scores.every((e) => [10, 5, 0].includes));
});

// check getQuestions function returns the questions we entered
test("getQuestions", async () => {
  db = await lib.connect();
  await resetdb("user");
  const questions = await lib.getQuestions(db, 10);
  expect(questions.length).toEqual(10);
});
