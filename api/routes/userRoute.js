const express = require("express");
const {
  createNewUser,
  getUser,
  deleteUser,
} = require("../controllres/userController");
const router = express.Router();

router.post("/user", createNewUser);
router.get("/user/:id", getUser);
router.get("/user", getUser);
router.delete("/user/:id", deleteUser);

module.exports = router;
