# Week 9: Relational Database Basics

This project demonstrates core relational database concepts using Node.js, Express, Sequelize ORM, and MySQL.

---

## Conceptual Overview

### What is a Relational Database?
A Relational Database is a structured database system that organizes data into tables consisting of rows and columns. Relationships between data entities are established using Foreign Keys.

### What is a Table?
A Table is a collection of related data entries organized in rows (records) and columns (attributes). For example, the `Users` table stores user information where each row represents a single user.

### What is a One-to-Many Relationship?
A One-to-Many relationship occurs when a single record in one table is associated with multiple records in another table.
- **Example**: One `User` can have many `Tasks`, but each `Task` belongs to only one `User`.

### What is a Many-to-Many Relationship?
A Many-to-Many relationship occurs when multiple records in one table relate to multiple records in another table.
- **Example**: One `User` can participate in many `Projects`, and one `Project` can have many `Users`.

### What is a Junction Table?
A Junction Table (also known as a join or bridge table) bridges a Many-to-Many relationship between two tables by storing pairs of foreign keys.
- **Example**: `UserProjects` contains `userId` and `projectId` to connect `Users` and `Projects`.

---

## Sequelize Relationship Representation

In Sequelize, relationships are defined in the models initialization:

### One-to-Many
```js
User.hasMany(Task, { foreignKey: "userId", as: "tasks" });
Task.belongsTo(User, { foreignKey: "userId", as: "user" });
```

### Many-to-Many
```js
User.belongsToMany(Project, {
  through: UserProject,
  foreignKey: "userId",
  otherKey: "projectId",
  as: "projects"
});

Project.belongsToMany(User, {
  through: UserProject,
  foreignKey: "projectId",
  otherKey: "userId",
  as: "users"
});
```

---

## API Endpoints

- `GET /api/users` - List all users
- `GET /api/users/:id/tasks` - List tasks associated with a user
- `GET /api/users/:id/projects` - List projects associated with a user
- `GET /api/projects/:id/users` - List users associated with a project

---

## Setup & Running the Project

1. **Navigate to project folder**:
   ```bash
   cd week-9
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Configure Environment Variables**:
   Create or verify `.env` file with MySQL credentials:
   ```env
   PORT=5000
   DB_NAME=week9_relational_db
   DB_USER=root
   DB_PASSWORD=
   DB_HOST=127.0.0.1
   DB_DIALECT=mysql
   ```

4. **Create Database**:
   ```bash
   npm run db:create
   ```

5. **Run Migrations**:
   ```bash
   npx sequelize-cli db:migrate
   ```

6. **Run Seeders**:
   ```bash
   npx sequelize-cli db:seed:all
   ```

7. **Start Server**:
   ```bash
   npm start
   ```
