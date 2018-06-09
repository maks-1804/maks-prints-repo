import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'

const SingleReview = props => {
  //helper function to show a relative date- eg, "today" "two months ago" or "two years ago"
  const { review } = props
  const timeSince = moment(review.createdAt).fromNow()
  // const now = new Date()
  // const rev = new Date(review.createdAt)
  // console.log(review.createdAt)
  // const diff = now - rev
  // console.log(
  //   `review left at ${rev} vs now ${now} and diff: ${diff / 1000}, ${diff /
  //     1000 /
  //     (60 * 60 * 24)}, type: ${typeof review.createdAt}`
  // )

  console.log('the review:', review, timeSince)
  return (
    <div className="container-review-single">
      <h4>{review.title}</h4>
      <h6>{`review by user: ${review.userId}, ${timeSince}`}</h6>
      <p>{review.content}</p>
    </div>
  )
}

export default SingleReview
