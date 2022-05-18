const request = require("supertest");

import { app } from "./app";

// login invalid username
test("/login endpoint invalid username", async () => {
  await request(app)
    .post("/login")
    .query({ username: "@bcd" })
    .expect(400)
    .then((response) => {
      expect(response.text).toEqual("invalid username");
    });
});

// login valid username
test("/login endpoint status code and response 204", async () => {
  await request(app).post("/login").query({ username: "john" }).expect(204);
});

// score of user not exist
test("/score endpoint status code and response 404", async () => {
  await request(app)
    .get("/score")
    .query({ username: "notexistuser" })
    .expect(404)
    .then((response) =>
      expect(response.text).toEqual("Could not find player.")
    );
});

// put new score and check score is updated
test("/score (PUT) endpoint status code and response 201", async () => {
  await request(app)
    .put("/score")
    .query({ username: "john", score: 5 })
    .expect(201)
    .then((response) => expect(response.text).toEqual("score added"));
});

// add new user, check exist, then delete user and check does not exist
test("/user endpoint status code and response 200", async () => {
  await request(app).post("/login").query({ username: "john" });
  await request(app).delete("/user").query({ username: "john" }).expect(200);
});
