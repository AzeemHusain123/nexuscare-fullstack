# NexusCare — Digital Ecosystem for Smart Community Services

> **COMP-453 Full Stack Development** — Complex Computing Problem (CCP)  
> Pak-Austria Fachhochschule: Institute of Applied Sciences and Technology, Haripur  
> Submitted: December 2025

## Overview

NexusCare is a full-stack web application built as part of the NexusCare Digital Ecosystem for smart community services. The implemented module is the **Complaint & Issue Reporting System**, which allows residents to submit and track community complaints while administrators can monitor, manage, and resolve them.

The system features role-based access control, bcrypt password hashing, a React single-page frontend, a Flask RESTful backend, and a MySQL database.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React.js, Axios, React Router |
| Backend | Python, Flask, Flask-CORS |
| Database | MySQL (via WampServer / phpMyAdmin) |
| Auth | bcrypt password hashing, localStorage session |
| API Testing | Thunder Client |

---

## Features

- User registration and login with bcrypt-hashed passwords
- Role-based access: **Admin** sees all complaints, **User** sees only their own
- Full CRUD — submit, view, edit, and delete complaints
- Complaint status tracking: Open / Resolved
- Dark/Light theme toggle
- Protected routes (dashboard inaccessible without login)
- Responsive UI with loading states and error feedback
- RESTful API with proper HTTP status codes (200, 201, 400, 401, 500)

---

## How to Run

### Prerequisites

- Python 3.x
- Node.js + npm
- WampServer (or any MySQL server)

---

### 1. Set up the Database

1. Start WampServer and open **phpMyAdmin** at `http://localhost/phpmyadmin`
2. Create a new database named `nexuscare`
3. Import the schema: click **Import** → select `nexuscare_schema.sql` → click **Go**

---

### 2. Run the Flask Backend

```bash
cd backend
pip install flask flask-cors flask-mysqldb bcrypt
python app.py
```

Backend runs at: `http://127.0.0.1:5000`

---

### 3. Run the React Frontend

```bash
cd frontend
npm install
npm start
```

Frontend runs at: `http://localhost:3000`

---

### 4. Open in browser

```
http://localhost:3000
```

---

## API Endpoints

| Endpoint | Method | Description | Access |
|---|---|---|---|
| `/register` | POST | Register new user | Public |
| `/login` | POST | Authenticate user | Public |
| `/complaints` | GET | Get complaints | User/Admin |
| `/complaints` | POST | Submit complaint | User |
| `/complaints/<id>` | PUT | Update complaint | Admin/User* |
| `/complaints/<id>` | DELETE | Delete complaint | Admin/User* |

*Users can only modify their own complaints.

---

## Project Structure

```
nexuscare/
│
├── backend/
│   └── app.py                  # Flask app — all routes and API logic
│
├── frontend/
│   ├── public/
│   └── src/
│       ├── App.js              # Routing and layout
│       ├── Login.js            # Authentication page
│       ├── Register.js         # Registration page
│       ├── Dashboard.js        # Complaint management (role-aware)
│       └── ThemeToggle.js      # Dark/Light theme switcher
│
├── nexuscare_schema.sql        # MySQL schema — import this first
├── .gitignore
└── README.md
```

---

## Database Schema

**Users Table**

| Field | Type | Description |
|---|---|---|
| id | INT (PK) | Unique user ID |
| username | VARCHAR | Unique username |
| password | BLOB | bcrypt-hashed password |
| role | VARCHAR | `user` or `admin` |

**Complaints Table**

| Field | Type | Description |
|---|---|---|
| id | INT (PK) | Complaint ID |
| username | VARCHAR (FK) | Reference to users table |
| description | TEXT | Complaint content |
| status | VARCHAR | `Open` or `Resolved` |
| created_at | TIMESTAMP | Submission time |

---

## User Roles

| Role | Permissions |
|---|---|
| **User** | Submit complaints, view own complaints, edit/delete own complaints |
| **Admin** | View all complaints, update any complaint, resolve/delete any complaint |

---

## Authors

- **Azeem Mohamed Husain**

**Instructor:** Ms. Sadia Khan  
**Course:** COMP-453 Full Stack Development  
**Institution:** Pak-Austria Fachhochschule, Haripur, Pakistan
