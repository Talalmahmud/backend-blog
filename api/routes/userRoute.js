const express = require("express");
const {
  createNewUser,
  getUser,
  deleteUser,
  updateUser,
  getUserById,
} = require("../controllres/userController");
const router = express.Router();

router.post("/user", createNewUser);
router.get("/user/:id", getUserById);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);
router.put("/user/:id", updateUser);

module.exports = router;
