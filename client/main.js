import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter, Route, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  Login,
  Signup,
  UserDashboard,
  UserEdit,
  ProductList,
  ProductSingle,
  OpenCart,
  EditProduct,
  AddProduct,
  AllUsers,
  AdminDashboard
} from './components'
//import ProductList from './components/shop/product-list'
import ReviewList from './components/reviews/ReviewList'
import { me } from './store'
import { fetchCart } from './store/cart'

/**
 * COMPONENT
 */
class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData()
    this.props.fetchCart()
  }

  render() {
    const { isLoggedIn, isAdmin } = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />
        <Route exact path="/shop" component={ProductList} />
        <Route exact path="/shop/:categoryName" component={ProductList} />
        <Route
          exact
          path="/shop/product/:productId"
          component={ProductSingle}
        />

        <Route exact path='/cart' component={OpenCart} />

        {isAdmin && (
          <Switch>
            <Route exact path="/admin/product/edit/:productId" component={EditProduct} />
            <Route exact path="/admin/user/edit/:userId" />
            <Route exact path="/admin/product/add" component={AddProduct} />
            <Route exact path="/admin/product/add" />
            <Route exact path="/admin/users/" component={AllUsers} />
            <Route exact path="/admin/dashboard" component={AdminDashboard} />
            <Route exact path="/admin/carts" />
          </Switch>
        )}
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/:userId/dashboard" component={UserDashboard} />
            <Route exact path="/:userId/edit" component={UserEdit} />
          </Switch>
        )}

        {/* Displays our Login component as a fallback */}
        <Route component={Login} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    },
    fetchCart: () => dispatch(fetchCart())
  }
}
//!!!!!!!
// The `withRouter` wrapper makes sure that updates are not blocked
// when the  changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
