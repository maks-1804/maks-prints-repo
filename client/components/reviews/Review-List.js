import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const ReviewList = props => {
  console.log('props on review list', props)
  const { product } = props
  const location = props.location.pathname
  console.log('location?', location, location.slice(0, 5))
  let reviewContext
  if (
    location &&
    location.slice(0, 5) === '/shop' &&
    product &&
    product.title
  ) {
    reviewContext = <div>reviews are alive</div>
  } else {
    reviewContext = <div>reviews are maybe alive</div>
  }
  return <div className="container-review-list">{reviewContext}</div>
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id
  console.log(state.products)
  return {
    product: state.products.filter(product => product.id === id)[0]
  }
}

export default connect(mapStateToProps)(ReviewList)
