const router = require('express').Router()
const { User, Cart, Review } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (req.user.type === 'admin') {
      const users = await User.findAll({
        include: [{ model: Cart }, { model: Review }]
      });
      res.json(users)
    } else {
      // When an un-authenticated visitor makes a GET request for all users
      // 403 is a Forbidden page
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.get('/:userId', async (req, res, next) => {
  try {
    if (req.user.type === 'admin' || req.user.id === req.params.userId) {
      const user = await User.findById(req.params.userId, {
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
router.put('/:userId', async (req, res, next) => {
  try {
    if (req.user.type === 'admin' || req.user.id === req.params.userId) {
      const user = await User.findById(req.params.userId)
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
    if (req.user.type === 'admin' || req.user.id === req.params.userId) {
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
    if (req.user.type === 'admin' || req.user.id === req.params.userId) {
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
