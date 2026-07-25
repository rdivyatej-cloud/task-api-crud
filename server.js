const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
require("dotenv").config();

const { Pool } = require("pg");

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// =======================
// PostgreSQL Connection
// =======================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
});

// =======================
// Initialize Database
// =======================

async function initializeDatabase() {
    try {
        await pool.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY,
                title TEXT NOT NULL,
                done BOOLEAN NOT NULL DEFAULT FALSE
            );
        `);

        const result = await pool.query(
            "SELECT COUNT(*) AS count FROM tasks"
        );

        if (parseInt(result.rows[0].count) === 0) {
            await pool.query(`
                INSERT INTO tasks (title, done)
                VALUES
                ('Learn Express', false),
                ('Build CRUD API', false),
                ('Push to GitHub', true);
            `);

            console.log("✅ Sample tasks inserted.");
        }

        console.log("✅ PostgreSQL connected.");
    } catch (err) {
        console.error("Database initialization failed:", err);
        process.exit(1);
    }
}

// =======================
// Root Endpoint
// =======================

app.get("/", (req, res) => {
    res.json({
        name: "Task API",
        version: "3.0",
        endpoints: [
            "/health",
            "/tasks",
            "/docs"
        ]
    });
});

// =======================
// Health Endpoint
// =======================

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// =======================
// GET All Tasks
// =======================

app.get("/tasks", async (req, res) => {
    try {
        const result = await pool.query(
            "SELECT * FROM tasks ORDER BY id"
        );

        res.json(result.rows);
    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// GET Task By ID
// =======================

app.get("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// CREATE Task
// =======================

app.post("/tasks", async (req, res) => {
    try {
        const { title, done = false } = req.body;

        if (!title || title.trim() === "") {
            return res.status(400).json({
                error: "Title is required"
            });
        }

        const result = await pool.query(
            `INSERT INTO tasks (title, done)
             VALUES ($1, $2)
             RETURNING *`,
            [title.trim(), done]
        );

        res.status(201).json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// UPDATE Task
// =======================

app.put("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const existing = await pool.query(
            "SELECT * FROM tasks WHERE id = $1",
            [id]
        );

        if (existing.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        const currentTask = existing.rows[0];

        const title =
            req.body.title !== undefined
                ? req.body.title.trim()
                : currentTask.title;

        if (title === "") {
            return res.status(400).json({
                error: "Title cannot be empty"
            });
        }

        const done =
            req.body.done !== undefined
                ? req.body.done
                : currentTask.done;

        const result = await pool.query(
            `UPDATE tasks
             SET title = $1,
                 done = $2
             WHERE id = $3
             RETURNING *`,
            [title, done, id]
        );

        res.json(result.rows[0]);

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// DELETE Task
// =======================

app.delete("/tasks/:id", async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const result = await pool.query(
            "DELETE FROM tasks WHERE id = $1 RETURNING *",
            [id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({
                error: "Task not found"
            });
        }

        res.status(204).send();

    } catch (err) {
        res.status(500).json({
            error: err.message
        });
    }
});

// =======================
// Test Route
// =======================

app.get("/test", (req, res) => {
    res.send("NEW SERVER IS RUNNING");
});

// =======================
// Start Server
// =======================

initializeDatabase().then(() => {
    app.listen(PORT, () => {
        console.log(`🚀 Server running on http://localhost:${PORT}`);
        console.log(`📖 Swagger Docs: http://localhost:${PORT}/docs`);
    });
});