
// env config 
require("dotenv").config();

// requires
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const session = require("express-session")


//normal imports
const noCache = require("./src/middlewares/noCache");
const connectDB = require('./src/config/db');
const authRoutes = require('./src/routes/authRoutes');
const requireAuth = require("./src/middlewares/authMiddleware");



// Express Application Instance.
const app = express()

// Middleware to read JSON body
app.use(express.json());






// port assaignment
const PORT = 3000 || process.env.PORT;

//Middleware Body parsers
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// session Middleware handling 
app.use(
    session({
        secret:process.env.SESSION_SECRET,
        resave:false,
        saveUninitialized:false,
        cookie:{maxAge:1000 * 60 * 60 }
    })
);

// for the public files STATIC FILES
app.use(express.static(path.join(__dirname, 'public')));

//view engine
app.set("view engine","ejs");
//views path set
app.set('views', path.join(__dirname, 'views'));


// linking authroutes
app.use('/auth', authRoutes)


//
app.get(
  "/user/dashboard",
  requireAuth,
  noCache,
  (req, res) => {
    res.render("user/dashboard");
  }
);

//conncet DB
connectDB();


app.get("/",noCache,(req, res) => {
  res.render("auth/login", { mode: "signin" });
});

app.get("/login", noCache,(req, res) => {
  res.render("auth/login", {
    mode: "signin",
    error: req.query.error
  });
});


app.get("/register",noCache, (req, res) => {
  res.render("auth/login", { mode: "signup" });
});

app.get("/logout", noCache,(req, res) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid");
        res.redirect("/login");
    });
});
// app.get('/dashboard',(req , res) => {
//     res.render('admin/dashboard')
// })




//server
app.listen(PORT,()=>{
    console.log(`///////////////////////////////////////////`);
    console.log(`Server Running at the http://localhost:${PORT}`);
    console.log(`///////////////////////////////////////////`);
})