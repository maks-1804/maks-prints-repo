import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import { updateUser } from '../../store/user'
import Forbidden from '../Forbidden'

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
    if (this.props.user.id === Number(this.props.match.params.userId)) {
      return (
        <div className='container'>
          <form onSubmit={this.handleSubmit}>
            <div className='row'>
              <label htmlFor='name'>Name</label>
              <input
                value={this.state.name}
                type='text'
                name='name'
                onChange={this.handleChange}
                placeholder='Name'
                required />
            </div>
            <div className='row'>
              <label htmlFor='email'>Email</label>
              <input
                value={this.state.email}
                type='text'
                name='email'
                onChange={this.handleChange}
                placeholder='Email'
                required />
            </div>
            <div className='row'>
              <label htmlFor='password'>Password</label>
              <input
                id='inputPassword'
                value={this.state.password}
                type='password'
                name='password'
                onChange={this.handleChange}
                placeholder='Password'
                required />
            </div>
            <div className='row'>
              <input type='checkbox' onClick={this.togglePassword} />
              <label>Show Password</label>
            </div>
            <div className='row'>
              <label htmlFor='password'>Address</label>
              <input
                value={this.state.address}
                type='text'
                name='address'
                onChange={this.handleChange}
                placeholder='Address' />
            </div>
            <button type='submit'>Submit</button>
          </form>
        </div>
      )
    } else {
      return (
        <Forbidden />
      )
    }
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
