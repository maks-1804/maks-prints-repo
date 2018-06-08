import React from 'react'
import PropTypes from 'prop-types'

const SingleReview = props => {
  const { review } = props
  console.log('the review:', review)
  return (
    <div className="container-review-single">
      <h4>{review.title}</h4>
      <h5>{`review by user: ${review.userId} at ${review.createdAt}`}</h5>
      <p>{review.content}</p>
    </div>
  )
}

export default SingleReview
