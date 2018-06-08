import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavCategory from './nav-category'
import ProductCard from './product-card'
import { loadAllProducts } from '../../store/products'
import axios from 'axios'


class ProductList extends Component {
  componentDidMount(){
    this.props.fetchProducts()
  }
  render() {
    let categoryMap = {}

    this.props.products.length && this.props.products.forEach( product =>
      {
      const categoryNames = product.categories.map(category => category.name)
      categoryMap[product.title] = categoryNames
    })
    const products = this.props.products
    return (
      <div className="container">
      <div className="row">
        {this.props.products.length && <div />}
          <NavCategory />
          <div className="col-8">
          <div className="row">
            {this.props.match.params.categoryName
              ?
              products.filter(product => categoryMap[product.title].includes(this.props.match.params.categoryName))
                  .map(product => {
                    return (
                    <div className="col-6" key={product.id}>
                      <ProductCard key={product.id} product={product} />
                    </div>)
                  })
              : products.map(product => {
                  return (
                  <div className="col-6" key={product.id}>
                    <ProductCard key={product.id} product={product} />
                  </div>
                  )
                })}
          </div>
          </div>
      </div>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    products: state.products
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchProducts: () => dispatch(loadAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductList)

/* Prop Types */
ProductList.propTypes = {
  products: PropTypes.array.isRequired
}
