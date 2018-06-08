import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'


class SingleProduct extends Component {
  constructor() {
    super()
    this.state = {
      selectedQuantity: 0
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
    const { id, title, description, price, inventoryQuantity, imageUrl } = this.props.location.props
    console.log('props: ', this.props.location.props)
    return (
      // classNames can be changed...flexbox in mind (2columns, pic vs everything else)
      //if it works better with something (bootstrap?), feel free to change classNames/div structure!
      <div className='container-single-prod-parent'>
        {/* <div className='single-prod-child'> */}
          <img src={imageUrl} />
        {/* </div> */}
        {/* <div className='single-prod-child'> */}
          <h1>{title}</h1>
          <p>{description}</p>
          <h5>${price}</h5>
          <form>
            <label>Select Quantity</label>
            <select
              name='product-quantity'
              value={this.state.selectedQuantity}
              onChange={this.handleChange}>
              {Array.apply(null, new Array(inventoryQuantity)).map((el, ind) => {
                  return (<option key={ind}>{ind}</option>)
                })}
            </select>
          </form>
          <h5>Subtotal: ${this.state.selectedQuantity * price}</h5>
          <button type='submit' onClick={this.handleSubmit}>Add to cart</button>
        {/* </div> */}
        <div>
          {/* REVIEWS */}
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => {
  return {
    test: () => dispatch('thing')
  }
}

export default connect(null, mapDispatch)(SingleProduct)

// SingleProduct.propTypes = {
//   id: PropTypes.string.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,   //number is corrent for number?
//   inventoryQuantity: PropTypes.number.isRequired,   //number is corrent for number?
//   imageUrl: PropTypes.string.isRequired
// }
