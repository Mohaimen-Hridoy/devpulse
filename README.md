# 🚼 DevPulse – Issue & Feature Tracker

A collaborative platform for software teams to report bugs, suggest features, and coordinate resolutions.

---

## 📍 Live Deployment

**Frontend:** TBD  
**Backend API:** [https://dev-pulse-ashen-zeta.vercel.app](https://dev-pulse-ashen-zeta.vercel.app)

---

## 🛠️ Technology Stack

| Technology | Purpose |
| --- | --- |
| **Node.js** | LTS runtime (v24+) |
| **TypeScript** | Strict type safety |
| **Express.js** | Modular router architecture |
| **PostgreSQL** | Relational database |
| **pg** | Native PostgreSQL driver (no ORM) |
| **bcrypt** | Password hashing (8-12 salt rounds) |
| **jsonwebtoken** | JWT generation & verification |
| **tsup** | TypeScript bundler |

---

## ✨ Features

✅ **User Authentication & Authorization**
- JWT-based authentication
- Role-based access control (contributor, maintainer)
- Secure password hashing with bcrypt

✅ **Issue Management System**
- Create, read, update, delete issues
- Filter by type (bug/feature_request) and status (open/in_progress/resolved)
- Sort by newest/oldest
- Reporter attribution and role-based permissions

✅ **Modular Architecture**
- Separate modules for users, issues, and middleware
- Reusable service and controller layers
- Centralized configuration management

✅ **Production-Ready**
- Environment variable configuration
- Proper error handling and validation
- CORS enabled
- Vercel serverless deployment

---

## 🚀 Installation & Setup

### Prerequisites
- Node.js 24.x or higher
- PostgreSQL database
- npm or yarn

### Local Development

```bash
# Clone repository
git clone https://github.com/Mohaimen-Hridoy/devpulse
cd devpulse

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Update DATABASE_URL, JWT_SECRET, PORT, etc.

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

```
DATABASE_URL=postgresql://user:password@host:port/dbname
JWT_SECRET=your-secret-key-here
PORT=5000
NODE_ENV=development
```

---

## 🌐 API Endpoints

### 🔐 Authentication Module

#### 1. User Registration
- **Endpoint:** `POST /api/auth/signup`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john.doe@devpulse.com",
    "password": "securePassword123",
    "role": "contributor"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "data": {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@devpulse.com",
      "role": "contributor",
      "created_at": "2026-01-20T09:00:00Z",
      "updated_at": "2026-01-20T09:00:00Z"
    }
  }
  ```

#### 2. User Login
- **Endpoint:** `POST /api/auth/login`
- **Access:** Public
- **Request Body:**
  ```json
  {
    "email": "john.doe@devpulse.com",
    "password": "securePassword123"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Login successful",
    "data": {
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
      "user": {
        "id": 1,
        "name": "John Doe",
        "email": "john.doe@devpulse.com",
        "role": "contributor",
        "created_at": "2026-01-20T09:00:00Z",
        "updated_at": "2026-01-20T09:00:00Z"
      }
    }
  }
  ```

### 📋 Issues Module

#### 3. Create Issue
- **Endpoint:** `POST /api/issues`
- **Access:** Authenticated (contributor, maintainer)
- **Headers:** `Authorization: <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "title": "Database connection timeout under load",
    "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
    "type": "bug"
  }
  ```
- **Success Response (201 Created):**
  ```json
  {
    "success": true,
    "message": "Issue created successfully",
    "data": {
      "id": 45,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "created_at": "2026-01-20T10:30:00Z",
      "updated_at": "2026-01-20T10:30:00Z"
    }
  }
  ```

#### 4. Get All Issues
- **Endpoint:** `GET /api/issues`
- **Access:** Public
- **Query Parameters:**
  - `sort` (optional): `newest` | `oldest` (default: `newest`)
  - `type` (optional): `bug` | `feature_request`
  - `status` (optional): `open` | `in_progress` | `resolved`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Issues retrieved successfully",
    "data": [
      {
        "id": 45,
        "title": "Database connection timeout under load",
        "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
        "type": "bug",
        "status": "open",
        "reporter": {
          "id": 1,
          "name": "John Doe",
          "role": "contributor"
        },
        "created_at": "2026-01-20T10:30:00Z",
        "updated_at": "2026-01-20T14:45:00Z"
      }
    ]
  }
  ```

#### 5. Get Single Issue
- **Endpoint:** `GET /api/issues/:id`
- **Access:** Public
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Issue retrieved successfully",
    "data": {
      "id": 45,
      "title": "Database connection timeout under load",
      "description": "Pool exhausts after 50+ concurrent queries, causing 500 errors",
      "type": "bug",
      "status": "open",
      "reporter": {
        "id": 1,
        "name": "John Doe",
        "role": "contributor"
      },
      "created_at": "2026-01-20T10:30:00Z",
      "updated_at": "2026-01-20T14:45:00Z"
    }
  }
  ```

