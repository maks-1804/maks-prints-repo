import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";

import SearchBar from './Navbar-Search';
import { logout } from "../store";

const Navbar = (props) => {
  const { handleClick, isLoggedIn, id, numberOfItems, subtotal } = props

  return (
    <nav className="navbar navbar-default navbar-transparent navbar-fixed-top navbar-color-on-scroll">


      <div className="container">
        <div className="navbar-header">
          <NavLink className="navbar-brand" to="/">MAKS PRINTS</NavLink>
        </div>

        <div>
          <NavLink className="nav-item nav-link" to="/shop">Shop</NavLink>
        </div>

        <SearchBar />

        {/* The navbar will show these links after you log in */}
        {isLoggedIn ? (
          <div>
            <ul className="nav navbar-nav navbar-right">
              <li>
                <NavLink className="nav-link" to={`/${id}/dashboard`}>My Account</NavLink>
              </li>
              <li>
                <a className="nav-link" href="#" onClick={handleClick}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
            <div>
              <ul className="nav navbar-nav">
                <li>
                  <NavLink className="nav-link" to="/login">Login</NavLink>
                </li>
                <li>
                  <NavLink className="nav-link" to="/signup">Sign Up</NavLink>
                </li>
              </ul>
            </div>
          )}
        <div className='row align-items-center'>
          <NavLink to='/cart'>
            <img src='https://d30y9cdsu7xlg0.cloudfront.net/png/7352-200.png' style={{maxHeight: '50px', maxWidth: '50px'}} />
          </NavLink>
          <h5 className='col-2'>({numberOfItems})</h5>
          <h5 className='col-2'>${subtotal}</h5>
        </div>
      </div>
    </nav >
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    id: state.user.id,
    numberOfItems: state.frontEndCartReducer.numItemsInCart,
    subtotal: state.frontEndCartReducer.subtotal
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
