import React from 'react'
import PropTypes from 'prop-types'

export const ProductList = () => {
  const dummyProduct = {
    "title": 'Patagonia',
    "description": 'Patagonia Glaciers',
    "price": 55,
    "inventoryQuantity": 10,
    "imageUrl": 'https://flic.kr/p/7VSNCE'
  }

  return (
    <div className="container-products">
      <div>
        <h1>{dummyProduct.title}</h1>
        <p>{dummyProduct.description}</p>
        <p>Price: ${dummyProduct.price}</p>
        <p>In Stock: {dummyProduct.inventoryQuantity}</p>
        <img src={dummyProduct.imageUrl} />
      </div>
    </div>
  )
}

export default ProductList

/* Prop Types */
ProductList.propTypes = {
  products: PropTypes.array.isRequired
}
