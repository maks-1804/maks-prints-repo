import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import SingleReview from './Single-Review'

import { loadAllReviews } from '../../store/reviews'

class ReviewList extends React.Component {
  // Initialize state in constructor,
  // Or with a property initializer. linter is unhappy but get derived state needs this to work!
  state = {
    reviews: []
  }
  componentDidMount() {
    if (!this.props.reviews.length) {
      this.props.getReviews()
    }
  }
  static getDerivedStateFromProps(props, state) {
    if (props.reviews !== state.reviews) {
      return {
        reviews: props.reviews
      }
    }
    return null
  }
  render() {
    const { product, reviews } = this.props
    let reviewContext
    if (product && product.title && reviews.length) {
      reviewContext = (
        <div>
          {reviews.map(review => (
            <SingleReview key={review.id} review={review} />
          ))}
        </div>
      )
    } else {
      reviewContext = <div>reviews are maybe alive</div>
    }
    return <div className="container-review-list">{reviewContext}</div>
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.filter(product => product.id === id)[0],
    reviews: state.reviews.filter(review => review.productId === id)
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getReviews: () => dispatch(loadAllReviews())
  }
}

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewList)
)
//export default ReviewList
