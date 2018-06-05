const router = require('express').Router()
const {Product} = require('../db/models')
module.exports = router

//GET /api/products/ --- all products
router.get('/', async (req, res, next) => {

})

//GET /api/products/?query --- products in a category


//GET /api/products/:id --- single product
router.get('/:id', async (req, res, next) => {

})

//   ---ADMIN ONLY---

//POST /api/products --- new product
router.post('/', async (req, res, next) => {

})

//PUT /api/products/:id --- edit product
router.put('/:id', async (req, res, next) => {

})

//DELETE /api/products/:id --- delete product
router.delete('/:id', async (req, res, next) => {

})
