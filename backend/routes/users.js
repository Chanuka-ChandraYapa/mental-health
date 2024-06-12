const express = require("express");
const router = express.Router();
const { registerUser, loginUser, getUser } = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);

module.exports = router;
