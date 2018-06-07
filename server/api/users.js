const router = require('express').Router()
const { User, Cart, Review } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const users = await User.findAll({
        include: [{ model: Cart }, { model: Review }]
      })
      res.json(users)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// DRY: change userId to id
router.get('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      const user = await User.findById(req.params.id, {
        include: [{ model: Cart }, { model: Review }]
      })
      if (!user) res.sendStatus(404)
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

// To be added later
// LEAVE IN COMMENT FOR NOW: Admin should only be able to change user TYPE
router.put('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id === req.params.id) {
      const user = await User.findById(req.params.id)
      const newUser = await user.update(req.body)
      res.json(newUser)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
});

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id === req.params.userId) {
      const user = await User.create(req.body)
      res.json(user)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:userId', async (req, res, next) => {
  try {
    if (req.user.isAdmin || req.user.id === req.params.userId) {
      const user = await User.findById(req.params.userId)
      await user.destroy()
      res.end()
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
