import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import CartProductCard from './Cart-ProductCard'
import { getCartsForUser } from '../../store/cartList'
import CartHistoryCard from './Cart-HistoryCard'

class CartHistory extends Component {
  componentDidMount() {
    this.props.getCarts()
  }

  render() {
    const orders = this.props.orderHistory
    // console.log('in history comp: ', orders)
    return (
      <div>
          <div>
            <table>
            <thead>
            <tr>
              <th className="left-align col s4">Date</th>
              <th className="left-align col s6">Order Details</th>
              <th className="right-align col s2">Status</th>
            </tr>
            </thead>
            </table>
            {orders.filter( order => {
              return order.status !== 'open'
            }).sort( (a, b) => a.date < b.date).map( order => {
              return <CartHistoryCard key={order.id} order={order}/>
            })}
          </div>
      </div>
    )}
}


const mapState = state => {
  return {
    orderHistory: state.cartList
  }
}

const mapDispatch = dispatch => {
  return {
    getCarts: () => dispatch(getCartsForUser())
  }
}

export default connect(mapState, mapDispatch)(CartHistory)

CartHistory.propTypes = {

}
