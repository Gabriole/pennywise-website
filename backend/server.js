const express = require("express");
const cors = require("cors");
const sqlite3 = require("sqlite3").verbose();
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());

// Database setup
const DB_FILE = process.env.DB_FILE || './database.sqlite';
const db = new sqlite3.Database(DB_FILE, (err) => {
  if (err) {
    console.error("Could not connect to the database:", err.message);
  } else {
    console.log("Connected to the SQLite database.");
  }
});

// Initialize the database schema
db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT,
      category TEXT,
      amount REAL,
      date TEXT
    )
  `);
});

// Default root route
app.get("/", (req, res) => {
  res.send("Backend is running. Use /api for API access.");
});

// API root route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to the PennyWise API!" });
});

// Get all transactions
app.get("/api/transactions", (req, res) => {
  db.all("SELECT * FROM transactions", [], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
});

// Add a new transaction
app.post("/api/transactions", (req, res) => {
  const { type, category, amount, date } = req.body;
  db.run(
    "INSERT INTO transactions (type, category, amount, date) VALUES (?, ?, ?, ?)",
    [type, category, amount, date],
    function (err) {
      if (err) {
        console.error("Error inserting data:", err.message);
        return res.status(500).json({ error: err.message });
      }
      res.json({ id: this.lastID });
    }
  );
});

// Handle undefined routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
