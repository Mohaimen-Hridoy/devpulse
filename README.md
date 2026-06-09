# DevPulse API

DevPulse is a backend REST API built using Express, TypeScript, and PostgreSQL. It follows a modular architecture for scalability and maintainability.

---

## Live URL

[https://devpulse-api.vercel.app](https://devpulse-api.vercel.app)

---

## Tech Stack

- Express.js
- TypeScript
- PostgreSQL
- tsx
- dotenv

---
 
 
## Features

- User Authentication (Register/Login)
- Issue Management System
- Role-based access control
- Middleware-based authorization
- REST API architecture
- Modular project structure

---

## Installation & Setup

```bash
git clone https://github.com/Mohaimen-Hridoy/devpulse
cd devpulse
npm install
npx tsc --init

```

---

## API Endpoints

### User Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/users/register` | Create new user |
| `POST` | `/api/users/login` | Login user |
| `GET` | `/api/users/me` | Get logged-in user |

### Issue Routes

| Method | Endpoint | Description |
| --- | --- | --- |
| `POST` | `/api/issues` | Create issue |
| `GET` | `/api/issues` | Get all issues |
| `GET` | `/api/issues/:id` | Get single issue |
| `PUT` | `/api/issues/:id` | Update issue |
| `DELETE` | `/api/issues/:id` | Delete issue |

---

## Database Schema Summary

### Users Table

* `id` : SERIAL PRIMARY KEY
* `name` : VARCHAR
* `email` : VARCHAR UNIQUE
* `password` : VARCHAR
* `role` : VARCHAR DEFAULT 'user'
* `created_at` : TIMESTAMP

### Issues Table

* `id` : SERIAL PRIMARY KEY
* `title` : VARCHAR
* `description` : TEXT
* `status` : VARCHAR DEFAULT 'open'
* `user_id` : INTEGER (Foreign Key)
* `created_at` : TIMESTAMP

```

```