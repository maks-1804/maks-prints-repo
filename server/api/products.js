const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products/ --- all products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll({include: {all: true}})
    if (!products) { res.sendStatus(404) }
    res.json(products)
  }
  catch (err) { next(err) }
})

//GET /api/products/?query --- products in a category
router.get('/')

//GET /api/products/:id --- single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id)
    if (!product) { res.sendStatus(404) }
    res.json(product)
  }
  catch (err) { next(err) }
})

//   ---ADMIN ONLY---

//POST /api/products --- new product
router.post('/', async (req, res, next) => {
// awaiting further discussion of admin validation
  try {
    const product = await Product.create(req.body)
    const productWithAssociations = await Product.findById(product.id, {include: {all: true}})
    res.json(productWithAssociations)
  }
  catch (err) { next(err) }
})

//PUT /api/products/:id --- edit product
router.put('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {include: {all: true}});
    if (!product) { res.sendStatus(404) }
    const updated = await product.update(req.body);
    res.json(updated)
  }
  catch (err) { next(err) }
})

//DELETE /api/products/:id --- delete product
router.delete('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    await product.destroy();
    res.status(204).end()
  }
  catch (err) { next(err) }
})
