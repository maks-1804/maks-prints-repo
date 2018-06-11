import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const SingleReview = props => {
  const { review } = props
  //the moment library lets us get relative time easily:
  const timeSince = moment(review.createdAt).fromNow()

  return (
    <div className="container-review-single">
      <h4>{review.title}</h4>
      <h6>{`review by user: ${review.userId}, ${timeSince}`}</h6>
      <p>{review.content}</p>
    </div>
  )
}

export default SingleReview
