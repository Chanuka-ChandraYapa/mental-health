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
        res.json({ token });
      }
    );
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

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
        res.json({ token, user: { id: user.id, name: user.name } });
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
