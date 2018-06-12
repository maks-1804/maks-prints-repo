const PAYMENT_SERVER_URL =
  process.env.NODE_ENV === 'production'
    ? 'maks-prints.herokuapp.com'
    : 'http://localhost:8080/api/checkout'

module.exports = PAYMENT_SERVER_URL
