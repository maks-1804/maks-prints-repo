import React from 'react'
import PropTypes from 'prop-types'

export const ProductCard = (props) => {
  const { product } = props

  return (
    <div className="container-single-product">
      <div>
        <h1>{product.title}</h1>
        <p>Price: ${product.price}</p>
        <img src={product.imageUrl} />
      </div>
    </div>
  )
}

export default ProductCard
