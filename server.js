const express = require("express");
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./openapi.json");
require("dotenv").config();

const supabase = require("./supabase");
const auth = require("./middleware/auth");

const app = express();
const PORT = process.env.PORT || 3000;

// ========================
// Middleware
// ========================

app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ========================
// Root
// ========================

app.get("/", (req, res) => {
    res.json({
        name: "Authentication API",
        version: "1.0",
        endpoints: [
            "/auth/signup",
            "/auth/login",
            "/auth/logout",
            "/public/info",
            "/protected/profile",
            "/protected/dashboard",
            "/docs"
        ]
    });
});

// ========================
// Health
// ========================

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

// ========================
// Signup
// ========================

app.post("/auth/signup", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                error: "Email and password are required"
            });
        }

        const { data, error } = await supabase.auth.signUp({
            email,
            password
        });

        if (error) {
            return res.status(400).json({
                error: error.message
            });
        }

        return res.status(201).json({
            message: "User created successfully",
            user: data.user
        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

});

// ========================
// Login
// ========================

app.post("/auth/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        if (!email || !password) {

            return res.status(400).json({
                error: "Email and password are required"
            });

        }

        const { data, error } =
            await supabase.auth.signInWithPassword({
                email,
                password
            });

        if (error) {

            return res.status(401).json({
                error: "Invalid login credentials"
            });

        }

        return res.status(200).json({

            access_token: data.session.access_token,
            refresh_token: data.session.refresh_token,
            user: {
                id: data.user.id,
                email: data.user.email
            }

        });

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

});

// ========================
// Logout
// ========================

app.post("/auth/logout", auth, async (req, res) => {

    try {

        await supabase.auth.signOut();

        return res.status(204).send();

    } catch (err) {

        return res.status(500).json({
            error: err.message
        });

    }

});

// ========================
// Public Route
// ========================

app.get("/public/info", (req, res) => {

    res.status(200).json({
        message: "Welcome stranger! This info is public."
    });

});

// ========================
// Protected Profile
// ========================

app.get("/protected/profile", auth, (req, res) => {

    res.status(200).json({

        id: req.user.id,
        email: req.user.email,
        created_at: req.user.created_at

    });

});

// ========================
// Protected Dashboard
// ========================

app.get("/protected/dashboard", auth, (req, res) => {

    res.status(200).json({

        message: "Welcome to your dashboard!",
        email: req.user.email,
        id: req.user.id

    });

});

// ========================
// Test Route
// ========================

app.get("/test", (req, res) => {
    res.send("Authentication Server Running");
});

// ========================
// 404
// ========================

app.use((req, res) => {

    res.status(404).json({
        error: "Route not found"
    });

});

// ========================
// Start Server
// ========================

app.listen(PORT, () => {

    console.log(`🚀 Server running on http://localhost:${PORT}`);
    console.log(`📖 Swagger Docs: http://localhost:${PORT}/docs`);

});