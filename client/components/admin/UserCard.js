import React, { Component } from 'react'
import { updateUser } from '../../store/user'
import { deleteUser } from '../../store/admin'
import { connect } from 'react-redux'

class UserCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: this.props.user.isAdmin ? "admin" : "user"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const id = this.props.user.id
    this.state.selectedValue === 'user' ? this.props.editUser(id, { isAdmin: false }) : this.props.editUser(id, { isAdmin: true })
  }

  handleChange(evt) {
    this.setState({
      selectedValue: evt.target.name
    })
  }

  render() {
    return (
      <div className="card">
        <div className="row">
          <div className="col s7">
            <h3>{this.props.user.name}</h3>
            <p>{this.props.user.email}</p>
          </div>
          <div className="col s5">

            {/* Change User Type */}
            <form onSubmit={this.handleSubmit}>
              <div className="radio">
                <label>
                  <input className="with-gap" type="radio" name="admin" checked={this.state.selectedValue === "admin"} onChange={this.handleChange} />
                  <span>
                    Administrator
                  </span>
                </label>
              </div>
              <div className="radio">
                <label>
                  <input className="with-gap" type="radio" name="user" checked={this.state.selectedValue === "user"} onChange={this.handleChange} />
                  <span>
                    User
                  </span>
                </label>
              </div>
              <button className="waves-effect waves-light btn-small" type="submit">Change</button>
            </form>

            {/* Delete a User */}
            <div className="col s5">
              <button className="waves-effect waves-light btn" type="button" onClick={() => this.props.deleteUser(this.props.user.id)}>Delete User</button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    editUser: (id, user) => dispatch(updateUser(id, user)),
    deleteUser: (id) => dispatch(deleteUser(id))
  }
}

export default connect(null, mapDispatchToProps)(UserCard)
