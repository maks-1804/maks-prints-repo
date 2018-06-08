import React from 'react'
import PropTypes from 'prop-types'

export const ProductCard = (props) => {
  const { product } = props

  return (
    <div>
      <div className="card">
      <img src={product.imageUrl} className="img img-fluid" />
        <h1>{product.title}</h1>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
