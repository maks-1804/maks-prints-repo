import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartProductCard from './Cart-ProductCard'

class CartHistory extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    //do is logged in info on open cart page
    return (
      <div>
        <h2>Order History</h2>
      </div>
    )}
}

const mapState = state => {
  return {
    orderHistory:
  }
}

// const mapDispatch ??

export default connect(mapState, mapDispatch)(CartHistory)

CartHistory.propTypes = {

}
