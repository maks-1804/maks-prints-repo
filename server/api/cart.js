const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router


//------------ADMIN ROUTES---------------\\
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

router.post('/', async (req, res, next) => {
  if (req.user.type === "admin") {
    try {
      const cart = await Cart.create(req.body);
      const cartWithAssociations = await Cart.findById(cart.id)
      res.json(cartWithAssociations)
    }
    catch (err) { next(err) }
  }
  else { res.sendStatus(404) }
})

router.put('/:id', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const cart = await Cart.findById(req.params.id, {include: {all: true}})
      if (!cart) { res.sendStatus(404) }
      const updated = await cart.update(req.body)
      res.json(updated)
    }
    catch (err) {next(err)}
  }
  else { res.sendStatus(404) }
})
