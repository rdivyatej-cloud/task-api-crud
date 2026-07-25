# Task API CRUD with SQLite

## Project Overview

This project is a RESTful Task Management API built using **Node.js**, **Express.js**, and **SQLite**. It supports full CRUD (Create, Read, Update, Delete) operations while storing data in a SQLite database instead of an in-memory array.

The API stores data permanently in SQLite, so tasks remain available even after restarting the server.

---

## Features

- Create a new task
- Retrieve all tasks
- Retrieve a task by ID
- Update an existing task
- Delete a task
- SQLite database integration
- Persistent storage
- Automatic database and table creation
- Three sample tasks inserted on first run
- Swagger API documentation
- Error handling

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

SQLite is lightweight, serverless, easy to configure, and stores all data in a single file (`tasks.db`). It is ideal for learning SQL and building small backend applications.

---

## Project Structure

```text
task-api-crud/
│── images/
│── server.js
│── openapi.json
│── package.json
│── README.md
│── tasks.db
└── .gitignore
```

---

## Installation

Clone the repository:

```bash
git clone https://github.com/rdivyatej-cloud/task-api-crud.git
```

Move into the project folder:

```bash
cd task-api-crud
```

Install dependencies:

```bash
npm install
```

---

## Run the Project

```bash
node server.js
```

The API runs at:

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

![Database Screenshot](images/database.png)

---

## Learning Outcomes

Through this project I learned:

- Building REST APIs using Express.js
- Implementing CRUD operations
- Working with SQLite databases
- Writing SQL queries
- Using Swagger for API documentation
- Version control with Git and GitHub

---

## Author

**Divyatej**

GitHub: https://github.com/rdivyatej-cloud