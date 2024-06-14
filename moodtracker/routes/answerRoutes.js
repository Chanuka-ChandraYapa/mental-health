const express = require("express");
const router = express.Router();
const { saveAnswers, getAnswers } = require("../controllers/answerController");
const auth = require("../middleware/auth");

router.post("/answers", auth, saveAnswers);
router.get("/answers", auth, getAnswers);

module.exports = router;
