import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { NavLink } from 'react-router-dom'

import SearchBar from './Navbar-Search'
import { logout } from '../store'

const Navbar = props => {
  const {
    handleClick,
    isLoggedIn,
    isAdmin,
    id,
    numberOfItems,
    subtotal
  } = props

  return (
    <div className="navbar-fixed">
      <nav className="navbar navbar-default">
        <div className="container">
          <div className="navbar-header">
            <NavLink className="navbar-brand left" to="/">
              MAKS Prints
            </NavLink>
          </div>

          <div className="nav-wrapper">
            {/* <SearchBar /> */}
          </div>

          <div className="nav-wrapper">
            <ul className="hide-on-med-and-down">
              <li>
                <NavLink to="/shop">Shop</NavLink>
              </li>
            </ul>
          </div>

          {/* The navbar will show these links after you log in */}
          {isLoggedIn ? (
            <div className="nav-wrapper">
              <ul className="right hide-on-med-and-down">
                {isAdmin ? (
                  <li>
                    <NavLink to="/admin/dashboard">Dashboard</NavLink>
                  </li>
                ) : (
                  <li>
                    <NavLink to={`/${id}/dashboard`}>My Account</NavLink>
                  </li>
                )}
                <li>
                  <a href="#" onClick={handleClick}>
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          ) : (
            <div>
              <ul>
                <li>
                  <NavLink to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink to="/signup">Sign Up</NavLink>
                </li>
              </ul>
            </div>
          )}

          <div className="nav-wrapper">
            <ul className="right hide-on-med-and-down">
              <li>({numberOfItems})</li>
              <li>${subtotal}</li>
              <li>
                <NavLink to="/cart">
                  <i className="material-icons small right">shopping_cart</i>
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin,
    id: state.user.id,
    numberOfItems: state.frontEndCartReducer.numItemsInCart,
    subtotal: state.frontEndCartReducer.subtotal
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(
  mapState,
  mapDispatch
)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
