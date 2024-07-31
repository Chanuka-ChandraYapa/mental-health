// models/User.js
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    personality: { type: String }, // Optional field for user location
    bio: { type: String }, // Optional field for a brief bio
    interests: { type: [String] }, // Optional field for a list of interests
    role: { type: String }, // Optional field for user role
  },
  { timestamps: true }
); // Adding timestamps for createdAt and updatedAt

// Hash password before saving
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

module.exports = mongoose.model("User", UserSchema);
