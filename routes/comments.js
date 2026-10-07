const express = require("express");
const Comment = require("../models/Comment");
const re = require("../utils/validators");
const router = express.Router();

router.get("/", async (req, res) => {
  const list = await Comment.find().populate("userId", "name").sort("-createdAt");
  res.json(list);
});

router.post("/", async (req, res) => {
  if (!req.session.userId) return res.status(401).json({ error: "Login first" });
  if (!re.comment.test(req.body.text)) return res.status(400).json({ error: "Invalid comment" });
  await Comment.create({ userId: req.session.userId, text: req.body.text });
  res.json({ ok: true });
});

module.exports = router;