import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'

import { loadAllProducts, deleteProduct } from '../../store/products'
import { ProductCard } from '../shop'
import { CartHistory } from '../cart'

class AdminDashboard extends React.Component {
  componentDidMount() {
    this.props.fetchProducts()
  }

  render() {
    return (
      <div className="container">
        <h1>Manage your Store</h1>
        <hr />
        <div>
          <div className="row">
            <div className="col s8">
              <h4>Product Management</h4>
            </div>
            <div className="col s4 valign-wrapper">
              <Link to="/admin/product/add">
                <button className="btn-large waves-effect waves-light" type="button">Add Product</button>
              </Link>
            </div>
          </div>
            <div className="card-columns">
              {this.props.products.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isAdmin={this.props.isAdmin}
                  deleteProduct={this.props.deleteProduct}
                />
              ))}
            </div>
            <hr />
        </div>

        <div>
          <h4>Order Management</h4>
          <div>
            <CartHistory />
          </div>
          <hr />
        </div>

        <div className="row">
          <div className="col s8">
            <h4>User Management</h4>
          </div>
          <div className="col s4 valign-wrapper">
            <Link to="/admin/users">
              <button className="btn-large waves-effect waves-light" type="button">Edit Users</button>
            </Link>
          </div>
        </div>
      </div>
    )
  }
}

const mapState = state => {
  return {
    products: state.products,
    isAdmin: !!state.user.isAdmin
  }
}

const mapDispatch = dispatch => {
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    deleteProduct: id => dispatch(deleteProduct(id))
  }
}

export default connect(
  mapState,
  mapDispatch
)(AdminDashboard)
