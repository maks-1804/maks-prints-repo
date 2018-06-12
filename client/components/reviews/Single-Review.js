import React from 'react'
import PropTypes from 'prop-types'
import moment from 'moment'
import { Link } from 'react-router-dom'

const SingleReview = props => {
  const { review } = props
  //the moment library lets us get relative time easily:
  const timeSince = moment(review.createdAt).fromNow()

  return (
    <div className="col s12 m7">
      <div className="card horizontal">
        {review.product ? (
          <div>
            <h2 className="header">{review.title}</h2>
            <div className="card-image">
              <img src={review.product.imageUrl} />
            </div>

            <div className="card-content">
              <p>{`Review By: ${review.user.name}`}</p>
              <p>{`${timeSince}`}</p>
              <p>{review.content}</p>
            </div>

            <div className="card-action">
              <Link to={`/shop/product/${review.productId}`}>See Print</Link>
            </div>
          </div>
        ) : (
          <div className="container-review-single">
            <h4>{review.title}</h4>
            <h6>{`Review by User: ${review.userId}`}</h6>
            <h6>{`${timeSince}`}</h6>
            <p>{review.content}</p>
          </div>
        )}
      </div>
    </div>
  )

  // return (
  //   <div className="container-review-single">
  //     <h4>{review.title}</h4>
  //     <h6>{`review by user: ${review.userId}, ${timeSince}`}</h6>
  //     <p>{review.content}</p>
  //   </div>
  // )
}

export default SingleReview
