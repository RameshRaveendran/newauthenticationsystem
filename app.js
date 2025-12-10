
// env config 
require("dotenv").config();

// requires
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
//normal imports
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');


// Express Application Instance.
const app = express()

// Middleware to read JSON body
app.use(express.json());


// port assaignment
const PORT = 3000 || process.env.PORT;

//Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//view engine
app.set("view engine","ejs");
//views path set
app.set('views', path.join(__dirname, 'views'));
// for the public files STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//conncet DB
connectDB();

// linking authroutes
app.use('/auth', authRoutes)






//routes
// app.get("/", (req, res) => {
//     res.render("home");
// });
// app.get("/login", (req, res) => {
//     res.render("auth/login");
// });
// app.get("/dashboard", (req, res) => {
//     res.render("admin/dashboard");
// });

// app.get('/login', (req, res) => {
//     res.render('auth/login', { mode: "signin" });
// });

// app.get('/register', (req, res) => {
//     res.render('auth/login', { mode: "signup" });
// });

app.get('/register', (req, res) => {
    res.render('auth/login', { mode: "signup" });
});

app.get('/login', (req, res) => {
    res.render('auth/login', { mode: "signin" });
});

app.get('/dashboard',(req , res) => {
    res.render('admin/dashboard')
})




//server
app.listen(PORT,()=>{
    console.log(`///////////////////////////////////////////`);
    console.log(`Server Running at the http://localhost:${PORT}`);
    console.log(`///////////////////////////////////////////`);
})