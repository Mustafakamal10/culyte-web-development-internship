# Week 11 — Backend: Logic Separation Architecture

## Overview
Week 11 introduces **Logic Separation** (layered architecture). In professional backend engineering, mixing database queries, data transformation, HTTP handling, and validation in a single file leads to bloated, unmaintainable, and untestable code.

By separating code into dedicated layers:
* **Routes** define endpoints and HTTP methods.
* **Controllers** handle HTTP requests and responses.
* **Services** (`app/utils/*.service.js`) encapsulate business logic and database interactions.
* **Models** manage database schemas and relationships.

---

## The Request Flow

```text
HTTP Request
     ↓
   Route        (Defines URI and attaches middleware)
     ↓
 Controller     (Parses req.body / req.params, invokes service, sends res)
     ↓
  Service       (Business rules, validations, orchestrates data)
     ↓
   Model        (Sequelize ORM definitions & queries)
     ↓
  Database      (Stores persistent data)
```

---

## Layer Responsibilities

### 1. Routes (`app/routes/`)
* Define HTTP endpoints (`GET`, `POST`, `PUT`, `DELETE`).
* Attach route-level middlewares (authentication, validators).
* Route traffic directly to corresponding controller functions.
* **Rule**: No business logic or database queries inside route files.

### 2. Controllers (`app/controllers/`)
* Receive Express `req` and `res` objects.
* Extract request data from `req.params`, `req.body`, and `req.query`.
* Call appropriate methods in the Service layer.
* Return clean HTTP responses with appropriate status codes (`200`, `201`, `400`, `404`, `500`).
* **Rule**: Keep controllers thin. Do not write database queries (`User.findAll()`) inside controllers.

### 3. Services (`app/utils/*.service.js`)
* Contain all core business logic, calculations, and rules.
* Directly interact with models (`User`, `Task`).
* Can be reused across multiple controllers, background workers, or CLI scripts.
* Throw structured errors with status codes when business conditions fail.

### 4. Models (`app/models/`)
* Define table schemas, data types, defaults, and validations.
* Establish relationships (e.g., `User.hasMany(Task)` and `Task.belongsTo(User)`).

---

## Controller vs Service

| Feature | Controller | Service (`app/utils/*.service.js`) |
| :--- | :--- | :--- |
| **Primary Role** | HTTP Request/Response handling | Core Business Logic & Data Access |
| **Aware of Express (`req`, `res`)?** | Yes | No (Pure JavaScript functions) |
| **Database Queries** | Never | Yes |
| **Reusability** | Tied to HTTP routes | Fully reusable across APIs, CLI, Cron |
| **Input/Output** | Express `req` $\rightarrow$ `res.json()` | Plain arguments $\rightarrow$ Returns data/Promise |

---

## Why Business Logic Should NOT Live in Controllers

1. **Reusability**: If user registration logic is in a controller, you cannot reuse it in a seed script, webhook, or background queue without mocking `req` and `res`.
2. **Single Responsibility Principle (SRP)**: Controllers focus only on HTTP transport; Services focus on business rules.
3. **Testability**: Services can be unit tested without spinning up an HTTP server or mocking Express objects.
4. **Maintainability**: When business rules change (e.g., email uniqueness checks, task assignment constraints), you only edit the service layer.

---

## API Endpoints

### User Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/users` | Fetch all users with associated tasks |
| `GET` | `/api/users/:id` | Fetch a single user by ID |
| `POST` | `/api/users` | Create a new user |
| `PUT` | `/api/users/:id` | Update an existing user |
| `DELETE` | `/api/users/:id` | Delete a user |

### Task Endpoints
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/tasks` | Fetch all tasks with associated user |
| `GET` | `/api/tasks/:id` | Fetch a single task by ID |
| `POST` | `/api/tasks` | Create a new task |
| `PUT` | `/api/tasks/:id` | Update a task |
| `DELETE` | `/api/tasks/:id` | Delete a task |

---

## Running the Project

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Copy `.env.example` to `.env`:
```env
PORT=5000
DB_NAME=week11_db
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1
DB_DIALECT=sqlite
```

### 3. Run Migrations & Seeders (Optional)
```bash
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
```

### 4. Start Server
```bash
# Development mode
npm run dev

# Production mode
npm start
```
Server runs at `http://localhost:5000`.

---

## Postman Testing

Import `postman/Week-11-Logic-Separation.json` into Postman to test all CRUD routes and error cases.
