import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

const UserDashboard = (props) => {
  const { id, email, address } = props

  return (
    <div>
      <div>
        <h3>Welcome back, {email}!</h3>
      </div>

      <div>
        <h3>My Info</h3>
        <p>{address}</p>
        <Link to={`/${id}/edit`}>
          <button type="button">Edit Account</button>
        </Link>
      </div>

      <div>
        <h3>My Cart</h3>
      </div>

      <div>
        <h3>Previous Orders</h3>
      </div>

      <div>
        <h3>My Reviews</h3>
      </div>
    </div>
  )
}

const mapState = (state) => {
  return {
    id: state.user.id,
    email: state.user.email,
    address: state.user.address
  }
}

export default connect(mapState)(UserDashboard)

/**
 * PROP TYPES
 */
UserDashboard.propTypes = {
  id: PropTypes.number,
  email: PropTypes.string
}
