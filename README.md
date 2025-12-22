🛡️ User & Admin Authentication System

A full-stack User & Admin Authentication System built using Node.js, Express, MongoDB, EJS, and Session-based authentication.
This project includes role-based access control, secure login/logout, admin user management, and proper cache handling to prevent unauthorized back-navigation after logout.

🚀 Features
👤 User Features

User registration with validation

Secure login with hashed passwords

User dashboard

Session-based authentication

Logout with session destruction

👑 Admin Features

Admin login

Admin dashboard

View all registered users

Update user:

Email

Password

Role (user / admin)

Delete users (with confirmation)

Cannot delete own admin account

SweetAlert confirmations for actions

🔐 Security Features

Password hashing using bcrypt

Role-based access control (Admin / User)

Session-based authentication

Protected routes using middleware

No-cache headers to prevent back-button access after logout

API routes return JSON (no redirects)

Dashboard routes blocked without session

🧱 Tech Stack

Frontend

EJS (templating)

SweetAlert2

CSS

Backend

Node.js

Express.js

MongoDB

Mongoose

express-session

bcrypt

dotenv