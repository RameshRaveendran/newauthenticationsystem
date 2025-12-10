const express = require('express');
const router = express.Router();

const { handleRegister,handleLogin } = require('../controllers/authController');


router.post("/register",handleRegister);
router.post("/login",handleLogin);

// router.get('/register', (req, res) => {
//      res.render('auth/login', { mode: "signup" });
//  });


module.exports = router;



