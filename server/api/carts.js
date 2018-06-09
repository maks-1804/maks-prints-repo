const router = require('express').Router()
const { Cart, cartProducts, Product, db } = require('../db/models')
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
    // const cartProduct = await db.models.cartProducts.findAll({where: {cartId: req.params.id}})
    // console.log("aaaaaahhhh", cartProduct)
    res.json(cart)
  }
  catch (err) { next(err) }
})

router.get('/open/:id', async (req, res, next) => {
  try {
    if (!req.user) { res.sendStatus(403) }
    const cart = await Cart.findAll({where: {userId: req.user.id, status: 'open'}, include: [Product]})
    res.json(cart)
  } catch (err) {next(err)}
})

router.post('/', async (req, res, next) => {
  try {
      const cart = await Cart.create(req.body.userId)
      if (req.body.products) {
        for (let i = 0; i < req.body.products; i++) {
          await cart.addProduct(req.body.products[i].id)
        }
      }
      const cartWithAssociations = await Cart.findById(cart.id, {include: [{all: true}]})
      res.json(cartWithAssociations)
  }
  catch (err) { next(err) }
})

router.patch('/:id', async (req, res, next) => {
  try {
    const cart = await Cart.findById(req.params.id)
    const updated = await cart.update({status: req.body.status, date: req.body.date})
    res.json(updated)
  }
  catch (err) {next(err)}
})

// router.put('/:id', async (req, res, next) => {
//   try {
//     const cart = await Cart.findById(req.params.id, {include: {all: true}})
//      for (let i = 0; i < req.body.products; i++) {
//        await cart.addProduct(req.body.products[i].id)
//     }
//     const cartWithAssociations = await Cart.findById(cart.id, {include: [{all: true}]})
//     res.json(cartWithAssociations)
//     // const cartProduct = await db.models.cartProducts.findAll({where: {cartId: req.params.id, productId: req.body.products}})
//     // const updatedProduct = await cartProduct.update({productQuantity: cartProduct.productQuantity++})

//   }
//   catch (err) { next(err) }
// })

router.put('/open', async (req, res, next) => {
  try {
    const cart = await Cart.findAll({where: {userId: req.body.user.id, status: 'open'}, include: [{all: true}]})
    console.log('wzzzzzuppppp')
    await cart.addProduct(2)
    req.body.products.forEach(async (product) => {
      const existingProduct = await cartProducts.findOne({where: {cartId: cart[0].id, productId: product.id}})
      // console.log("This is the product", existingProduct)
      if (!existingProduct) {
        console.log(cart)
        const newProduct = await Product.findById(product.id)
        await cart.addProduct(newProduct)
      }
      await existingProduct.update({productQuantity: product.productQuantity})
    })
    const cartWithAssociations = await Cart.findById(cart[0].id, {include: [{all: true}]})
    res.json(cartWithAssociations)
  }
  catch (err) { next(err) }
})

//patch --> update quantity
// put --> add to cart

//-----------------------ADMIN ROUTES--------------------------\\

router.get('/admin', async (req, res, next) => {
  try {
      const carts = await Cart.findAll({include: [{all: true}]})
      if (!carts) { res.sendStatus(404) }
      else { res.json(carts) }
  } catch (err) { next(err) }
})

router.get('/admin/:id', async (req, res, next) => {
  try {
      const cart = await Cart.findById(req.params.id, {include: [{all: true}]})
      if (!cart) { res.sendStatus(404) }
      else { res.json(cart) } }
  catch (err) { next(err) }
})


// router.put('/admin/:id')
// updating order fulfillment status - (add to table model)
router.put('/admin/:id', async (req, res, next) => {
  try {
      const cart = await Cart.findById(req.params.id, {include: {all: true}})
      if (!cart) { res.sendStatus(404) }
      const updated = await cart.update(req.body)
      res.json(updated)
    }
  catch (err) {next(err)}
})

router.delete('/admin/:id', async (req, res, next) => {
  try {
      const cart = await Cart.findById(req.params.id)
      await cart.destroy()
      res.status(204).end()
  } catch (err) {next(err)}
})
