const express = require("express");
const app = express();

const users = [
  { id: 1, nom: "Alice", age: 25, hobbies: ["lecture", "randonnee"] },
  { id: 2, nom: "Bob", age: 30, hobbies: ["jeuxvideo", "cuisine"] },
  { id: 3, nom: "Charlie", age: 22, hobbies: ["musique", "voyages"] },
  { id: 4, nom: "Diana", age: 28, hobbies: ["yoga", "dessin"] },
  { id: 5, nom: "Ethan", age: 35, hobbies: ["peche", "bricolage"] },
  { id: 6, nom: "Fiona", age: 27, hobbies: ["danse", "lecture"] },
  { id: 7, nom: "George", age: 29, hobbies: ["natation", "musique"] },
  { id: 8, nom: "Hannah", age: 24, hobbies: ["photographie", "voyages"] },
  { id: 9, nom: "Ian", age: 33, hobbies: ["escalade", "randonnee"] },
  { id: 10, nom: "Jasmine", age: 21, hobbies: ["dessin", "yoga"] },
  { id: 11, nom: "Kevin", age: 31, hobbies: ["cuisine", "basket"] },
  { id: 12, nom: "Liam", age: 26, hobbies: ["lecture", "escalade"] },
  { id: 13, nom: "Mia", age: 23, hobbies: ["danse", "voyages"] },
  { id: 14, nom: "Noah", age: 34, hobbies: ["peche", "natation"] },
  { id: 15, nom: "Olivia", age: 29, hobbies: ["jeuxvideo", "photographie"] },
];

app.get("/", (req, res) => {
  console.info("I got a ", req);
  res.send("Hello ! ");
});

app.get("/users", (req, res) => {
  const limit = parseInt(req.query.limit) || 10;

  const limitedUsers = users.slice(0, limit);
  res.json(limitedUsers);
});

app.get("/users/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find((user) => user.id === id);

  if (user) res.json(user);
  else res.sendStatus(404);
});

const serverPort = 3310;

app.listen(serverPort, () => {
  console.info(`Listening on ${serverPort}`);
});
