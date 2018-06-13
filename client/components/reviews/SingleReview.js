import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

const SingleReview = props => {
  const { review } = props
  //the moment library lets us get relative time easily:
  const timeSince = moment(review.createdAt).fromNow()

  return (
    <div className="col s12 m7" >
      <div className="card horizontal">
        <div className="container-review-single">
          <h5>{review.title}</h5>
          <p>{`Review by User: ${review.user.name}`}</p>
          <p>Rated: {
            review.rating === 'happy' ?
              <i className="material-icons">sentiment_very_satisfied</i>
              : <i className="material-icons">sentiment_very_dissatisfied</i>
          }
          </p>
          <p>{`${timeSince}`}</p>
          <p>{review.content}</p>
        </div>
      </div>
    </div >
  )
}

export default SingleReview
