import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

export const ProductCard = props => {
  const { product } = props

  return (
    <div>
      <div className="card">
        <Link to={`/shop/product/${product.id}`}>
          <img src={product.imageUrl} className="img img-fluid" />
          <h1>{product.title}</h1>
        </Link>
        <p>Price: ${product.price}</p>
      </div>
    </div>
  )
}

export default ProductCard
