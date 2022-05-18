const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://cis350:cis350@cluster0.apffl.mongodb.net/cis350?retryWrites=true&w=majority";

const connect = async () => {
  try {
    const client = (
      await MongoClient.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
    ).db();
    return client;
  } catch (err) {
    return "fail";
  }
};

const addPlayer = async (db, newPlayer) => {
  try {
    const result = await db.collection("user").insertOne(newPlayer);
    return result;
  } catch (err) {
    return "fail";
  }
};

const deletePlayer = async (db, name) => {
  try {
    const result = await db.collection("user").deleteOne({ name });
    return result;
  } catch (err) {
    return "fail";
  }
};

const getScore = async (db, name) => {
  try {
    const result = await db
      .collection("user")
      .findOne({ name }, { projection: { _id: 0, name: 1, score: 1 } });
    return result;
  } catch (err) {
    return null;
  }
};

const updateScore = async (db, name, score) => {
  try {
    const result = await db.collection("user").updateOne(
      { name },
      {
        $set: {
          score,
        },
      },
      { upsert: true }
    );
    return result;
  } catch (err) {
    return "fail";
  }
};

async function getTopScores(db) {
  // get scores descending
  try {
    const results = await db
      .collection("user")
      .find({})
      .project({ _id: 0, name: 1, score: 1 })
      .sort({ score: -1 })
      .toArray();
    return results;
  } catch (err) {
    return "fail";
  }
}

async function getQuestions(db, n) {
  // get getQuestions
  try {
    const results = await db
      .collection("question")
      .aggregate([{ $sample: { size: n } }])
      .project({ _id: 0, choices: 1, correct: 1, id: 1, image: 1 })
      .toArray();
    return results;
  } catch (err) {
    return "fail";
  }
}

module.exports = {
  connect,
  addPlayer,
  deletePlayer,
  getScore,
  updateScore,
  getTopScores,
  getQuestions,
};
