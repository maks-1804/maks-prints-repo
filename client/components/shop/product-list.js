import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavCategory from './nav-category'
import ProductCard from './product-card'
import { loadAllProducts } from '../../store/products'
import axios from 'axios'


class ProductList extends Component {
  constructor(props) {
    super(props)
  }
  // componentDidMount() {
  //   this.props.fetchProducts()
  //   console.log('do we have the products?', this.props.products)
  // }
  // shouldComponentUpdate(){

  // }
  // componentDidMount = async () => {
  //   // return async dispatch => {
  //     try {
  //       const {data} = await axios.get('/api/products')
  //       console.log("HIIIIIIIIIIIII", data)
  //       // dispatch(getProducts(products))
  //     } catch (err) {
  //       console.log('Error getting all products: ', err.message)
  //   }
  //  }

  componentDidMount(){
    this.props.fetchProducts()
    console.log("DA PRODUXX", this.props.products)
  }

  render() {
    const dummyProduct = {
      title: 'Patagonia',
      description: 'Patagonia Glaciers',
      price: 55,
      inventoryQuantity: 10,
      imageUrl: 'https://flic.kr/p/7VSNCE',
      category: 'South America'
    }

    const dummyProduct2 = {
      title: 'New York',
      description: 'New York City, NY',
      price: 50,
      inventoryQuantity: 9,
      imageUrl: 'https://flic.kr/p/7VSNCE',
      category: 'National Parks'
    }

    const arr = [dummyProduct, dummyProduct2]
    //const { products } = this.props.products
    return (
      <div className="container-products">
      {this.props.products.length && <div>It's working</div>}
      {console.log("HI", this.props.products)}

        <NavCategory />
        {/* {products && products.length ? (
        products.map(product => {
          return <ProductCard key={product.id} product={product} />
        })
      ) : (
        <div>loading...</div>
      )} */}
        <div>
          {this.props.match.params.categoryName
            ? arr
                .filter(
                  product =>
                    product.category === this.props.match.params.categoryName
                )
                .map(product => {
                  return <ProductCard key={product.id} product={product} />
                })
            : arr.map(product => {
                return <ProductCard key={product.id} product={product} />
              })}
        </div>
      </div>
    )
  }
}
export const DumbProductList = props => {
  const dummyProduct = {
    title: 'Patagonia',
    description: 'Patagonia Glaciers',
    price: 55,
    inventoryQuantity: 10,
    imageUrl: 'https://flic.kr/p/7VSNCE',
    category: 'South America'
  }

  const dummyProduct2 = {
    title: 'New York',
    description: 'New York City, NY',
    price: 50,
    inventoryQuantity: 9,
    imageUrl: 'https://flic.kr/p/7VSNCE',
    category: 'National Parks'
  }

  const arr = [dummyProduct, dummyProduct2]
  console.log('what are props', props)

  return (
    <div className="container-products">
      <NavCategory />
      {/* {products && products.length ? (
        products.map(product => {
          return <ProductCard key={product.id} product={product} />
        })
      ) : (
        <div>loading...</div>
      )} */}
      <div>
        {props.match.params.categoryName
          ? arr
              .filter(
                product => product.category === props.match.params.categoryName
              )
              .map(product => {
                return <ProductCard key={product.id} product={product} />
              })
          : arr.map(product => {
              return <ProductCard key={product.id} product={product} />
            })}
      </div>
    </div>
  )
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
