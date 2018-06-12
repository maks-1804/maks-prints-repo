import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
// import CartProductCard from './Cart-ProductCard'
import { getCartsForUser } from '../../store/cartList'
import CartHistoryCard from './Cart-HistoryCard'

class CartHistory extends Component {
  constructor() {
    super()
    this.state = {
      toggleOn: false
    }
    this.toggleView = this.toggleView.bind(this)
  }

  componentDidMount() {
    this.props.getCarts()
  }

  toggleView(evt) {
    evt.preventDefault()
    const toggle = this.state.toggleOn
    this.setState({toggleOn: !toggle})
  }

  render() {
    const { toggleOn } = this.state
    const orders = this.props.orderHistory
    // console.log('in history comp: ', orders)
    return (
      <div >
        <div className='row' onClick={this.toggleView}>
          <h2 id='order-history'>Order History</h2>
          {!toggleOn
          ? <i className="fas fa-sort-down fa-2x col-2"></i>
          : <i className="fas fa-sort-up fa-2x col-2 align-self-end"></i>}
        </div>
        {toggleOn && (
          <div>
            <div className='row btm-brdr'>
              <p className='col-2'>Date</p>
              <p className='col-6'>Order Details</p>
              <p className='col-2'>Status</p>
            </div>
            {orders.filter( order => {
              return order.status !== 'open'
            }).sort( (a, b) => a.date < b.date).map( order => {
              return <CartHistoryCard key={order.id} order={order}/>
            })}
          </div>
        )}
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
