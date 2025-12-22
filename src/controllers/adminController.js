const User = require("../models/userModel");
const bcrypt = require("bcrypt");

//////////////// GET ALL USERS //////////////////
const getAllUsers = async (req, res) => {
    console.log(req.body);
  try {
    const users = await User.find({}, "-password");
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

//////////////// UPDATE USER //////////////////
const updateUser = async (req, res) => {
    console.log(req.body);
  try {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    const updateData = {};

    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role && ["user", "admin"].includes(role)) {
      updateData.role = role;
    }

    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }

    await User.findByIdAndUpdate(id, updateData);

    res.json({ success: true, message: "User updated successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
};

//////////////// DELETE USER //////////////////
const deleteUser = async (req, res) => {
    console.log(req.body);
  try {
    const { id } = req.params;

    // Prevent admin deleting himself
    if (req.session.user.id === id) {
      return res.json({
        success: false,
        message: "You cannot delete your own account"
      });
    }

    await User.findByIdAndDelete(id);
    res.json({ success: true, message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
};

module.exports = { getAllUsers, updateUser, deleteUser };
