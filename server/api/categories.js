const router = require('express').Router()
const { Category, Product } = require('../db/models')
const { isAdmin } = require('./access')

module.exports = router

router.get('/', async (req, res, next) => {
  try {
    const categories = await Category.findAll()
    res.json(categories)
  } catch (err) {
    next(err)
  }
})

router.get('/:id', async (req, res, next) => {
  try {
    const category = await Category.findById(+req.params.id,
      {
        include: [{ model: Product }]
      })
    res.json(category)
  } catch (err) {
    next(err)
  }
})


// Admin Only
router.put('/:id', isAdmin, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    const newCategory = await category.update(req.body)
    res.json(newCategory)
  } catch (err) {
    next(err)
  }
})

router.post('/', isAdmin, async (req, res, next) => {
  try {
    const category = await Category.create(req.body)
    res.status(201).json(category)
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', isAdmin, async (req, res, next) => {
  try {
    const category = await Category.findById(req.params.id)
    await category.destroy()
    res.end()
  } catch (err) {
    next(err)
  }
})
