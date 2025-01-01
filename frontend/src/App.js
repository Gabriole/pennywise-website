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
  const [totals, setTotals] = useState({ income: 0, expense: 0 });

  useEffect(() => {
    axios.get(`${API_URL}/transactions`).then((response) => {
      setTransactions(response.data);
      calculateTotals(response.data);
    });
  }, []);

  const calculateTotals = (transactions) => {
    const income = transactions
      .filter((t) => t.type === "Income")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    const expense = transactions
      .filter((t) => t.type === "Expense")
      .reduce((acc, t) => acc + parseFloat(t.amount), 0);
    setTotals({ income, expense });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${API_URL}/transactions`, form).then((response) => {
      const newTransaction = { ...form, id: response.data.id };
      const updatedTransactions = [...transactions, newTransaction];
      setTransactions(updatedTransactions);
      calculateTotals(updatedTransactions);
      setForm({ type: "", category: "", amount: "", date: "" });
    });
  };

  const handleDelete = (id) => {
    axios.delete(`${API_URL}/transactions/${id}`).then(() => {
      const updatedTransactions = transactions.filter((t) => t.id !== id);
      setTransactions(updatedTransactions);
      calculateTotals(updatedTransactions);
    });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{ color: "#ff5733" }}>PennyWise Expense Tracker</h1>
        <p>
          Total Income: ${totals.income} | Total Expense: ${totals.expense}
        </p>
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
              <button
                className="delete-button"
                onClick={() => handleDelete(t.id)}
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
      <footer>
        <p>Made with 💖 by Gabriole</p>
      </footer>
    </div>
  );
}

export default App;
