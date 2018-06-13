const router = require('express').Router()
// const stripe = require('../constants/stripe-backend')
module.exports = router
//post to /api/checkout/


const configureStripe = require('stripe')

const stripe = configureStripe(process.env.STRIPE_SECRET_KEY)


const paymentApi = router => {
  router.get('/', (req, res) => {
    res.send({
      message: 'Hello Stripe checkout server!',
      timestamp: new Date().toISOString()
    })
  })
}
router.post('/', (req, res) => {
  stripe.charges.create(req.body, postStripeCharge(res))
})
