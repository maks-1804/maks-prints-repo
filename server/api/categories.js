const router = require('express').Router()
const { Category, Product } = require('../db/models')
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


// Admin Routes Only
router.put('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const category = await Category.findById(req.params.id)
      const newCategory = await category.update(req.body)
      res.json(newCategory)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.post('/', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const category = await Category.create(req.body)
      res.status(201).json(category)
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})

router.delete('/:id', async (req, res, next) => {
  try {
    if (req.user.isAdmin) {
      const category = await Category.findById(req.params.id)
      await category.destroy()
      res.end()
    } else {
      res.sendStatus(403)
    }
  } catch (err) {
    next(err)
  }
})
