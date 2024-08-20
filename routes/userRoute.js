const express = require("express");
const { createNewUser, getUser } = require("../controllres/userController");
const router = express.Router();

router.post("/user", createNewUser);
router.get("/user/:id", getUser);
router.get("/user", getUser);

module.exports = router;
