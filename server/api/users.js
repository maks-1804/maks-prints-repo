const router = require('express').Router()
const { User, Cart, Review } = require('../db/models')
const { isAdmin, isAdminOrUser } = require('./access')
module.exports = router

router.get('/', isAdmin, async (req, res, next) => {
  try {
    const users = await User.findAll({
      include: [{ model: Cart }, { model: Review }]
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', isAdminOrUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id, {
      include: [{ model: Cart }, { model: Review }]
    })
    if (!user) res.sendStatus(404)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

// To be added later
// LEAVE IN COMMENT FOR NOW: Admin should only be able to change user TYPE
router.put('/:id', isAdminOrUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) res.sendStatus(404)
    const newUser = await user.update(req.body)
    res.json(newUser)
  } catch (err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.json(user)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdminOrUser, async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    await user.destroy()
    res.end()
  } catch (err) {
    next(err)
  }
})
