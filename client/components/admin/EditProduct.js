import React, { Component } from 'react'
import { connect } from 'react-redux'
import { updateProduct, loadAllProducts } from '../../store/products'

class ProductEdit extends Component {
  constructor(props){
    super(props)
    this.state = {
      title: '',
      imageUrl: '',
      description: '',
      price: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  // static getDerivedStateFromProps(nextProps, prevState) {
  //   if (nextProps.product.title !== prevState.title) {
  //     return {
  //       title: nextProps.product.title,
  //       image: nextProps.product.imageUrl,
  //       description: nextProps.user.imageUrl,
  //       price: nextProps.user.price
  //     }
  //   }
  // }

  componentDidMount(){
    if (!this.props.product) { this.props.loadProducts() }
    //!!!!
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt){
    const id = this.props.product.id
    evt.preventDefault()
    this.props.submitEdit(id, this.state)
  }

  render(){
    const { product } = this.props
    return (
      <div>{product && (<div className="container">
        <div>
          <h3>Edit {product.title}</h3>
        </div>

        <form onSubmit={this.handleSubmit}>
          <div className="form-group-row">
            <label htmlFor="title" className="col-4">Title</label>
            <div className="col-8">
              <input
                className="form-control"
                value={this.state.title}
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
                value={this.state.image}
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
                value={this.state.description}
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
                value={this.state.price}
                type="text"
                name="price"
                onChange={this.handleChange}
                placeholder="Price"
                required
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary btn-lg">Submit</button>
        </form>
      </div>)}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = Number(ownProps.match.params.productId)
  console.log(id)
  const product = state.products.find(elem => elem.id === id)
  console.log(state.products)
  return {
    product: product
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    submitEdit: (id, product) =>
      {
        id = Number(ownProps.match.params.productId)
        dispatch(updateProduct(id, product))
      },
    loadProducts: () => dispatch(loadAllProducts())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProductEdit)
