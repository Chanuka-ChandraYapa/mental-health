// In your server file (e.g., notificationsController.js)
const express = require("express");
const Notification = require("../models/Notification");
const auth = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, async (req, res) => {
  try {
    const userId = req.user.id; // assuming user ID is set in the req object
    const notifications = await Notification.find({ userId }).sort({
      date: -1,
    });
    res.status(200).json(notifications);
  } catch (error) {
    console.error("Error fetching notifications:", error);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  const { id } = req.params;
  console.log(id);

  try {
    const deletedEntry = await Notification.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
