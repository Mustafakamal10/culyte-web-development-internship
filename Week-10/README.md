# Week-10: CORS Configuration & API Testing with Postman

## Overview

Welcome to Week-10 of the Culyte Web Development Internship. This module focuses on:
1. Understanding and configuring **CORS** (Cross-Origin Resource Sharing).
2. Building clean and secure **Authentication APIs** (Register, Login, Profile).
3. Protecting routes with **JWT (JSON Web Tokens)**.
4. Handling **Success and Failure cases** gracefully.
5. Testing all endpoints and edge cases with **Postman**.

---

## 1. What is CORS?

**CORS** stands for **Cross-Origin Resource Sharing**. It is a browser security mechanism (enforced by the Same-Origin Policy) that controls how web pages running on one origin (domain, protocol, or port) can request resources from a different origin.

An origin is defined by three parts:
* **Protocol** (e.g., `http://` or `https://`)
* **Host/Domain** (e.g., `localhost` or `example.com`)
* **Port** (e.g., `:5173` or `:5000`)

If any of these three elements differ between the frontend and backend, the request is considered **cross-origin**.

---

## 2. Why is CORS Needed?

By default, web browsers block web pages from making AJAX / fetch / Axios requests to a different origin to protect users from malicious attacks (such as Cross-Site Request Forgery or unauthorized data access).

When your frontend application (e.g., running on `http://localhost:5173`) attempts to call your backend server (e.g., running on `http://localhost:5000`), the browser sends a preflight `OPTIONS` request or checks headers to see if the server permits this communication.

Without CORS configuration on the backend, the browser blocks the response and throws a CORS error. By configuring CORS on the backend using the `cors` middleware, we explicitly tell the browser that requests from our frontend origin are trusted.

---

## 3. How Frontend and Backend Communicate

1. **User Action**: The user submits a form (e.g., Register or Login) in the frontend application on `http://localhost:5173`.
2. **HTTP Request**: The frontend makes an HTTP request (`fetch` or `axios`) to `http://localhost:5000/api/auth/...`.
3. **CORS Validation**: The Express backend evaluates incoming origin headers using the `cors` package. If matched, it sets appropriate `Access-Control-Allow-Origin` response headers.
4. **Request Processing**: Express routes the request to controller logic, processes data, hashes passwords or verifies tokens, and generates a response.
5. **JSON Response**: Backend returns a structured JSON response with an appropriate HTTP status code (e.g., `200 OK`, `201 Created`, `400 Bad Request`, `401 Unauthorized`).
6. **Token Handling**: For protected routes, the frontend stores the returned JWT token and includes it in subsequent requests via the `Authorization: Bearer <token>` header.

---

## 4. Project Structure

```text
Week-10/
├── config/
│   └── corsOptions.js
├── controllers/
│   └── authController.js
├── middleware/
│   └── authMiddleware.js
├── models/
│   └── userModel.js
├── postman/
│   └── Week-10-API-Collection.json
├── routes/
│   └── authRoutes.js
├── .env
├── .env.example
├── .gitignore
├── app.js
├── package.json
├── README.md
└── server.js
```

---

## 5. How to Start the Backend

### Step 1: Navigate to Week-10
```bash
cd Week-10
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Verify `.env` has the following variables:
```env
PORT=5000
CLIENT_ORIGIN=http://localhost:5173
JWT_SECRET=culyte_week10_super_secret_key_2026
```

### Step 4: Run the Server
* Production / standard start:
```bash
npm start
```
* Development mode (auto-restart with nodemon):
```bash
npm run dev
```

The server will start listening at: `http://localhost:5000`

---

## 6. Available API Endpoints

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `POST` | `/api/auth/register` | Register a new user account | No |
| `POST` | `/api/auth/login` | Login with email and password | No |
| `GET` | `/api/auth/profile` | Get logged-in user profile details | Yes (Bearer Token) |

---

## 7. How to Test APIs with Postman

### Import Collection
1. Open Postman.
2. Click **Import** in the top left.
3. Select `Week-10/postman/Week-10-API-Collection.json`.
4. The **Week-10 API Collection** will appear with organized folders: `Auth`, `Protected Routes`, and `Failure Cases`.

### Step-by-Step Testing Flow

#### 1. Register User
* **Method**: `POST`
* **URL**: `http://localhost:5000/api/auth/register`
* **Body (JSON)**:
  ```json
  {
    "name": "Mustafa Kamal",
    "email": "mustafa@example.com",
    "password": "Password123"
  }
  ```
* **Expected Status**: `201 Created`
* **Response**:
  ```json
  {
    "success": true,
    "message": "User registered successfully",
    "token": "eyJhbGciOi...",
    "user": {
      "id": 1,
      "name": "Mustafa Kamal",
      "email": "mustafa@example.com"
    }
  }
  ```

#### 2. Login User
* **Method**: `POST`
* **URL**: `http://localhost:5000/api/auth/login`
* **Body (JSON)**:
  ```json
  {
    "email": "mustafa@example.com",
    "password": "Password123"
  }
  ```
* **Expected Status**: `200 OK`
* **Response**:
  ```json
  {
    "success": true,
    "message": "Login successful",
    "token": "eyJhbGciOi...",
    "user": {
      "id": 1,
      "name": "Mustafa Kamal",
      "email": "mustafa@example.com"
    }
  }
  ```

#### 3. Access Protected Profile
* **Method**: `GET`
* **URL**: `http://localhost:5000/api/auth/profile`
* **Headers**:
  * `Authorization`: `Bearer <token_from_login_or_register>`
* **Expected Status**: `200 OK`
* **Response**:
  ```json
  {
    "success": true,
    "data": {
      "id": 1,
      "name": "Mustafa Kamal",
      "email": "mustafa@example.com",
      "createdAt": "2026-09-15T..."
    }
  }
  ```

---

## 8. Expected Failure Cases & Error Responses

| Scenario | Request | Expected Status | Expected Error Response |
|---|---|---|---|
| **Missing Fields** | `POST /api/auth/register` with missing password | `400 Bad Request` | `{"success": false, "message": "Please provide all required fields"}` |
| **Duplicate User** | `POST /api/auth/register` with existing email | `400 Bad Request` | `{"success": false, "message": "User already exists with this email"}` |
| **Invalid Login** | `POST /api/auth/login` with incorrect password | `401 Unauthorized` | `{"success": false, "message": "Invalid email or password"}` |
| **User Not Found** | `POST /api/auth/login` with non-existent email | `401 Unauthorized` | `{"success": false, "message": "Invalid email or password"}` |
| **Missing Token** | `GET /api/auth/profile` without Authorization header | `401 Unauthorized` | `{"success": false, "message": "Access denied. No token provided"}` |
| **Invalid Token** | `GET /api/auth/profile` with invalid token | `401 Unauthorized` | `{"success": false, "message": "Invalid or expired token"}` |
| **Invalid Route** | `GET /api/unknown` | `404 Not Found` | `{"success": false, "message": "Route not found"}` |
