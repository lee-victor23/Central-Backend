const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs"); // Optional: Only if you're using hashed passwords
const router = express.Router();
const userList = require("../userList");

// Assuming your .env or similar setup includes a secret for JWT
const JWT_SECRET = process.env.JWT_SECRET; // Make sure to use a strong, secure secret in production

// Login
router.post("/api/auth/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    // Find user in the userList
    const user = userList.find((user) => user.username === email);
    
    // If user not found or password doesn't match (use bcrypt.compare for hashed passwords)
    if (!user || !(user.password === password /* or await bcrypt.compare(password, user.password) for hashed passwords */)) {
      return res.status(401).send("Username or password is incorrect");
    }

    // User authenticated, generate a JWT
    const token = jwt.sign(
      { userId: user.id, username: user.username }, // You can include any user-specific data here
      JWT_SECRET,
      { expiresIn: "24h" } // Token expires in 24 hours
    );

    // Send the JWT to the client
    res.json({ message: "Login successful", token: token });
  } catch (error) {
    console.error(error);
    res.status(400).send(error);
  }
});

// Register (Placeholder response as per your setup)
router.post("/api/auth/register", async (req, res) => {
  res.status(400).send("Register Service is not available at the moment");
});

module.exports = router;
