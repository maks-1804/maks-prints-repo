import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addProduct } from '../../store/products'
import { loadAllCategories } from '../../store/categories'

class AddProduct extends Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      image: '',
      description: '',
      price: '',
      categories: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount() {
    this.props.fetchCategories()
  }

  handleChange(evt) {
    const value = evt.target.type === 'checkbox' ? this.state.categories.push(evt.target.value) : evt.target.value
    this.setState({
      [evt.target.name]: value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const newProduct = this.state
    newProduct.categories = this.state.categories
    this.props.addProduct(newProduct)
    this.setState({
      title: '',
      image: '',
      description: '',
      price: ''
    })
  }

  render() {
    return (
      <div>
        <div className="container">
          <div>
            <h3>Add a new product</h3>
          </div>

          <form onSubmit={this.handleSubmit}>
            <div className="form-group-row">
              <label htmlFor="title" className="col-4">Title</label>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="title"
                  onChange={this.handleChange}
                  placeholder="Title"
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="image" className="col-4">Image</label>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="image"
                  onChange={this.handleChange}
                  placeholder="Image"
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="description" className="col-4">Description</label>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="description"
                  onChange={this.handleChange}
                  placeholder="Description"
                  required
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="price" className="col-4">Price</label>
              <div className="col-8">
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  onChange={this.handleChange}
                  placeholder="Price"
                  required
                />
              </div>
            </div>

            <div className="form-group-row">
              <label>Category:</label>
              {
                this.props.categories.map((category) => {
                  return (
                    <div key={category.id} className="form-group-row">
                      <div className="col-8">
                        <label className="col-4">{category.name}</label>
                        <input
                          className="form-control"
                          type="checkbox"
                          value={category.name}
                          onChange={this.handleChange}
                        />
                      </div>
                    </div>
                  )
                })
              }
            </div>

            <button type="submit" onClick={this.handleSubmit}>
              Submit
            </button>

          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    categories: state.categories
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addProduct: product => dispatch(addProduct(product, ownProps)),
    fetchCategories: () => dispatch(loadAllCategories())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AddProduct))
