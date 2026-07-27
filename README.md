# Auth API using Express & Supabase

## Overview

This project is a secure authentication API built using Express.js and Supabase Auth.

## Features

- User Signup
- User Login
- User Logout
- JWT Authentication
- Protected Routes
- Public Routes
- Swagger Documentation

## Technologies

- Node.js
- Express.js
- Supabase
- Swagger UI
- dotenv

## Installation

```bash
npm install
```

## Environment Variables

Create a `.env` file.

```env
SUPABASE_URL=your-project-url
SUPABASE_KEY=your-anon-key
PORT=3000
```

Run

```bash
node server.js
```

Swagger

```
http://localhost:3000/docs
```

## API Endpoints

| Method | Endpoint | Auth |
|---------|----------|------|
| POST | /auth/signup | ❌ |
| POST | /auth/login | ❌ |
| POST | /auth/logout | ✅ |
| GET | /public/info | ❌ |
| GET | /protected/profile | ✅ |
| GET | /protected/dashboard | ✅ |
