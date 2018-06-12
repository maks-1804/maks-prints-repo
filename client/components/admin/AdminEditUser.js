import React, {Component} from 'react'
import { connect } from 'react-redux'

class AdminEditUser extends Component {
  constructor(props){
    super(props)
    this.state = {
      isAdmin: ''
    }
  this.handleChange = this.handleChange.bind(this)
  this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const id = this.props.user.id
    this.props.editUser(id, this.state)
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          <select value={this.state.value} onChange={this.handleChange}>
            <option value="user">User</option>
            <option value="admin">Administrator</option>
          </select>
        </label>
        <button type="submit">Submit</button>
      </form>
    )
  }
}