#### 6. Update Issue
- **Endpoint:** `PATCH /api/issues/:id`
- **Access:** Maintainer (any issue) OR Contributor (own issue, only if status is open)
- **Headers:** `Authorization: <JWT_TOKEN>`
- **Request Body:**
  ```json
  {
    "title": "Updated: Database pool exhaustion fix needed",
    "description": "Updated description with reproduction steps...",
    "type": "bug"
  }
  ```
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Issue updated successfully",
    "data": {
      "id": 45,
      "title": "Updated: Database pool exhaustion fix needed",
      "description": "Updated description with reproduction steps...",
      "type": "bug",
      "status": "open",
      "reporter_id": 1,
      "created_at": "2026-01-20T10:30:00Z",
      "updated_at": "2026-01-20T14:45:00Z"
    }
  }
  ```

#### 7. Delete Issue
- **Endpoint:** `DELETE /api/issues/:id`
- **Access:** Maintainer only
- **Headers:** `Authorization: <JWT_TOKEN>`
- **Success Response (200 OK):**
  ```json
  {
    "success": true,
    "message": "Issue deleted successfully"
  }
  ```

---

## 🗄️ Database Schema

### Users Table

| Field | Type | Constraint | Notes |
| --- | --- | --- | --- |
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing unique identifier |
| `name` | VARCHAR | NOT NULL | Full display name |
| `email` | VARCHAR | UNIQUE, NOT NULL | Must be valid and unique |
| `password` | VARCHAR | NOT NULL | Encrypted with bcrypt |
| `role` | VARCHAR | DEFAULT 'contributor' | Either 'contributor' or 'maintainer' |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-generated on insert |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-refreshed on update |

### Issues Table

| Field | Type | Constraint | Notes |
| --- | --- | --- | --- |
| `id` | SERIAL | PRIMARY KEY | Auto-incrementing unique identifier |
| `title` | VARCHAR | NOT NULL, MAX 150 | Short descriptive headline |
| `description` | TEXT | NOT NULL, MIN 20 | Detailed explanation |
| `type` | VARCHAR | NOT NULL | Either 'bug' or 'feature_request' |
| `status` | VARCHAR | DEFAULT 'open' | One of: open, in_progress, resolved |
| `reporter_id` | INTEGER | NOT NULL | References the user who submitted (no FK constraint) |
| `created_at` | TIMESTAMP | DEFAULT NOW() | Auto-generated on insert |
| `updated_at` | TIMESTAMP | DEFAULT NOW() | Auto-refreshed on update |

---

## 👥 User Roles & Permissions

| Role | Actions |
| --- | --- |
| **contributor** | • Register and log in<br>• Create new issues<br>• View all issues<br>• Update own issue fields (only if status is open)<br>• Cannot delete issues |
| **maintainer** | • All contributor permissions<br>• Update any issue field<br>• Delete any issue<br>• Change issue workflow status independently |

---

## 🔒 Authentication & Authorization

- **JWT Flow:** Credentials → Validation & Hash Comparison → JWT Token → Authorization Header Verification
- **Token Payload:** Includes `id`, `name`, `role` from decoded JWT
- **Protected Endpoints:** Reject requests without valid JWT
- **Role Verification:** Enforced before privileged operations
- **Security:** Passwords never exposed in responses or logs

---

## ⚠️ Error Handling

### Standard Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": "Error details"
}
```

