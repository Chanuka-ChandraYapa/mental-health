const express = require("express");
const router = express.Router();
const { saveAnswers, getAnswers } = require("../controllers/answerController");
const { getRecommendations } = require("../controllers/recommController");
const auth = require("../middleware/auth");

router.post("/answers", auth, saveAnswers);
router.get("/answers", auth, getAnswers);
router.get("/recommendations", auth, getRecommendations);

module.exports = router;
