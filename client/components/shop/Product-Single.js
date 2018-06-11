import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { loadAllProducts } from '../../store/products'
import ReviewList from '../reviews/Review-List'
import { ReviewForm } from '../reviews'

//adding product
import { editTheCart } from '../../store/carts'

class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      selectedQuantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    if (!this.props.product) {
      this.props.fetchProducts()
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    //add to cart function
  }

  handleChange(evt) {
    this.setState({
      selectedQuantity: evt.target.value
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
      price = product.price
      productContent = (
        <div className="container-fluid bg-light">
          <div className="row">
            <div className="col-md-8">
              <img
                className="img-responsive mx-3 my-5"
                src={product.imageUrl}
              />
            </div>
            <div className="col-md-4">
              <div className="mx-3 my-5">
                <h1>{product.title}</h1>
                <p>{product.description}</p>
                <h5>${product.price}</h5>
                <div>
                  <form>
                    <label>Select Quantity</label>
                    <select
                      name="product-quantity"
                      value={this.state.selectedQuantity}
                      onChange={this.handleChange}
                    >
                      {Array.apply(null, new Array(quantity)).map((el, ind) => {
                        return <option key={ind}>{ind}</option>
                      })}
                    </select>
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
  const id = Number(ownProps.match.params.productId)
  return {
    product: state.products.filter(product => product.id === id)[0],
    products: state.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    addToCart: () => dispatch(editTheCart())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleProduct)

// SingleProduct.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,   //number is corrent for number?
//   inventoryQuantity: PropTypes.number.isRequired,   //number is corrent for number?
//   imageUrl: PropTypes.string.isRequired
// }
