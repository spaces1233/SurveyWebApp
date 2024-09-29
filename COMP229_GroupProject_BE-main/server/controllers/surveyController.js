const Survey = require('../models/survey');

exports.createSurvey = async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    const newSurvey = new Survey({
      title,
      description,
      questions,
      createdBy: req.user.id
    });
    const survey = await newSurvey.save();
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSurveys = async (req, res) => {
  try {
    const surveys = await Survey.find();
    res.json(surveys);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getSurvey = async (req, res) => {
  try {
    const survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: 'Survey not found' });
    }
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateSurvey = async (req, res) => {
  const { title, description, questions } = req.body;
  try {
    let survey = await Survey.findById(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: 'Survey not found' });
    }
    survey.title = title || survey.title;
    survey.description = description || survey.description;
    survey.questions = questions || survey.questions;
    await survey.save();
    res.json(survey);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.deleteSurvey = async (req, res) => {
  try {
    const survey = await Survey.findByIdAndDelete(req.params.id);
    if (!survey) {
      return res.status(404).json({ msg: 'Survey not found' });
    }
    res.json({ msg: 'Survey removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
};

