const express = require("express");
const { createNewUser } = require("../controllres/userController");
const router = express.Router();

router.post("/create", createNewUser);

module.exports = router;
