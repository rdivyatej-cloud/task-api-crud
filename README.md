# Task API CRUD with SQLite

## Project Overview

This project is a RESTful Task Management API built using **Node.js**, **Express.js**, and **SQLite**. It supports full CRUD (Create, Read, Update, Delete) operations while storing data in a SQLite database instead of an in-memory array.

The API behavior remains the same as the previous assignment, but data is now stored permanently in a database and survives server restarts.

---

## Technologies Used

- Node.js
- Express.js
- SQLite
- better-sqlite3
- Swagger UI
- Postman

---

## Why SQLite?

SQLite was chosen because it is lightweight, serverless, easy to configure, and stores all data in a single database file (`tasks.db`). It is ideal for learning SQL and building small backend applications.

---

## Database Location

The SQLite database file is stored in the project root.

```
tasks.db
```

The database and the `tasks` table are automatically created when the application starts if they do not already exist.

---

## Installation

Clone the repository:

```bash
git clone https://github.com/rdivyatej-cloud/task-api-crud.git
```

Install dependencies:

```bash
npm install
```

---

## Run the Project

Start the server:

```bash
node server.js
```

The API will be available at:

```
http://localhost:3000
```

Swagger documentation:

```
http://localhost:3000/docs
```

---

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/:id | Get task by ID |
| POST | /tasks | Create a task |
| PUT | /tasks/:id | Update a task |
| DELETE | /tasks/:id | Delete a task |

---

## Example SQL Query

```sql
SELECT * FROM tasks;
```

This query returns all records from the `tasks` table.

---

## Database Screenshot

Add a screenshot of the `tasks` table from DB Browser for SQLite here.

Example:

```
images/database.png
```

---

## Features

- SQLite database integration
- Persistent storage
- Automatic database creation
- Automatic table creation
- Three sample tasks inserted on first run
- CRUD operations using SQL queries
- Swagger API documentation
- Error handling for invalid requests
