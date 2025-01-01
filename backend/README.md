
---

### **Backend README.md**

```markdown
# PennyWise Expense Tracker - Backend

---

## **Overview**
The backend of the **PennyWise Expense Tracker** is responsible for handling data storage, retrieval, and API endpoints for managing transactions. It is built using **Node.js**, with **SQLite** as the database.

---

## **Features**
- RESTful API endpoints for managing transactions.
- Database integration using SQLite.
- Handles CRUD operations for transactions (Create, Read, Delete).
- Lightweight and fast API for frontend integration.

---

## **Technologies Used**
- **Node.js**: Backend runtime.
- **Express.js**: Web framework for building the API.
- **SQLite**: Lightweight database for transaction storage.

---

## **API Endpoints**

| Method | Endpoint               | Description              |
|--------|------------------------|--------------------------|
| GET    | `/api/transactions`    | Fetch all transactions   |
| POST   | `/api/transactions`    | Add a new transaction    |
| DELETE | `/api/transactions/:id`| Delete a transaction by ID|

---

## **Installation and Setup**

Follow these steps to set up the backend locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/Gabriole/pennywise-website.git
