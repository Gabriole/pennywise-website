import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

const API_URL = "https://pennywise-website.onrender.com/api";

function App() {
  const [transactions, setTransactions] = useState([]);
  const [form, setForm] = useState({
    type: "",
    category: "",
    amount: "",
    date: "",
  });

  useEffect(() => {
    axios.get(`${API_URL}/transactions`).then((response) => {
      setTransactions(response.data);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/transactions`, form).then((response) => {
      setTransactions([...transactions, { ...form, id: response.data.id }]);
      setForm({ type: "", category: "", amount: "", date: "" });
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>PennyWise Expense Tracker</h1>
      </header>
      <main>
        <form className="transaction-form" onSubmit={handleSubmit}>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            required
          >
            <option value="">Type</option>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input
            type="text"
            placeholder="Category"
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            required
          />
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            required
          />
          <button type="submit">Add Transaction</button>
        </form>
        <ul className="transaction-list">
          {transactions.map((t) => (
            <li key={t.id}>
              <strong>{t.type}</strong>: {t.category} - ${t.amount} ({t.date})
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Made with 💖 by PennyWise Team</p>
      </footer>
    </div>
  );
}

export default App;
