const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/User");

const router = Router();

router.post("/", async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).exec();

  if (!user) return res.status(400).send("Invalid email or password");

  const validatePassword = await bcrypt.compare(
    req.body.password,
    user.password
  );

  if (!validatePassword)
    return res.status(400).send("Invalid email or password");

  const token = user.generateAuthToken();
  res.send(token);
});

module.exports = router;
