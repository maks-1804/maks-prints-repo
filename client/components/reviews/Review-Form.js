import React, { Component } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

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
    //submit the review and reset to blank inputs
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
          <input
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

export default ReviewForm
