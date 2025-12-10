
// env config 
require("dotenv").config();

// requires
const express = require('express');


// Express Application Instance.
const app = express()



// port assaignment
const PORT = 3000 || process.env.PORT;


//routes
app.use('/',(req , res) => {
    res.send('server is live')
})



//server
app.listen(PORT,()=>{
    console.log(`///////////////////////////////////////////`);
    console.log(`Server Running at the http://localhost:${PORT}`);
    console.log(`///////////////////////////////////////////`);
})