# Task API CRUD (PostgreSQL + Docker)

A RESTful Task Management API built with Node.js, Express.js, PostgreSQL, and Docker. The API supports full CRUD operations, uses PostgreSQL for persistent storage, and includes interactive API documentation with Swagger UI.

---

## Features

- RESTful CRUD API
- PostgreSQL database
- Dockerized PostgreSQL
- Docker Compose support
- Swagger API Documentation
- Environment variable configuration using `.env`
- Automatic database initialization
- Sample task seeding
- Persistent data storage

---

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Docker
- Docker Compose
- pg
- dotenv
- Swagger UI

---

## Project Structure

```
task-api-crud/
│── .env
│── .env.example
│── .gitignore
│── docker-compose.yml
│── openapi.json
│── package.json
│── package-lock.json
│── README.md
│── server.js
│── images/
```

---

## Installation

### 1. Clone the repository

```bash
git clone https://github.com/rdivyatej-cloud/task-api-crud.git
cd task-api-crud
```

### 2. Install dependencies

```bash
npm install
```

### 3. Create a `.env` file

Create a `.env` file in the project root.

Example:

```env
DATABASE_URL=postgres://postgres:dev@localhost:5432/tasks
```

### 4. Start PostgreSQL

```bash
docker compose up -d
```

### 5. Run the application

```bash
node server.js
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/` | API Information |
| GET | `/health` | Health Check |
| GET | `/tasks` | Get all tasks |
| GET | `/tasks/:id` | Get task by ID |
| POST | `/tasks` | Create a new task |
| PUT | `/tasks/:id` | Update a task |
| DELETE | `/tasks/:id` | Delete a task |

---

## Example Request

### Create Task

**POST** `/tasks`

```json
{
  "title": "Complete Assignment",
  "done": false
}
```

### Example Response

```json
{
  "id": 4,
  "title": "Complete Assignment",
  "done": false
}
```

---

## Swagger Documentation

After starting the server, open:

```
http://localhost:3000/docs
```

---

## Docker Commands

Start PostgreSQL:

```bash
docker compose up -d
```

Stop PostgreSQL:

```bash
docker compose down
```

View running containers:

```bash
docker ps
```

---

## Environment Variables

Create a `.env` file using the template in `.env.example`.

Example:

```env
DATABASE_URL=postgres://postgres:dev@localhost:5432/tasks
```

---

## Testing

Run the application:

```bash
node server.js
```

Test the following endpoints:

- http://localhost:3000/
- http://localhost:3000/health
- http://localhost:3000/tasks
- http://localhost:3000/docs

---

## Author

**Divyatej**

---

## License

This project was created for educational purposes as part of the Flyrank Backend API assignment.