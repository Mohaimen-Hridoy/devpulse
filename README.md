🚼 DevPulse – Issue & Feature Tracker

DevPulse is a collaborative issue tracking system built for software teams to report bugs, suggest features, and manage resolution workflows efficiently.

📍 Live Deployment

Frontend: TBD
Backend API: https://dev-pulse-ashen-zeta.vercel.app
🛠️ Tech Stack
Technology	Purpose
Node.js	Runtime environment (v24+)
TypeScript	Type safety
Express.js	Backend framework
PostgreSQL	Relational database
pg	Native PostgreSQL driver (no ORM)
bcrypt	Password hashing (salt 8–12 rounds)
jsonwebtoken	Authentication (JWT)
tsup	TypeScript build tool

✨ Features

🔐 Authentication & Authorization
JWT-based login and registration
Role-based access control (contributor, maintainer)
Secure password hashing using bcrypt

🐞 Issue Management

Create, update, delete issues
Filter by type (bug / feature request)
Filter by status (open / in_progress / resolved)
Sort issues (newest / oldest)
Reporter tracking for each issue

🧱 System Design

Modular folder structure (auth, issues, middleware)
Separation of controller, service, and route layers
Centralized configuration management


🚀 Deployment Ready

Environment variable support
CORS enabled backend
Serverless deployment on Vercel
⚙️ Installation & Setup
Requirements
Node.js 24+
PostgreSQL database
npm
Steps
git clone https://github.com/Mohaimen-Hridoy/devpulse
cd devpulse

npm install

cp .env.example .env
# update DATABASE_URL, JWT_SECRET, PORT

npm run dev

🌐 Environment Variables
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development
📡 API Endpoints
🔐 Auth
Register

POST /api/auth/signup

Login

POST /api/auth/login

🐞 Issues
Create Issue

POST /api/issues
Header: Authorization: <JWT_TOKEN>

Get All Issues

GET /api/issues

Query:

sort = newest | oldest
type = bug | feature_request
status = open | in_progress | resolved
Get Single Issue

GET /api/issues/:id

Update Issue

PATCH /api/issues/:id
Header: Authorization: <JWT_TOKEN>

Delete Issue

DELETE /api/issues/:id
Header: Authorization: <JWT_TOKEN>

🗄️ Database Schema
users
id (SERIAL PRIMARY KEY)
name (VARCHAR NOT NULL)
email (UNIQUE NOT NULL)
password (hashed string)
role (contributor | maintainer)
created_at
updated_at
issues
id (SERIAL PRIMARY KEY)
title (max 150 chars)
description (min 20 chars)
type (bug | feature_request)
status (open, in_progress, resolved)
reporter_id
created_at
updated_at

👥 Roles & Permissions

Role	Permissions
Contributor	Create issues, view issues, update own open issues
Maintainer	Full access (update/delete any issue, manage workflow)

🔐 Authentication Flow

User logs in and receives JWT token
Token contains: id, name, role
Protected routes validate token
Role-based checks applied before sensitive actions

⚠️ Error Handling

Standard response format:

{
  "success": false,
  "message": "Error message",
  "errors": "Details"
}
📂 Project Structure
src/
 ├── modules/
 ├── middleware/
 ├── config/
 ├── db/
 ├── app.ts
 ├── server.ts
api/
 ├── index.ts
🧪 Testing

Use Postman / Insomnia:

Register → Login → Copy JWT
Use JWT in Authorization header for issue routes

📝 Notes
Raw SQL only (pg driver)
No ORM or query builder used
No JOIN operations (manual data fetching)
Strict TypeScript enforced
Modular architecture followed
