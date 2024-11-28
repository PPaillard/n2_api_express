const express = require("express");
const app = express();

const connection = require("./database");

// on explique a express qu'il va pouvoir recevoir du JSON et le converti en objet
app.use(express.json());

app.get("/api/articles", (req, res) => {
  connection
    .query("SELECT * FROM user")
    .then(([articles]) => {
      res.send(articles);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.get("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  connection
    .query("SELECT * FROM user WHERE id=?", [id])
    .then(([articles]) => {
      if (articles[0] == null) {
        res.sendStatus(404);
      } else {
        res.send(articles[0]);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.post("/api/articles", (req, res) => {
  const article = req.body;

  console.log(res.body.title);

  // TODO validations (length, format...)

  article.id = parseInt(req.params.id, 10);

  connection
    .query("INSERT INTO article (title, content) VALUES (?, ?)", [
      article.title,
      article.content,
    ])
    .then(([result]) => {
      res.location(`/api/articles/${result.insertId}`).sendStatus(201);
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.put("/api/articles/:id", (req, res) => {
  const article = req.body;

  // TODO validations (length, format...)

  article.id = parseInt(req.params.id, 10);

  connection
    .query("UPDATE article SET ? WHERE id = ?", [article, article.id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

app.delete("/api/articles/:id", (req, res) => {
  const id = parseInt(req.params.id, 10);
  connection
    .query("delete from article where id = ?", [id])
    .then(([result]) => {
      if (result.affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.sendStatus(204);
      }
    })
    .catch((err) => {
      console.error(err);
      res.sendStatus(500);
    });
});

const serverPort = 3310;

app.listen(serverPort, () => {
  console.info(`Listening on ${serverPort}`);
});
