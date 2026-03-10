const express = require("express");
const jwt = require("jsonwebtoken");

const router = express.Router();
const SECRET_KEY = "mysecretkey";

const ADMIN_USER = {
  username: "admin",
  password: "admin123",
};

router.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === ADMIN_USER.username && password === ADMIN_USER.password) {
    const token = jwt.sign({ username, role: "admin" }, SECRET_KEY, {
      expiresIn: "1h",
    });

    return res.json({
      message: "Login Successful",
      token: token,
    });
  }

  return res.status(401).json({ message: "Invalid Username or Password" });
});

module.exports = router;

