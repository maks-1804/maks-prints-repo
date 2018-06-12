import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import CartProductCard from './Cart-ProductCard'
import CartHistory from './Cart-History'
import {
  retrieveOpenCart,
  editTheCart,
  deleteProductNoUser,
  deleteTheProductWithUser } from '../../store/cart'


//<Route exact path='cart' component={OpenCart} />

class OpenCart extends Component {
  constructor() {
    super()
    this.state = {}
    this.deleteProductFromCart = this.deleteProductFromCart.bind(this)
    this.changeQuantity = this.changeQuantity.bind(this)
  }
  componentDidMount() {
    const { user, getOpenCart, products, updateFrontCart } = this.props
    getOpenCart(user)
    // updateFrontCart(products)
  }

  deleteProductFromCart(evt, product) {
    evt.preventDefault()
    const { deleteProdNoUser, deleteProdWithUser, isLoggedIn, cart } = this.props
    isLoggedIn
    ? deleteProdWithUser(cart.id, product.id)
    : deleteProdNoUser(product)
  }

  changeQuantity(evt, product) {
    const { cart, user, editCart } = this.props
    const { products } = cart
    const newProduct = {...product, productQuantity: +evt.target.value}
    const newCart = {...cart, products: products.map( singleProduct => {
      if (singleProduct.id === newProduct.id) {
        return newProduct
      } else {
        return singleProduct
      }
    })}
    editCart(newCart, user)
  }

  render() {
    const { cart, products, numberOfItems, subtotal, isLoggedIn } = this.props
    // console.log('in open cart: ', cart)
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-10'>
            <h1>Current Cart:</h1>
            {products.length < 1
            ? (<h5>There are currently no items in your cart.</h5>)
            : (<div>
                  <div className='row'>
                    <p className='col-8'>Item</p>
                    <p className='col-2'>Price</p>
                    <p className='col-2'>Quantity</p>
                  </div>
                  {products.map( product => {
                  return (<CartProductCard
                    key={product.id}
                    product={product}
                    changeQuantity={this.changeQuantity}
                    deleteItem={this.deleteProductFromCart}
                    cartStatus={cart.status} />) //pass down cart, maybe just status?
                  })}
               </div>)}
          </div>
          <div className='column col-2'>
                <h5>Cart Summary:</h5>
                <div className='row'>
                  <p className='col-7'>Items({numberOfItems}):</p>
                  <p>${subtotal}</p>
                </div>
                <button type='submit'>Place Your Order</button>
          </div>
        </div>
        {/* if a user is logged in, they can see their order history: */}
        {isLoggedIn &&
          <CartHistory />}
      </div>
    )
  }
}

const mapState = state => {
  return {
    user: state.user,
    cart: state.cart || {},
    products: state.cart.products || [],
    isLoggedIn: !!state.user.id,
    numberOfItems: state.frontEndCartReducer.numItemsInCart,
    subtotal: state.frontEndCartReducer.subtotal
  }
}

const mapDispatch = dispatch => {
  return {
    getOpenCart: (user) => dispatch(retrieveOpenCart(user)),
    // ^ retrieveOpenCart will later be on login.signup button
      // editTheCart(cart, user) will be on componentDidMount
    editCart: (cart, user) => dispatch(editTheCart(cart, user)),
    deleteProdNoUser: (product) => dispatch(deleteProductNoUser(product)),
    deleteProdWithUser: (cartId, productId) => dispatch(deleteTheProductWithUser(cartId, productId))

  }
}


export default connect(mapState, mapDispatch)(OpenCart)

OpenCart.propTypes = {

}
