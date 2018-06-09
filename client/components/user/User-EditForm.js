import React from 'react'
import { updateUser } from '../../store/user'
import { connect } from 'react-redux'

import PropTypes from 'prop-types'

class UserEdit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: '',
      email: '',
      password: '',
      address: ''
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.togglePassword = this.togglePassword.bind(this)
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user.email !== prevState.email) {
      return {
        name: nextProps.user.name,
        email: nextProps.user.email,
        address: nextProps.user.address
      }
    }
  }

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    const id = this.props.user.id
    this.props.dispatchEditUser(id, this.state)
    this.setState({
      name: '',
      email: '',
      password: '',
      address: ''
    })
  }

  togglePassword() {
    let inputPass = document.getElementById('inputPassword')
    if (inputPass.type === 'password') {
      inputPass.type = 'text'
    } else {
      inputPass.type = 'password'
    }
  }

  render() {
    return (
      <div className="container">

        <div>
          <h3>
            Edit Your Account
          </h3>
          <p>...Looking to delete your account? Delete</p>
        </div>

        <div>
          <form onSubmit={this.handleSubmit}>
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-4">Name</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={this.state.name}
                  type="text"
                  name="name"
                  onChange={this.handleChange}
                  placeholder="Name"
                  required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="email" className="col-sm-4">Email</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={this.state.email}
                  type="text"
                  name="email"
                  onChange={this.handleChange}
                  placeholder="Email"
                  required />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="password" className="col-sm-4" >Password</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  id="inputPassword"
                  value={this.state.password}
                  type="password"
                  name="password"
                  onChange={this.handleChange}
                  placeholder="Password"
                  required />
              </div>
            </div>

            <div className="form-group row">
              <input className="form-check-input" type="checkbox" onClick={this.togglePassword} />
              <label className="form-check-label">Show Password</label>
            </div>

            <div className="form-group row">
              <label htmlFor="password" className="col-sm-4" >Address</label>
              <div className="col-sm-8">
                <input
                  className="form-control"
                  value={this.state.address}
                  type="text"
                  name="address"
                  onChange={this.handleChange}
                  placeholder="Address" />
              </div>
            </div>
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    dispatchEditUser: (id, user) => {
      id = ownProps.match.params.userId
      dispatch(updateUser(id, user))
      ownProps.history.push(`/${id}/dashboard`)
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(UserEdit)


/**
 * PROP TYPES
 */
UserEdit.propTypes = {
  dispatchEditUser: PropTypes.func.isRequired
}
