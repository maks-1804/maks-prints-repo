import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { logout } from "../store";

const Navbar = (props) => {
  const { handleClick, isLoggedIn, id } = props
  return (
    <nav className="navbar sticky-top navbar-expand-lg navbar-light bg-light">
      <div className="navbar-nav">

        <NavLink className="navbar-brand" to="/">MAKS PRINTS</NavLink>
        <NavLink className="nav-item nav-link" to="/shop">Shop</NavLink>
        <div>
          <form className="form-inline my-2 my-lg-0">
            <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
            <button className="btn btn-sm btn-outline-secondary" type="submit">Search</button>
          </form>
        </div>
        {isLoggedIn ? (
          <div className="nav-item nav-link">
            {/* The navbar will show these links after you log in */}
            <NavLink className="nav-link" to={`/${id}/dashboard`}>My Account</NavLink>
            <a className="nav-link" href="#" onClick={handleClick}>Logout</a>
          </div>
        ) : (
            <div className="nav-item nav-link">
              {/* The navbar will show these links before you log in */}
              <NavLink to="/login">Login</NavLink>
              <NavLink to="/signup">Sign Up</NavLink>
            </div>
          )}
      </div>
    </nav>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    id: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(mapState, mapDispatch)(Navbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
