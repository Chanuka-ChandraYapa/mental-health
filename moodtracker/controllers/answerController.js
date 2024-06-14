const Answer = require("../models/Answers");

exports.saveAnswers = async (req, res) => {
  const { answers } = req.body;
  const userId = req.user.id; // Assumes `auth` middleware attaches user to req

  try {
    const newAnswers = new Answer({
      userId,
      answers,
    });

    const savedAnswers = await newAnswers.save();
    res.status(201).json(savedAnswers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAnswers = async (req, res) => {
  try {
    const answers = await Answer.find({ userId: req.user.id });
    res.status(200).json(answers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
