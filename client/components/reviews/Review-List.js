import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SingleReview from './Single-Review'

const ReviewList = props => {
  const { product } = props
  let reviewContext
  if (product && product.title && product.reviews.length) {
    reviewContext = (
      <div>
        {product.reviews.map(review => (
          <SingleReview key={review.id} review={review} />
        ))}
      </div>
    )
  } else {
    reviewContext = <div>reviews are maybe alive</div>
  }
  return <div className="container-review-list">{reviewContext}</div>
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.filter(product => product.id === id)[0]
  }
}

export default withRouter(connect(mapStateToProps)(ReviewList))
//export default ReviewList
