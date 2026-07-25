<img width="1917" height="1057" alt="Swagger png" src="https://github.com/user-attachments/assets/40447b88-a27b-4a0d-aa14-896920b6790a" />
# Task API CRUD

A simple RESTful CRUD API built using Node.js and Express.

## Features

- Get all tasks
- Get a task by ID
- Create a task
- Update a task
- Delete a task
- Swagger API documentation

## Installation

Clone the repository:

```bash
git clone <(https://github.com/rdivyatej-cloud/task-api-crud)>
```

Install dependencies:

```bash
npm install
```

Run the server:

```bash
node server.js
```

Server runs at:

```
http://localhost:3000
```

Swagger Documentation:

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| GET | /tasks | Get all tasks |
| GET | /tasks/{id} | Get one task |
| POST | /tasks | Create task |
| PUT | /tasks/{id} | Update task |
| DELETE | /tasks/{id} | Delete task |

## Technologies Used

- Node.js
- Express.js
- Swagger UI
