const router = require('express').Router()
const { Cart } = require('../db/models')
module.exports = router

router.get('/', async (req, res, next) => {
  try {
    if (!req.user) { res.sendStatus(403) }
    const carts = await Cart.findAll({where: {userId: req.user.id}}, {include: [{all: true}]})
    res.json(carts)
  }
  catch (err) { next(err) }
})

router.get('/:id', async (req, res, next) => {
  try {
    if (!req.user) { res.sendStatus(403) }
    const cart = await Cart.findAll({where: {userId: req.user.id,
    id: req.params.id}}, {include: [{all: true}]})
    res.json(cart)
  }
  catch (err) { next(err) }
})


router.post('/', async (req, res, next) => {
  try {
      const cart = await Cart.create(req.body)
      const cartWithAssociations = await Cart.findById(cart.id, {include: [{all: true}]})
      res.json(cartWithAssociations)
  }
  catch (err) { next(err) }
})

//patch --> update quantity
// put --> add to cart

//-----------------------ADMIN ROUTES--------------------------\\

router.get('/admin', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const carts = await Cart.findAll({include: [{all: true}]})
      if (!carts) { res.sendStatus(404) }
      else { res.json(carts) }
    } else { res.sendStatus(403) }
  } catch (err) { next(err) }
})

router.get('/admin/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const cart = await Cart.findById(req.params.id, {include: [{all: true}]})
      if (!cart) { res.sendStatus(404) }
      else { res.json(cart) } }
    else {  res.sendStatus(403) }
    }
  catch (err) { next(err) }
})

router.put('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const cart = await Cart.findById(req.params.id, {include: {all: true}})
      if (!cart) { res.sendStatus(404) }
      const updated = await cart.update(req.body)
      res.json(updated)
    }
    else { res.sendStatus(403) } }
  catch (err) {next(err)}
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const cart = await Cart.findById(req.params.id)
      await cart.destroy()
      res.status(204).end()
    }
    else { res.sendStatus(404) }
  } catch (err) {next(err)}
})
