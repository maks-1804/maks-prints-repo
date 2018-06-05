const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products/ --- all products
router.get('/', async (req, res, next) => {
  const category = req.query.category
  if (!category) {
    try {
    const products = await Product.findAll({include: {all: true}})
    res.json(products)
    }
    catch (err) { next(err) }
  }
  //in the future we will use this for a search bar functionality
  else {
    try {
      const products = await Product.findByCategory(category)
      if (!products) { res.sendStatus(404) }
      res.json(products)
    }
    catch (err) { next(err) }
  }
})

router.get('/category/:categoryId', async (req, res, next) => {
  try {
    const products = await Product.findAll({where: { categoryId: req.params.categoryId}}, {include: {all: true}})
    res.json(products)
  }
  catch (err) { next(err) }
})

//GET /api/products/:id --- single product
router.get('/:id', async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id, {include: {all: true}})
    if (!product) { res.sendStatus(404) }
    res.json(product)
  }
  catch (err) { next(err) }
})

//   ---ADMIN ONLY---

//POST /api/products --- new product
router.post('/', async (req, res, next) => {
// awaiting further discussion of admin validation
  if (req.user.type === "admin") {
    try {
      const product = await Product.create(req.body)
      const productWithAssociations = await Product.findById(product.id, {include: {all: true}})
      res.json(productWithAssociations)
    }
    catch (err) { next(err) }
    }
  else { res.sendStatus(404) }
})

//PUT /api/products/:id --- edit product
router.put('/:id', async (req, res, next) => {
  if (req.user.type === "admin") {
    try {
      const product = await Product.findById(req.params.id, {include: {all: true}})
      if (!product) { res.sendStatus(404) }
      const updated = await product.update(req.body)
      res.json(updated)
    }
    catch (err) { next(err) }
  }
  else {  res.sendStatus(404) }
})

//DELETE /api/products/:id --- delete product
router.delete('/:id', async (req, res, next) => {
  if (req.user.type === "admin") {
    try {
      const product = await Product.findById(req.params.id)
      await product.destroy()
      res.status(204).end()
    }
    catch (err) { next(err) }
    }
  else { res.sendStatus(404) }
})
