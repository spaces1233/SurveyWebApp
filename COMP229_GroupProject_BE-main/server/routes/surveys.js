const express = require('express');
const router = express.Router();
const {
  createSurvey,
  getSurveys,
  getSurvey,
  updateSurvey,
  deleteSurvey
} = require('../controllers/surveyController');
const auth = require('../middlewares/auth');

router.post('/', auth, createSurvey);
router.get('/', getSurveys);
router.get('/:id', getSurvey);
router.put('/:id', auth, updateSurvey);
router.delete('/:id', auth, deleteSurvey);

module.exports = router;
