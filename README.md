DevPulse – Issue & Feature Tracker

DevPulse is a collaborative issue tracking system designed for software teams to report bugs, suggest features, and manage resolution workflows efficiently.

Live Deployment

Frontend: TBD
Backend API: https://dev-pulse-ashen-zeta.vercel.app

Tech Stack
Technology	Purpose
Node.js	Runtime environment
TypeScript	Type safety
Express.js	Backend framework
PostgreSQL	Relational database
pg	Native PostgreSQL driver
bcrypt	Password hashing (8–12 rounds)
jsonwebtoken	Authentication (JWT)
tsup	Build tool
Features

User Authentication and Authorization

JWT-based login and registration
Role-based access control (contributor, maintainer)
Secure password hashing using bcrypt

Issue Management System

Create, update, and delete issues
Filter issues by type (bug / feature_request)
Filter by status (open / in_progress / resolved)
Sort by newest and oldest
Reporter tracking for each issue

System Design

Modular architecture with separation of concerns
Controller, service, and route layers
Centralized configuration handling

Deployment

Environment variable support
CORS enabled backend
Serverless deployment on Vercel
Installation and Setup

Prerequisites

Node.js 24 or higher
PostgreSQL database
npm

Steps

git clone https://github.com/Mohaimen-Hridoy/devpulse
cd devpulse

npm install

cp .env.example .env
Update DATABASE_URL, JWT_SECRET, PORT

npm run dev

Environment Variables

DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your_jwt_secret
PORT=5000
NODE_ENV=development

API Endpoints

Authentication

POST /api/auth/signup
POST /api/auth/login

Issues

POST /api/issues
GET /api/issues
GET /api/issues/:id
PATCH /api/issues/:id
DELETE /api/issues/:id

Authentication
JWT token is generated on login
Token includes: id, name, role
Protected routes require Authorization header
Role-based access enforced
Database Schema

Users table

id (SERIAL PRIMARY KEY)
name (VARCHAR NOT NULL)
email (UNIQUE NOT NULL)
password (hashed string)
role (contributor or maintainer)
created_at
updated_at

Issues table

id (SERIAL PRIMARY KEY)
title (max 150 characters)
description (minimum 20 characters)
type (bug or feature_request)
status (open, in_progress, resolved)
reporter_id
created_at
updated_at
Roles and Permissions

Contributor

Create issues
View issues
Update own issues (only if open)

Maintainer

Full access to all issues
Update any issue
Delete any issue
Manage issue status
Error Handling

Standard response format

{
"success": false,
"message": "Error message",
"errors": "Error details"
}

Project Structure

src
modules
middleware
config
db
app.ts
server.ts

api
index.ts

Testing

Use Postman or similar tools

Register user
Login and get token
Use token in Authorization header for protected routes
Notes
Raw SQL queries using pg driver
No ORM or query builder used
No JOIN operations
Strict TypeScript usage
Modular architecture followed