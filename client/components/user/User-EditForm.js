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

  render() {
    return (
      <div className='user-edit-form'>
        <form onSubmit={this.handleSubmit}>
          <label>Name</label>
          <input
            value={this.state.name}
            type='text'
            name='name'
            onChange={this.handleChange}
            placeholder='Name'
            required />
          <label>Email</label>
          <input
            value={this.state.email}
            type='text'
            name='email'
            onChange={this.handleChange}
            placeholder='Email'
            required />
          <label>Password</label>
          <input
            value={this.state.password}
            type='text'
            name='password'
            onChange={this.handleChange}
            placeholder='Password'
            required />
          <label>Address</label>
          <input
            value={this.state.address}
            type='text'
            name='address'
            onChange={this.handleChange}
            placeholder='Address' />
          <button type='submit'>Submit</button>
        </form>
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
