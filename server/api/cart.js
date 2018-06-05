const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  if (!req.user) { res.sendStatus(404) }
  try {
      const carts = await Cart.findAll({where: {userId: req.user.id}}, {include: [{all: true}]})
      res.json(carts)
  }
  catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  if (!req.user) { res.sendStatus(404) }
  try {
    const cart = await Cart.findAll({where: {userId: req.user.id,
    id: req.params.id}}, {include: [{all: true}]})
    res.json(cart)
  }
  catch (err) { next(err) }
})


router.post('/', async (req, res, next) => {
  try {
      const cart = await Cart.create(req.body);
      const cartWithAssociations = await Cart.findById(cart.id, {include: [{all: true}]})
      res.json(cartWithAssociations)
    }
  catch (err) { next(err) }
})

//-----------------------ADMIN ROUTES--------------------------\\

router.get('/admin', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const carts = await Cart.findAll({include: [{all: true}]})
      if (!carts) { res.sendStatus(404) }
      else { res.json(carts) }
    }
    catch (err) { next(err) }
  } else { res.sendStatus(404) }
})

router.get('/admin/:id', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const cart = await Cart.findById(req.params.id, {include: [{all: true}]})
      if (!cart) { res.sendStatus(404) }
      else { res.json(cart) }
    }
    catch (err) { next(err) }
  }
  else {  res.sendStatus(404) }
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

router.delete('/:id', async (req, res, next) => {
  if (req.user.type === 'admin') {
    try {
      const cart = await Cart.findById(req.params.id)
      await cart.destroy()
      res.status(204).end()
    }
    catch (err) {next(err)}
  }
  else { res.sendStatus(404) }
})
