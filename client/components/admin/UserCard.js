import React, { Component } from 'react'
import { updateUser } from '../../store/user'
import { connect } from 'react-redux';

class UserCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      selectedValue: this.props.user.isAdmin ? "admin" : "user"
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleSubmit(evt){
    evt.preventDefault()
    const id = this.props.user.id
    this.state.selectedValue === 'user' ? this.props.editUser(id, {isAdmin: false}) : this.props.editUser(id, {isAdmin: true})
  }

  handleChange(evt){
    this.setState({
      selectedValue: evt.target.name
    })
  }

  render(){
    return (
      <div className="card">
        <div className="row">
          <div className="col-7">
            <h3>{this.props.user.name}</h3>
            <p>Email: {this.props.user.email}</p>
          </div>
          <div className="col-5">
            <form onSubmit={this.handleSubmit}>
              <div className="radio">
                <label>
                  <input type="radio" name="admin" checked={this.state.selectedValue === "admin"} onChange={this.handleChange}/>
                  Administrator
                </label>
              </div>
              <div className="radio">
                <label>
                  <input type="radio" name="user" checked={this.state.selectedValue === "user"} onChange={this.handleChange}/>
                  User
                </label>
              </div>
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    editUser: (id, user) => dispatch(updateUser(id, user))
  }
}

export default connect(null, mapDispatchToProps)(UserCard)
