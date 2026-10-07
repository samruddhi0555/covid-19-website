const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const re = require("../utils/validators");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { name, email, phone, password } = req.body;
  if (!re.name.test(name) || !re.email.test(email) ||
      !re.phone.test(phone) || !re.password.test(password))
    return res.status(400).json({ error: "Invalid input" });
  try {
    const passwordHash = await bcrypt.hash(password, 10);
    await User.create({ name, email, phone, passwordHash });
    res.json({ ok: true });
  } catch (e) {
    res.status(400).json({ error: "Email already registered" });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await bcrypt.compare(password, user.passwordHash)))
    return res.status(401).json({ error: "Wrong email or password" });
  req.session.userId = user._id;
  res.json({ ok: true, name: user.name });
});

router.post("/logout", (req, res) => {
  req.session.destroy(() => res.json({ ok: true }));
});

module.exports = router;