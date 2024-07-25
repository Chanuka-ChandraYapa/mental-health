const mongoose = require("mongoose");

const JournalEntrySchema = new mongoose.Schema({
  entry: String,
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Journal", JournalEntrySchema);
