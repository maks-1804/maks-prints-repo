import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SingleReview from './Single-Review'

const ReviewList = props => {
  const { product } = props
  //const location = props.location.pathname
  console.log('location?', location)
  let reviewContext
  if (product && product.title && product.reviews.length) {
    console.log('WE HAVE REVIEWS')
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
  console.log('OWNPROPS', ownProps)
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.filter(product => product.id === id)[0]
  }
}

export default withRouter(connect(mapStateToProps)(ReviewList))
//export default ReviewList
