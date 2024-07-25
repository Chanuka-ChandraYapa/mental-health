const express = require("express");
const router = express.Router();
const {
  saveJournal,
  getJournal,
  deleteJournal,
} = require("../controllers/journalController");
const auth = require("../middleware/auth");

router.post("/", auth, saveJournal);
router.get("/", auth, getJournal);
router.delete("/:id", auth, deleteJournal);

module.exports = router;
