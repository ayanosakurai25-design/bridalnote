const mysql = require("mysql2");
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "nyairks2-",
  database: "bridal_note",
});

db.query("SELECT 1", (err) => {
  if (err) {
    console.error("MySQL接続失敗:", err);
  } else {
    console.log("MySQL接続成功！");
  }
});

app.get("/api/todos", (req, res) => {
  db.query("SELECT * FROM todos", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "DBエラー" });
      return;
    }

    res.json(results);
  });
});

app.get("/api/guests", (req, res) => {
  db.query("SELECT * FROM guests", (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "DBエラー" });
      return;
    }

    res.json(results);
  });
});

app.post("/api/guests", (req, res) => {
  const { name, relation, status } = req.body;

  db.query(
    "INSERT INTO guests (name, relation, status) VALUES (?, ?, ?)",
    [name, relation, status],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "DBエラー" });
        return;
      }

      res.json({
        id: result.insertId,
        name,
        relation,
        status,
      });
    },
  );
});

app.put("/api/guests/:id", (req, res) => {
  const id = req.params.id;
  const { status } = req.body;

  db.query("UPDATE guests SET status = ? WHERE id = ?", [status, id], (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: "DBエラー" });
      return;
    }

    res.json({
      id,
      status,
    });
  });
});

app.delete("/api/guests/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM guests WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "DBエラー",
      });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Guest not found",
      });
      return;
    }

    res.json({
      message: "Guest deleted",
    });
  });
});

app.post("/api/todos", (req, res) => {
  const { taskName, dueDate, completed } = req.body;

  db.query(
    "INSERT INTO todos (taskName, dueDate, completed) VALUES (?, ?, ?)",
    [taskName, dueDate, completed],
    (err, result) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "DBエラー" });
        return;
      }

      res.json({
        id: result.insertId,
        taskName,
        dueDate,
        completed,
      });
    },
  );
});

app.delete("/api/todos/:id", (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM todos WHERE id = ?", [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).json({
        error: "DBエラー",
      });
      return;
    }

    if (result.affectedRows === 0) {
      res.status(404).json({
        message: "Todo not found",
      });
      return;
    }

    res.json({
      message: "Todo deleted",
    });
  });
});

app.put("/api/todos/:id", (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  db.query(
    "UPDATE todos SET completed = ? WHERE id = ?",
    [completed, id],
    (err) => {
      if (err) {
        console.error(err);
        res.status(500).json({ error: "DBエラー" });
        return;
      }

      res.json({
        id,
        completed,
      });
    },
  );
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
