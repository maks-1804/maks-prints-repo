import React from 'react'
import PropTypes from 'prop-types'
import NavCategory from './nav-category'
import ProductCard from './product-card'


export const ProductList = (props) => {
  const dummyProduct = {
    "title": 'Patagonia',
    "description": 'Patagonia Glaciers',
    "price": 55,
    "inventoryQuantity": 10,
    "imageUrl": 'https://flic.kr/p/7VSNCE',
    "category": 'South America'
  }

  const dummyProduct2 = {
    "title": 'New York',
    "description": 'New York City, NY',
    "price": 50,
    "inventoryQuantity": 9,
    "imageUrl": 'https://flic.kr/p/7VSNCE',
    "category": 'National Parks'
  }

  const arr = [dummyProduct, dummyProduct2]

  return (
    <div className="container-products">
      <NavCategory />
      <div>
        {
          props.match.params.categoryName ?
            arr.filter(product => product.category === props.match.params.categoryName)
              .map(product => {
                return (
                  <ProductCard key={product.id} product={product} />
                )
              })
            : arr.map(product => {
              return (
                <ProductCard key={product.id} product={product} />
              )
            })
        }

      </div>
    </div>
  )
}

export default ProductList

/* Prop Types */
ProductList.propTypes = {
  products: PropTypes.array.isRequired
}
