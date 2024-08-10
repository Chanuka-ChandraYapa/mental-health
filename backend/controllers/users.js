const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
// const { ObjectId } = mongoose.Types;

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    console.log("test");
    let user = await User.findOne({ email });
    console.log(user);
    if (user) return res.status(400).json({ msg: "User already exists" });

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: { id: user.id, name: user.name, email: user.email },
        });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password, sessionId } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const payload = { user: { id: user.id } };
    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
      (err, token) => {
        if (err) throw err;
        res.json({
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            bio: user.bio,
            interests: user.interests,
            personality: user.personality,
            role: user.role,
          },
        });
      }
    );
    const response = await fetch(
      // "https://mental-health-chatbot-dlhq.onrender.com/chatbot",
      "https://mental-health-chatbot-production.up.railway.app/chatbot",
      // "http://127.0.0.1:5000/chatbot",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message:
            "Use these details to interact with the user more personally. Just save following data for future reference. if they ask you respond with this details" +
            "Name : " +
            user.name +
            "user bio : " +
            user.bio +
            "user personality type : " +
            user.personality +
            "user interests : " +
            user.interests,
          sessionId,
        }),
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUserInfo = async (req, res) => {
  const { userId } = req.body;
  try {
    console.log("I have been summoned", userId);

    // const user = await User.find({ _id: ObjectId(userId) }).select("-password");
    // var userobj = ObjectId(userId);
    try {
      var _id = new mongoose.Types.ObjectId(userId);
    } catch (err) {
      console.log(err);
    }
    console.log("I have been summoned", _id);
    // const user = await User.find_one(
    //   { _id: ObjectId(userId) },
    //   { password: 0 }
    // );
    const user = await User.findById(_id).select("-password");
    console.log("I have been summoned", user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// New function to update user information
exports.updateUserInfo = async (req, res) => {
  const { userId, name, personality, bio, interests } = req.body;
  console.log(userId, name, personality, bio, interests);

  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { name, personality, bio, interests },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updatedUser) return res.status(404).json({ msg: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
};

// Middleware to verify token
exports.verifyToken = (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return res.status(401).json({ msg: "No token, authorization denied" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.user;
    next();
  } catch (err) {
    res.status(401).json({ msg: "Token is not valid" });
  }
};

// Endpoint to check if token is valid
exports.checkToken = (req, res) => {
  res.json({ valid: true });
};
