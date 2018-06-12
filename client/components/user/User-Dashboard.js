import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { loadAllReviews } from '../../store/reviews'
import { SingleReview } from '../reviews'
class UserDashboard extends React.Component {
  constructor() {
    super()
    this.openSection = this.openSection.bind(this)
  }

  componentDidMount() {
    this.props.fetchReviews()
  }

  openSection() {
    $(document).ready(function() {
      $('.collapsible').collapsible()
    })
  }

  render() {
    const { id, name, email, address } = this.props
    const userReviews = this.props.reviews.filter(
      review => review.userId === id
    )

    return (
      <div className="container">
        <h3>Welcome back, {name}!</h3>
        <p>Thanks for shopping with us!</p>

        <ul className="collapsible">
          {/* Account Info */}
          <li>
            <div className="collapsible-header" onClick={this.openSection}>
              <i className="material-icons">info</i>My Info
            </div>
            <div className="collapsible-body">
              <p>{`Email: ${email}`}</p>
              <p>{`Address: ${address}`}</p>
              <Link to={`/${id}/edit`}>
                <button className="waves-effect waves-light btn" type="button">Edit Account</button>
              </Link>
            </div>
          </li>

          {/* Previous Orders */}
          <li>
            <div className="collapsible-header">
              <i className="material-icons">history</i>Old Orders
            </div>
            <div className="collapsible-body">
              <span>Lorem ipsum dolor sit amet.</span>
            </div>
          </li>

          {/* Reviews */}
          <li>
            <div className="collapsible-header">
              <i className="material-icons">rate_review</i>Reviews
            </div>
            <div className="collapsible-body">
              {userReviews.length ? (
                userReviews.map(review => (
                  <SingleReview key={review.id} review={review} />
                ))
              ) : (
                <div>
                  <p>No reviews found!</p>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    )

    // return (
    //   <div>
    //     <div>
    //       <h3>Welcome back, {name}!</h3>
    //     </div>

    //     <div>
    //       <h3>My Info</h3>
    //       <p>{email}</p>
    //       <p>{address}</p>
    //       <Link to={`/${id}/edit`}>
    //         <button type="button">Edit Account</button>
    //       </Link>
    //     </div>

    //     <div>
    //       <h3>My Cart</h3>
    //     </div>

    //     <div>
    //       <h3>Previous Orders</h3>
    //     </div>

    //     <div>
    //       <h3>My Reviews</h3>
    //       {
    //         userReviews.length ?
    //           userReviews.map((review) =>
    //             (
    //               <SingleReview key={review.id} review={review} />
    //             )
    //           )
    //           :
    //           <div>
    //             <p>No reviews found!</p>
    //           </div>
    //       }
    //     </div>
    //   </div>
    // )
  }
}

const mapState = state => {
  return {
    id: state.user.id,
    name: state.user.name,
    email: state.user.email,
    address: state.user.address,
    reviews: state.reviews
  }
}

const mapDispatch = dispatch => {
  return {
    fetchReviews: () => dispatch(loadAllReviews())
  }
}

export default connect(
  mapState,
  mapDispatch
)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  id: PropTypes.number.isRequired,
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
}