### HTTP Status Codes

| Code | Reason | Usage |
| --- | --- | --- |
| 200 | OK | Successful GET, PATCH, DELETE |
| 201 | Created | Successful POST (resource created) |
| 400 | Bad Request | Validation errors, invalid input |
| 401 | Unauthorized | Missing, expired, or invalid JWT |
| 403 | Forbidden | Valid token but insufficient permissions |
| 404 | Not Found | Requested resource does not exist |
| 409 | Conflict | Business logic conflict (e.g., editing resolved issue) |
| 500 | Internal Server Error | Unexpected server or database error |

---

## 📂 Project Structure

```
DevPulse/
├── src/
│   ├── modules/
│   │   ├── user/
│   │   │   ├── user.controller.ts
│   │   │   ├── user.interface.ts
│   │   │   ├── user.route.ts
│   │   │   └── user.service.ts
│   │   └── issue/
│   │       ├── issue.controller.ts
│   │       ├── issue.interface.ts
│   │       ├── issue.route.ts
│   │       └── issue.service.ts
│   ├── middlewares/
│   │   └── auth.ts
│   ├── config/
│   │   └── index.ts
│   ├── db/
│   │   └── index.ts
│   ├── app.ts
│   └── server.ts
├── api/
│   └── index.ts (Vercel serverless entry)
├── dist/
├── package.json
├── tsconfig.json
├── tsup.config.ts
├── vercel.json
└── README.md
```

---

## 🧪 Testing the API

### Using PowerShell (Windows)

```powershell
# Signup
Invoke-RestMethod -Uri "https://dev-pulse-ashen-zeta.vercel.app/api/auth/signup" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"name":"Test","email":"test@example.com","password":"secret","role":"contributor"}'

# Login
Invoke-RestMethod -Uri "https://dev-pulse-ashen-zeta.vercel.app/api/auth/login" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json" } `
  -Body '{"email":"test@example.com","password":"secret"}'

# Create Issue (replace TOKEN with actual JWT)
Invoke-RestMethod -Uri "https://dev-pulse-ashen-zeta.vercel.app/api/issues" `
  -Method Post `
  -Headers @{ "Content-Type" = "application/json"; "Authorization" = "TOKEN" } `
  -Body '{"title":"Test Bug","description":"This is a test issue for 20 characters","type":"bug"}'
```

### Using Postman / Insomnia
1. Import endpoints from OpenAPI spec or manually add
2. Set method, URL, and headers
3. Add JSON body for POST/PATCH requests
4. Copy JWT token from login response to Authorization header

---

## 📝 Key Notes

- ✅ **Modular Architecture:** Separate concerns with service, controller, and route layers
- ✅ **Type Safety:** Strict TypeScript, no `any` types
- ✅ **DRY Principle:** Reusable utilities and helpers
- ✅ **SQL:** Raw `pool.query()` calls, no ORM or query builders
- ✅ **No JOINs:** Reporter data fetched in separate queries
- ✅ **Validation:** Input validation in controllers/services
- ✅ **Error Handling:** Comprehensive try-catch with proper status codes

---

## 📚 Git Commits

15+ meaningful commits tracking progressive development from setup to deployment.

```bash
$ git log --oneline
8bc15c9 Fix ESM imports for Vercel deployment
eadeb4a Fix Vercel serverless setup
98c49d3 Fix deployment configuration
... (12 more commits)
```

---

## 📄 License

This project is part of an assignment. All rights reserved.