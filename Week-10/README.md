# Week 10 — Express Middleware, JWT Authentication & bcryptjs

This project demonstrates backend authentication and middleware architecture in Node.js and Express. It covers request processing via custom middleware, password hashing using `bcryptjs`, token-based authentication using JSON Web Tokens (`jsonwebtoken`), protected routes, and API testing with Postman.

---

## 📁 Project Structure

```text
Week-10/
├── config/
│   └── corsOptions.js
├── controllers/
│   └── authController.js
├── middlewares/
│   ├── authJwt.js
│   └── logger.js
├── models/
│   └── userModel.js
├── postman/
│   └── Week-10-API-Collection.json
├── .env
├── .env.example
├── app.js
├── server.js
├── package.json
└── README.md
```

---

## 🚀 Core Concepts

### 1. Express Middleware

Middleware functions in Express intercept incoming HTTP requests before they reach route handlers. They have access to the `req` (request) object, `res` (response) object, and the `next` function in the application’s request-response cycle.

```text
Request
   ↓
Middleware
   ↓
Route Handler
   ↓
Response
```

- **What middleware is:** A function that executes during the lifecycle of an Express request (e.g., logging, authentication, request parsing).
- **How `next()` works:** Calling `next()` passes control to the next middleware function or route handler in the stack. If `next()` is omitted and no response is sent, the request hangs.

---

### 2. Password Hashing with bcryptjs

Storing plain-text passwords is a severe security risk. If a database is compromised, all user passwords would be exposed.

- **Why passwords are hashed:** Hashing converts plain-text passwords into an irreversible cryptographic hash string using salt rounds.
- **`bcrypt.hash(password, salt)`:** Used during user registration to generate a secure hash before storing in the database.
- **`bcrypt.compare(password, hashedPassword)`:** Used during user login to check if the entered plain-text password matches the stored hash without ever decrypting it.

---

### 3. JSON Web Token (JWT) Authentication

JWT is a compact, URL-safe means of representing claims to be transferred between two parties.

- **Login / Token Generation:** When a user successfully logs in, `jwt.sign()` generates a signed token containing user identifiers (`id`, `email`) and an expiration time.
- **Protected Route Verification:** For protected routes, the client includes the token in the `Authorization: Bearer <token>` header. The `authJwt.js` middleware calls `jwt.verify()` to validate the token's signature and expiration, attaching the decoded user object to `req.user`.

---

### 4. Complete Authentication Flow

```text
Register Flow:
User Input (name, email, password)
        ↓
Validate Required Fields
        ↓
Password → bcrypt.hash()
        ↓
Save User to Database
        ↓
Generate JWT Token & Return 201 Created

Login Flow:
User Input (email, password)
        ↓
Find User by Email
        ↓
Password → bcrypt.compare()
        ↓
Generate JWT Token via jwt.sign()
        ↓
Client Receives Token in Response (200 OK)

Protected Route Flow:
Client Request with "Authorization: Bearer <token>"
        ↓
middlewares/authJwt.js Middleware
        ↓
jwt.verify(token, JWT_SECRET)
        ↓
Attach user to req.user & Call next()
        ↓
Protected Route Handler (e.g. GET /api/auth/profile)
        ↓
Return User Profile Data (200 OK)
```

---

## 🛠️ API Endpoints

| Method | Endpoint | Description | Auth Required | Status Codes |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Register a new user | No | `201`, `400`, `409`, `500` |
| `POST` | `/api/auth/login` | Login user & receive JWT token | No | `200`, `400`, `401`, `500` |
| `GET` | `/api/auth/profile` | Get authenticated user profile | Yes (`Bearer <token>`) | `200`, `401`, `404`, `500` |

---

## ⚙️ Setup & Installation

### 1. Install Dependencies

```bash
cd Week-10
npm install
```

### 2. Configure Environment Variables

Create or update `.env`:

```env
PORT=5000
JWT_SECRET=week10_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run the Server

```bash
# Production mode
npm start

# Development mode (with auto-reload)
npm run dev
```

---

## 📮 Testing with Postman

Import `postman/Week-10-API-Collection.json` into Postman.

### Collection Layout

```text
Auth
├── Register
├── Login
└── Profile

Middleware / Authentication Failure Cases
├── Profile - No Token
├── Profile - Invalid Token
├── Login - Wrong Password
└── Register - Duplicate Email
```

### Automatic Token Handling in Postman

The **Login** request has a built-in test script:

```javascript
if (pm.response.code === 200) {
    var jsonData = pm.response.json();
    if (jsonData.token) {
        pm.collectionVariables.set("token", jsonData.token);
    }
}
```

When you send the **Login** request, the returned token is automatically stored in the `{{token}}` variable and applied to the **Profile** request header (`Authorization: Bearer {{token}}`).
