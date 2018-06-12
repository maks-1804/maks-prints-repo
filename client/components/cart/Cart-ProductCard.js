import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CartProductCard = props => {
  const { product, cartStatus, changeQuantity, deleteItem } = props
  // console.log(product)
  return (
    <div className='container'>
      <div className='row align-items-center cart-card'>
        <img src={product.imageUrl} className='col-2'/>
        <div className='column col-6'>
          <Link to={`/shop/product/${product.Id}`}>
            <h4>{product.title}</h4>
          </Link>
          <p>{product.description}</p>
          {cartStatus === 'open' &&
          <button
            type='button'
            onClick={(evt) => deleteItem(evt, product)}>
            Delete Item
          </button>}
        </div>
        <p className='col-2'>${(product.price / 100).toFixed(2)}</p>
        {cartStatus === 'open'
          ?  (<form className='col-1'>
                <select
                  name="product-quantity"
                  defaultValue={product.cartProducts.productQuantity}
                  onChange={(evt) => changeQuantity(evt, product)}
                >
                  {Array.apply(null, new Array(product.inventoryQuantity)).map((el, ind) => {
                    return <option key={ind}>{ind + 1}</option>
                  })}
                </select>
              </form>)
          : <p>{product.cartProducts.productQuantity}</p>
        }
      </div>
    </div>
  )
}


export default CartProductCard


// CartProductCard.propTypes = {
//   id: PropTypes.number.isRequired,
//   title: PropTypes.string.isRequired,
//   description: PropTypes.string.isRequired,
//   price: PropTypes.number.isRequired,
//   inventoryQuantity: PropTypes.number.isRequired,
//   imageUrl: PropTypes.string,
//   productQuantity: PropTypes.number,
//   cartStatus: PropTypes.bool,
//   deleteProductFromCart: PropTypes.func
// }
