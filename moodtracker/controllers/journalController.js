const Journal = require("../models/Journal");

exports.saveJournal = async (req, res) => {
  const userId = req.user.id;
  try {
    const newEntry = new Journal({ userId, entry: req.body.entry });
    await newEntry.save();
    res.status(201).send(newEntry);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getJournal = async (req, res) => {
  try {
    const entries = await Journal.find({ userId: req.user.id }).sort({
      date: -1,
    });
    res.status(200).send(entries);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.deleteJournal = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedEntry = await Journal.findByIdAndDelete(id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Entry not found" });
    }
    res.status(200).json({ message: "Entry deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};
