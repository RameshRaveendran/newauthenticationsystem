const User = require("../models/userModel");
const bcrypt = require("bcrypt");

const handleRegister = async (req, res) => {
    try {
        const { signupUsername, signupEmail, signupPassword } = req.body;

        console.log("REGISTER BODY:", req.body);

        // 1. Validate fields
        if (!signupUsername || !signupEmail || !signupPassword) {
            return res.send("❌ All fields are required");
        }

        // 2. Check if email already exists
        const existingUser = await User.findOne({ email: signupEmail });
        if (existingUser) {
            return res.send("❌ Email already registered");
        }

        // 3. Hash password
        const hashedPassword = await bcrypt.hash(signupPassword, 10);

        // 4. Create new user in DB (mapping form → schema)
        const newUser = new User({
            name: signupUsername,      // schema expects "name"
            email: signupEmail,        // schema expects "email"
            password: hashedPassword,  // schema expects "password"
            role: "user"               // default, optional
        });

        await newUser.save();

        console.log("User Saved:", newUser);

        // 5. Redirect to login page
        return res.redirect("/login");

    } catch (error) {
        console.error(error);
        return res.send("❌ Registration failed. Try again.");
    }
};

const handleLogin = async (req, res) => {
  try {
      const { loginUsername, loginPassword } = req.body;

      console.log("LOGIN BODY:", req.body);

      // 1. Backend validation
      if (!loginUsername || !loginPassword) {
          return res.send("❌ All fields are required");
      }

      // 2. Check if user exists
      const user = await User.findOne({ name: loginUsername });

      if (!user) {
          return res.send("❌ User not found");
      }

      // 3. Compare passwords
      const isMatch = await bcrypt.compare(loginPassword, user.password);

      if (!isMatch) {
          return res.send("❌ Incorrect password");
      }

      // 4. If success → redirect to dashboard
      return res.redirect("/dashboard");

  } catch (error) {
      console.error(error);
      res.send("❌ Login failed.");
  }
};


module.exports = { handleRegister ,handleLogin };
