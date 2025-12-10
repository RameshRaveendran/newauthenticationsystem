
// env config 
require("dotenv").config();

// requires
const express = require('express');


// Express Application Instance.
const app = express()

// Middleware to read JSON body
app.use(express.json());


// port assaignment
const PORT = 3000 || process.env.PORT;

//view engine
app.set("view engine","ejs");


//routes
app.get("/", (req, res) => {
    res.render("home", { name: "Ramesh" });
});






//server
app.listen(PORT,()=>{
    console.log(`///////////////////////////////////////////`);
    console.log(`Server Running at the http://localhost:${PORT}`);
    console.log(`///////////////////////////////////////////`);
})