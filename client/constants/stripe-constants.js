

const STRIPE_PUBLISHABLE = process.env.NODE_ENV === 'production' ? 'pk_live_MY_PUBLISHIBLE_KEY' : 'pk_test_MY_PUBLISHIBLE_KEY'

export default STRIPE_PUBLISHABLE
