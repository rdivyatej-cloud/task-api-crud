const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// =======================
// SQLite Database Setup
// =======================

const db = new Database("tasks.db");

db.prepare(`
CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    done INTEGER NOT NULL
)
`).run();

// Insert sample tasks only if table is empty
const count = db.prepare("SELECT COUNT(*) AS total FROM tasks").get();

if (count.total === 0) {
    const insert = db.prepare(
        "INSERT INTO tasks (title, done) VALUES (?, ?)"
    );

    insert.run("Learn Express", 0);
    insert.run("Build CRUD API", 0);
    insert.run("Push to GitHub", 1);
}

// Root endpoint
app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "2.0",
        endpoints: [
            "/health",
            "/tasks",
            "/docs"
        ]
    });
});

// Health endpoint
app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// =======================
// GET All Tasks
// =======================

app.get("/tasks", (req, res) => {

    const tasks = db.prepare("SELECT * FROM tasks").all();

    const formattedTasks = tasks.map(task => ({
        id: task.id,
        title: task.title,
        done: Boolean(task.done)
    }));

    res.json(formattedTasks);

});

// =======================
// GET Task By ID
// =======================

app.get("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    res.json({
        id: task.id,
        title: task.title,
        done: Boolean(task.done)
    });

});

// =======================
// CREATE Task
// =======================

app.post("/tasks", (req, res) => {

    const { title } = req.body;

if (!title || title.trim() === "") {
    return res.status(400).json({
        error: "Title is required"
    });
}

const done = req.body.done === true ? 1 : 0;
    
const result = db.prepare(
    "INSERT INTO tasks(title, done) VALUES (?, ?)"
).run(title.trim(), done);

const newTask = db.prepare(
    "SELECT * FROM tasks WHERE id = ?"
).get(result.lastInsertRowid);

res.status(201).json({
    id: newTask.id,
    title: newTask.title,
    done: Boolean(newTask.done)
});

});

// =======================
// UPDATE Task
// =======================

app.put("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    const title =
        req.body.title !== undefined
            ? req.body.title.trim()
            : task.title;

    if (title === "") {
        return res.status(400).json({
            error: "Title cannot be empty"
        });
    }

    const done =
        req.body.done !== undefined
            ? req.body.done
            : Boolean(task.done);

    db.prepare(
        "UPDATE tasks SET title = ?, done = ? WHERE id = ?"
    ).run(title, done ? 1 : 0, id);

    const updatedTask = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    res.json({
        id: updatedTask.id,
        title: updatedTask.title,
        done: Boolean(updatedTask.done)
    });

});

// =======================
// DELETE Task
// =======================

app.delete("/tasks/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const task = db
        .prepare("SELECT * FROM tasks WHERE id = ?")
        .get(id);

    if (!task) {
        return res.status(404).json({
            error: "Task not found"
        });
    }

    db.prepare(
        "DELETE FROM tasks WHERE id = ?"
    ).run(id);

    res.status(204).send();

});

// Test Route
app.get("/test", (req, res) => {
    res.send("NEW SERVER IS RUNNING");
});

// Start Server
app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log("📦 SQLite database connected.");
});