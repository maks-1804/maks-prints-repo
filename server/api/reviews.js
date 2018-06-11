const router = require('express').Router()
const { Review, Product, User } = require('../db/models')
const { isAdmin, isUser, isAdminOrUser } = require('./access')

module.exports = router

// GET - ADMIN ONLY --- all reviews
router.get('/', async (req, res, next) => {
  try {
    const reviews = await Review.findAll({
      include: [{ model: Product }, { model: User }]
    })
    res.json(reviews)
  } catch (err) {
    next(err)
  }
})

router.get('/:productId', async (req, res, next) => {
  const productId = +req.params.productId
  try {
    const reviewsForProduct = await Review.findAll({
      where: {
        productId: productId
      }
    })
    res.json(reviewsForProduct)
  } catch (err) {
    next(err)
  }
})

// GET: USER SPECIFIC & ADMIN --- all associated reviews with user
router.get('/user/:userId', isAdminOrUser, async (req, res, next) => {
  const userId = +req.params.userId
  try {
    if (req.user.type === 'admin' || req.user.id === userId) {
      const userReviews = await Review.findAll({
        where: {
          userId: userId
        }
      })
      res.json(userReviews)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// User adds a review to a specific product
router.post('/:id/', isUser, async (req, res, next) => {
  try {
    const product = Product.findById(req.params.id)
    if (!product) res.sendStatus(404)
    const newReview = req.body
    newReview.productId = Number(req.params.id)
    newReview.userId = req.user.id
    const review = await Review.create(newReview)
    res.status(201).json(review)
  } catch (err) {
    next(err)
  }
})

// User edits a review to a specific product
router.put('/:reviewId', isUser, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (!review) res.sendStatus(404)
    if (req.user.id === review.userId) {
      const updatedReview = await review.update(req.body)
      res.json(updatedReview)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// User deletes a review to a specific product
router.delete('/:productId/:reviewId', isUser, async (req, res, next) => {
  try {
    const review = await Review.findById(req.params.reviewId)
    if (!review) res.sendStatus(404)
    await review.destroy()
    res.end()
  } catch (err) {
    next(err)
  }
})
