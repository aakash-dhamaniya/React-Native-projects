const express = require("express");
const router = express.Router();
const AuthController = require("../controller/AuthController");
console.log("Auth ke andar gae");
router
  .post("/register", AuthController.creteUser)
  .post("/login", AuthController.loginUser);
exports.router = router;
