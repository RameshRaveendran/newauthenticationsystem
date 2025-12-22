const express = require("express");
const router = express.Router();

const requireAdmin = require("../middlewares/adminMiddleware");
const {
  getAllUsers,
  updateUser,
  deleteUser
} = require("../controllers/adminController");

router.get("/users", requireAdmin, getAllUsers);
router.put("/users/:id", requireAdmin, updateUser);
router.delete("/users/:id", requireAdmin, deleteUser);

module.exports = router;
