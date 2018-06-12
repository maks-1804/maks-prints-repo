import React from 'react'
import StripeCheckout from 'react-stripe-checkout'

const CURRENCY = 'USD'

const successPayment = data => {
  alert('Payment Successful')
}

const errorPayment = data => {
  alert('Payment error')
}

const onToken = (amount, description) => token => {
  axios.post(PAYMENT_SERVER_URL, {
    description,
    source: token.id,
    currency: CURRENCY,
    amount: amount
  })
  .then(successPayment)
  .catch(errorPayment)
}

const Checkout = ({name, description, amount}) =>
  (<StripeCheckout
    name={name}
    description={description}
    amount={amount}
    token={onToken(amount, description)}
    currency={CURRENCY}
    stripeKey={STRIPE_PUBLISHIBLE}
  />)

export default Checkout
