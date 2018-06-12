const STRIPE_PUBLISHABLE =
  process.env.NODE_ENV === 'production'
    ? 'pk_test_gOQXouA0Ktgz79PfjQ6lgP3z'
    : 'pk_test_gOQXouA0Ktgz79PfjQ6lgP3z'

export default STRIPE_PUBLISHABLE
