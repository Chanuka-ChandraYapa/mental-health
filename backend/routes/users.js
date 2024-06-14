const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUserInfo,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.post("/userInfo", getUserInfo);

module.exports = router;
