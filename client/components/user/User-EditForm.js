import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateUser } from '../../store/user'

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
        <h4>{`Update ${this.props.user.name}'s Info`}</h4>
      </div>
      <div className="row">
        <form className="col s12" onSubmit={this.handleSubmit}>
          <div className="input-field col s12">
            <label className="active" htmlFor='name'>Name</label>
            <input
              value={this.state.name}
              type='text'
              name='name'
              onChange={this.handleChange}
              placeholder='Name'
              required />
          </div>
          <div className='input-field col s12'>
            <label className="active" htmlFor='email'>Email</label>
            <input
              value={this.state.email}
              type='text'
              name='email'
              onChange={this.handleChange}
              placeholder='Email'
              required />
          </div>
          <div className='input-field col s12'>
            <label className="active" htmlFor='password'>Password</label>
            <input
              id='inputPassword'
              value={this.state.password}
              type="password"
              name='password'
              onChange={this.handleChange}
              placeholder='Password'
              required />
          </div>

          <div className='input-field col s12'>
          <div>
            <label>
            <input className="active" type='checkbox' className="filled-in" onClick={this.togglePassword} />
            <span>Show Password</span>
            </label>
          </div>

          </div>
          <div className='input-field col s12'>
            <label className="active" htmlFor='password'>Address</label>
            <input
              value={this.state.address}
              type='text'
              name='address'
              onChange={this.handleChange}
              placeholder='Address' />
          </div>

            <div className="center-align">
              <button className="btn-large waves-effect waves-light" type="submit">Submit</button>
            </div>
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
