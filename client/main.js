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
  Forbidden,
  EditProduct
} from './components'
//import ProductList from './components/shop/product-list'
import ReviewList from './components/reviews/Review-List'
import { me } from './store'

/**
 * COMPONENT
 */
class Main extends Component {
  componentDidMount() {
    this.props.loadInitialData()
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
        <Route exact path="/forbidden" component={Forbidden} />
        {isLoggedIn && (
          <Switch>
            {/* Routes placed here are only available after logging in */}
            <Route exact path="/:userId/dashboard" component={UserDashboard} />
            <Route exact path="/:userId/edit" component={UserEdit} />
          </Switch>
        )}
        {isAdmin && (
          <Switch>
            <Route exact path="/admin/product/edit/:product1" component={EditProduct} />
            <Route exact path="/admin/user/edit/:userId" />
            <Route exact path="/admin/product/add" />
            <Route exact path="/admin/dashboard" />
            <Route exact path="/admin/user/" />
            <Route exact path="/admin/carts" />
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
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired,
  isAdmin: PropTypes.bool.isRequired
}
