const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");

// Register
router.post("/register", async (req, res) => {

  const { name, email, password } = req.body;

  const hash = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    password: hash
  });

  res.json(user);
});

// Login
router.post("/login", async (req, res) => {

  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (!user) return res.status(400).json("User not found");

  const ok = await bcrypt.compare(password, user.password);

  if (!ok) return res.status(400).json("Wrong password");

  res.json(user);
});

module.exports = router;
