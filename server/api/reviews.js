const router = require('express').Router()
const { Review } = require('../db/models')
module.exports = router

//admin is should be able to see all reviews on the site at once
router.get('/', (req, res, next) => {
  try {
    const reviews = Review.findAll()
    res.json(reviews)
  } catch (error) {
    next(error)
  }
})

//admin should look at a single review
router.get('/:id', (req, res, next) => {
  try {
    const review = Review.findById(req.params.id)
    if (!review) res.sendStatus(404)
    res.json(review)
  } catch (error) {
    next(error)
  }
})
