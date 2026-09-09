# Week 9: Sequelize ORM, Models, Data Types, Associations & Migrations

This folder demonstrates the core concepts of Sequelize ORM with MySQL in Node.js, covering models, data types, associations, and version-controlled database migrations.

---

## 1. What is a Sequelize Model?

A **Sequelize Model** is an abstraction in JavaScript that represents a table in the database. Each model defines:
- The table name in MySQL.
- The columns and their data types.
- Constraints (e.g., `primaryKey`, `allowNull`, `unique`, `references`).
- Relationships with other models (associations).

Instead of writing SQL queries like `CREATE TABLE` or `SELECT * FROM users`, you interact with JavaScript methods such as `User.create()`, `User.findAll()`, or `User.findByPk()`.

---

## 2. Common Sequelize Data Types

Sequelize provides data type mappings for standard SQL types via `DataTypes`:

- **`INTEGER`**: Represents numerical integer values (e.g., `1`, `42`, primary keys, foreign keys).
- **`STRING`**: Represents short text/character strings (VARCHAR, default max length 255). Ideal for names, titles, emails.
- **`TEXT`**: Represents long form text strings. Ideal for descriptions, articles, or notes.
- **`DATE`**: Represents timestamps/date-time objects. Used for `createdAt`, `updatedAt`, `dueDate`.
- **`BOOLEAN`**: Represents true/false flag values.
- **`FLOAT` / `DOUBLE` / `DECIMAL`**: Represents floating-point numbers or fixed-point currency figures.

---

## 3. What are Associations?

**Associations** define how different database tables/models relate to each other. Sequelize handles foreign key references and automatic SQL `JOIN` queries under the hood when fetching associated data.

### One-to-Many Relationship (`User` → `Task`)
- **Concept**: A single User can have multiple Tasks, but each Task belongs to only one User.
- **Implementation**:
  - `User.hasMany(Task, { foreignKey: "userId", as: "tasks" })`
  - `Task.belongsTo(User, { foreignKey: "userId", as: "user" })`
- **Foreign Key**: `userId` inside the `Tasks` table.

### Many-to-Many Relationship (`User` ↔ `Project`)
- **Concept**: A User can belong to many Projects, and a Project can have many Users assigned to it.
- **Implementation**:
  - Requires a junction table (`UserProject`).
  - `User.belongsToMany(Project, { through: UserProject, foreignKey: "userId", otherKey: "projectId", as: "projects" })`
  - `Project.belongsToMany(User, { through: UserProject, foreignKey: "projectId", otherKey: "userId", as: "users" })`
- **Junction Table**: `UserProjects` contains `userId` and `projectId` as foreign keys.

---

## 4. What is a Migration?

A **Migration** is a version-controlled file containing code instructions to create, alter, or drop database tables and columns. Migrations act like version control (Git) for your database schema.

Each migration file exports two main methods:
- **`up`**: Executes the changes (e.g., creating a table or adding a column).
- **`down`**: Reverts/rolls back the changes (e.g., dropping the table or removing the column).

---

## 5. Why Migrations Make Schema Changes Version-Controlled

Database schemas evolve over time as new features are built. Migrations make schema changes version-controlled because:

1. **History Tracking**: Every change to the database structure is recorded chronologically in codebase files.
2. **Team Synchronization**: Developers can pull code from Git and run pending migrations to ensure their local databases match the production/staging schema exactly.
3. **Reproducibility**: Deployments to test, staging, and production environments can reliably apply schema updates without manual SQL scripts.
4. **Rollback Safety**: If a schema change causes an issue, `db:migrate:undo` allows stepping back safely.

---

## 6. What `model:generate` Does

The command `npx sequelize-cli model:generate` automates model and migration boilerplate creation:
- Generates a model file in `app/models/`.
- Generates a timestamped migration file in `app/migrations/`.

Example command:
```bash
npx sequelize-cli model:generate --name User --attributes name:string,email:string,bio:text
```

---

## 7. What `db:migrate` Does

The command `npx sequelize-cli db:migrate` executes all pending migration files that have not yet been run against the target database:
- Reads the `SequelizeMeta` table in MySQL to track which migrations were already applied.
- Executes the `up` function of any new migration files in chronological order.
- Updates the database schema cleanly and registers the applied migration names into `SequelizeMeta`.

---

## Folder Structure

```
Week-9/
├── .env
├── .env.example
├── .gitignore
├── .sequelizerc
├── README.md
├── app.js
├── server.js
├── package.json
├── config/
│   └── config.json
└── app/
    ├── models/
    │   ├── index.js
    │   ├── user.js
    │   ├── task.js
    │   ├── project.js
    │   └── userProject.js
    ├── migrations/
    │   ├── 20260907000001-create-users.js
    │   ├── 20260907000002-create-tasks.js
    │   ├── 20260907000003-create-projects.js
    │   └── 20260907000004-create-user-projects.js
    ├── seeders/
    │   ├── 20260907000001-seed-users.js
    │   ├── 20260907000002-seed-tasks.js
    │   ├── 20260907000003-seed-projects.js
    │   └── 20260907000004-seed-user-projects.js
    ├── controllers/
    │   ├── userController.js
    │   └── projectController.js
    └── routes/
        ├── userRoutes.js
        └── projectRoutes.js
```
