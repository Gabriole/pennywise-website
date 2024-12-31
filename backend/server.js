const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Database setup
const db = new sqlite3.Database(":memory:");
db.serialize(() => {
  db.run(`
    CREATE TABLE transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      category TEXT,
      amount REAL,
      date TEXT
    )
  `);
});

// Routes
app.get("/api/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

app.post("/api/transactions", (req, res) => {
  const { type, category, amount, date } = req.body;
  db.run(
    "INSERT INTO transactions (type, category, amount, date) VALUES (?, ?, ?, ?)",
    [type, category, amount, date],
    function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ id: this.lastID });
    }
  );
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
