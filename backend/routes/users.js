const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUser,
  getUserInfo,
  updateUserInfo,
} = require("../controllers/users");
const auth = require("../middleware/auth");

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", auth, getUser);
router.post("/userInfo", getUserInfo);
router.put("/update", updateUserInfo);

module.exports = router;
