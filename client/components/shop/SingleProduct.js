import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadAllProducts } from '../../store/products'
import ReviewList from '../reviews/ReviewList'
import { ReviewForm } from '../reviews'
import { retreiveOpenCart, editTheCart } from '../../store/cart'
//import { me } from '../../store/user'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      selectedQuantity: 1
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDropdown = this.handleDropdown.bind(this)
  }

  componentDidMount() {
    if (!this.props.product) {
      this.props.fetchProducts()
    }
  }

  async handleSubmit(event) {
    event.preventDefault()
    //get old cart products and update opencart with products we area adding
    const oldProducts = this.props.openCart.products
    console.log('oldProducts:', oldProducts)
    const newProduct = this.props.product
    //put a quantity property on the new product object based on the dropdown
    //new quantity is prev quantity (if was there) plus selected quantity
    let idx
    let oldQuantity
    let filteredProducts
    const findById = function(product) {
      return product.id === newProduct.id
    }
    if (oldProducts.find(findById) !== undefined) {
      idx = oldProducts.indexOf(oldProducts.find(findById))

      oldQuantity = await oldProducts[idx].cartProducts.productQuantity
      newProduct.productQuantity =
        Number(this.state.selectedQuantity) + Number(oldQuantity)
      filteredProducts = oldProducts.filter(
        product => product.id !== newProduct.id
      )
    } else {
      filteredProducts = oldProducts
      newProduct.productQuantity = this.state.selectedQuantity
    }
    this.props.openCart.products = [...filteredProducts, newProduct]
    //now dispatch!
    this.props.addToCart(this.props.openCart, this.props.user)
  }

  handleChange(evt) {
    this.setState({
      selectedQuantity: evt.target.value
    })
  }

  handleDropdown() {
    $(document).ready(function(){
      $('select').formSelect()
    })
  }

  render() {
    const { product } = this.props

    //need some initial values for the form in case we still need to fetch the product
    let quantity = 0
    let productContent
    let price = 0
    if (product) {
      quantity = product.inventoryQuantity
      price = Math.floor(product.price / 100)
      productContent = (
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-md-8">
              <img className="col s8" src={product.imageUrl} />
            </div>
            <div className="col-md-4">
              <div className="mx-3 my-5">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <h5>{`$${price}`}</h5>
                <div>
                  <form>
                    <label>
                      {`Select Quantity - ${
                        product.inventoryQuantity
                      } Available`}
                    </label>
                    <div>
                      <select
                        className="browser-default"
                        name="product-quantity"
                        value={this.state.selectedQuantity}
                        onChange={this.handleChange}
                      >
                      <option value="" disabled selected>Choose Quantity</option>
                        {Array.apply(null, new Array(quantity)).map((el, ind) => {
                          return <option key={ind}>{ind + 1}</option>
                        })}
                      </select>
                    </div>
                  </form>
                  <h5>Subtotal: ${this.state.selectedQuantity * price}</h5>
                  <button type="submit" onClick={this.handleSubmit}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    const loadingContent = (
      <div>
        <p>loading this product...</p>
      </div>
    )
    return (
      // classNames can be changed...flexbox in mind (2columns, pic vs everything else)
      //if it works better with something (bootstrap?), feel free to change classNames/div structure!
      <div className="container-fluid">
        {product ? productContent : loadingContent}

        {/* </div> */}
        <div>
          {product && product.reviews.length ? (
            <div>
              <ReviewList />
            </div>
          ) : (
            <div>
              <h3>No reviews for this product yet</h3>
            </div>
          )}
        </div>
        <div>
          <ReviewForm />
        </div>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  // console.log('what are ownProps', ownProps)
  // console.log('state open cart? ', state.cart)
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.filter(product => product.id === id)[0],
    products: state.products,
    user: state.user,
    openCart: state.cart
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  //console.log('doI have? ', ownProps)
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    getOpenCart: user => dispatch(retreiveOpenCart(user)),
    addToCart: (user, products) => dispatch(editTheCart(user, products))
  }
}

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(SingleProduct)
);

// SingleProduct.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,   //number is corrent for number?
//   inventoryQuantity: PropTypes.number.isRequired,   //number is corrent for number?
//   imageUrl: PropTypes.string.isRequired
// }
