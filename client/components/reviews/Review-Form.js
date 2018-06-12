import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addReview } from '../../store/reviews'

class ReviewForm extends Component {
  constructor() {
    super()
    this.state = {
      title: '',
      content: '',
      rating: 'happy'
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  //component did mount, try to get prev state in case of editing?

  handleSubmit(event) {
    event.preventDefault()
    //construct the review with necessary info from state
    //userId will come from req.user
    const newReview = {
      title: this.state.title,
      content: this.state.content,
      rating: this.state.rating
    }
    console.log('handling review submit,', newReview, this.props.product.id)
    this.props.postReview(newReview, this.props.product.id)
    //reset form to blank vals
    this.setState({
      title: '',
      content: '',
      rating: 'happy'
    })
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }
  render() {
    return (
      <div className="container-form">
        <form onSubmit={this.handleSubmit}>
          <label>Add a Review</label>
          <input
            type="text"
            value={this.state.title}
            onChange={this.handleChange}
            name="title"
          />
          <textarea
            type="text"
            value={this.state.content}
            onChange={this.handleChange}
            name="content"
          />
          <select
            name="rating"
            value={this.state.rating}
            onChange={this.handleChange}
          >
            <option>happy</option>
            <option>sad</option>
          </select>
          <button type="submit">Submit Review</button>
        </form>
      </div>
    )
  }
}
const mapStateToProps = (state, ownProps) => {
  const productId = Number(ownProps.match.params.productId)
  return {
    user: state.user,
    product: state.products.filter(product => product.id === productId)[0]
  }
}
const mapDispatchToProps = dispatch => {
  return {
    postReview: (review, productId) => dispatch(addReview(review, productId))
  }
}
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ReviewForm)
)
