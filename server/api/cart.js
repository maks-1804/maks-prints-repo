const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const carts = await Cart.findAll({include: {all: true}})
      if (!carts) { res.sendStatus(404) }
      else { res.json(carts) }
    }
    catch (err) { next(err) }
  } else { res.sendStatus(404) }
})

router.get('/:id', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const cart = await Cart.findById(req.params.id, {include: {all: true}})
      if (!cart) { res.sendStatus(404) }
      else { res.json(cart) }
    }
    catch (err) { next(err) }
  } else { res.sendStatus(404) }
})
