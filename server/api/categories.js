const router = require('express').Router()
const { Category } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  try {
    const categories = Category.findAll()
    res.json(categories)
  } catch (error) {
    next(error)
  }
})

router.get('/:id', (req, res, next) => {
  try {
    const category = Category.findById(req.params.id)
    if (!category) res.sendStatus(404)
    res.json(category)
  } catch (error) {
    next(error)
  }
})
