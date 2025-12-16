

const User = require("../models/userModel");
const bcrypt = require("bcrypt");

///////////////////////////// REGISTER /////////////////////////////

const handleRegister = async (req, res) => {
  try {
    const { signupUsername, signupEmail, signupPassword } = req.body;

    // 1️⃣ Validate
    if (!signupUsername || !signupEmail || !signupPassword) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    // 2️⃣ Check email
    const existingUser = await User.findOne({ email: signupEmail });
    if (existingUser) {
      return res.json({
        success: false,
        message: "Email already registered"
      });
    }

    // 3️⃣ Hash password
    const hashedPassword = await bcrypt.hash(signupPassword, 10);

    // 4️⃣ Save user
    const newUser = new User({
      name: signupUsername,
      email: signupEmail,
      password: hashedPassword,
      role: "user"
    });

    await newUser.save();

    // 5️⃣ Success response
    return res.json({
      success: true,
      message: "Registration successful"
    });
    
    
  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.json({
      success: false,
      message: "Registration failed. Try again."
    });
  }
};

///////////////////////////// LOGIN /////////////////////////////

const handleLogin = async (req, res) => {
  try {
    const { loginUsername, loginPassword } = req.body;

    if (!loginUsername || !loginPassword) {
      return res.json({
        success: false,
        message: "Username and password are required"
      });
    }

    const user = await User.findOne({ name: loginUsername });

    if (!user) {
      return res.json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(loginPassword, user.password);

    if (!isMatch) {
      return res.json({
        success: false,
        message: "Incorrect password"
      });
    }

    // ✅ Session
    req.session.user = {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    return res.json({
      success: true,
      message: "Login successful"
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    return res.json({
      success: false,
      message: "Something went wrong"
    });
  }
};

module.exports = { handleRegister, handleLogin };
