const router = require('express').Router();
const { Category } = require('../db/models');
module.exports = router;

router.get('/', (req, res, next) => {
  try {
    const categories = Category.findAll();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});
