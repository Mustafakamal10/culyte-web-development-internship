# Week 10 — Role-Based Authorization, Account Status & Authentication Middleware

This project demonstrates an enterprise-grade authentication and authorization workflow in Node.js and Express. It includes request validation middleware, password hashing with `bcryptjs`, token-based authentication with `jsonwebtoken` (JWT), account status validation, and role-based access control (RBAC) for protecting admin-only routes.

---

## 📁 Project Structure

```text
Week-10/
├── config/
│   └── corsOptions.js
├── controllers/
│   ├── adminController.js
│   └── authController.js
├── middlewares/
│   ├── account_status.js
│   ├── authJwt.js
│   ├── logger.js
│   ├── role.js
│   └── verify_signup.js
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

## 🔐 Authentication vs Authorization

| Concept | Question Answered | Description | Example |
| :--- | :--- | :--- | :--- |
| **Authentication** | *Who are you?* | Verifies the identity of a user via credentials (email & password) and issues a signed token (JWT). | User logs in and receives a JWT token. |
| **Authorization** | *What are you allowed to do?* | Determines whether an authenticated user has permissions to access a specific resource based on their role (`admin`, `user`). | Only users with `role: "admin"` can access `/api/admin/dashboard`. |

---

## ⛓️ Middleware Pipeline Order

Express middleware runs sequentially in a chain. For protected and role-restricted endpoints, the pipeline executes in the following order:

```text
Request
   ↓
Authentication (authJwt.js)
   ↓
Account Status (account_status.js)
   ↓
Role Authorization (role.js)
   ↓
Controller / Route Handler
```

1. **`authJwt.js`**: Checks the `Authorization: Bearer <token>` header, verifies the JWT signature, and attaches the user to `req.user`.
2. **`account_status.js`**: Verifies that the authenticated user's account is `active`. Returns `403 Forbidden` if `inactive`.
3. **`role.js`**: Verifies that `req.user.role` matches the required role (`admin`). Returns `403 Forbidden` if unauthorized.
4. **Controller**: Handles the business logic and returns the response once all security checks pass.

---

## 🔄 Complete System Flows

### 1. Signup Flow

```text
Signup Request (POST /api/auth/signup)
   ↓
verify_signup Middleware (Validates presence, email format, min password length, uniqueness)
   ↓
bcryptjs Hashing (bcrypt.hash)
   ↓
Save User to Database (Default: role = 'user', account_status = 'active')
   ↓
201 Created Response
```

### 2. Login Flow

```text
Login Request (POST /api/auth/login)
   ↓
Find User by Email
   ↓
Check Account Status (Must be active)
   ↓
bcryptjs Comparison (bcrypt.compare)
   ↓
Generate JWT Token (jwt.sign containing id and role)
   ↓
200 OK Response with Token
```

### 3. Protected Profile Flow

```text
GET /api/auth/profile
   ↓
authJwt.js (Verify JWT Token)
   ↓
account_status.js (Verify status === 'active')
   ↓
authController.getProfile (Return profile data without password)
```

### 4. Admin-Only Route Flow

```text
GET /api/admin/dashboard
   ↓
authJwt.js (Verify JWT Token)
   ↓
account_status.js (Verify status === 'active')
   ↓
role.js (Verify req.user.role === 'admin')
   ↓
adminController.getDashboard (Return Admin Dashboard Data)
```

---

## 🛠️ API Endpoints

| Method | Endpoint | Description | Middleware Stack | Expected Status |
| :--- | :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/signup` | Register new user | `verifySignup` | `201`, `400`, `500` |
| `POST` | `/api/auth/login` | Login user & get JWT | None | `200`, `400`, `401`, `403` |
| `GET` | `/api/auth/profile` | Get user profile | `verifyToken` → `checkAccountStatus` | `200`, `401`, `403`, `404` |
| `GET` | `/api/admin/dashboard` | Admin dashboard | `verifyToken` → `checkAccountStatus` → `authorizeRole("admin")` | `200`, `401`, `403` |

---

## ⚙️ Setup & Installation

### 1. Install Dependencies

```bash
cd Week-10
npm install
```

### 2. Configure Environment Variables

Create or verify `.env`:

```env
PORT=5000
JWT_SECRET=week10_secret_key
CLIENT_ORIGIN=http://localhost:5173
```

### 3. Run the Server

```bash
# Production mode
npm start

# Development mode
npm run dev
```

---

## 👥 Seeded / Default Users for Testing

| Name | Email | Password | Role | Account Status |
| :--- | :--- | :--- | :--- | :--- |
| Admin User | `admin@example.com` | `Admin123` | `admin` | `active` |
| Normal User | Create via `POST /api/auth/signup` | User specified | `user` | `active` |

---

## 📮 Testing with Postman

Import `postman/Week-10-API-Collection.json` into Postman.

### Collection Layout

```text
Authentication
├── Signup
├── Login (Saves {{token}})
├── Login - Admin (Saves {{adminToken}})
└── Profile

Admin Authorization
├── Admin Dashboard (Expected: 200 with {{adminToken}})
├── Admin Dashboard - Normal User (Expected: 403 with {{token}})
└── Admin Dashboard - Invalid Token (Expected: 401)

Signup Validation
├── Missing Name (400 Bad Request)
├── Missing Email (400 Bad Request)
├── Missing Password (400 Bad Request)
├── Invalid Email (400 Bad Request)
└── Duplicate Email (400 Bad Request)

Middleware / Authentication Failure Cases
├── Profile - No Token (401 Unauthorized)
├── Profile - Invalid Token (401 Unauthorized)
└── Login - Wrong Password (401 Unauthorized)
```

### Verification Matrix

* **Normal User (`role: "user"`)**:
  * `/api/auth/profile` → `200 OK`
  * `/api/admin/dashboard` → `403 Forbidden`
* **Admin User (`role: "admin"`)**:
  * `/api/auth/profile` → `200 OK`
  * `/api/admin/dashboard` → `200 OK`
