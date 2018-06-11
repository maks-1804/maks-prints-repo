import React, { Component } from 'react'
import { updateUser } from '../../store/user'

class UserCard extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  render(){
    return(
      <div>
      </div>
    )
  }
}

// const mapDispatchToProps = (dispatch, ownProps) => {
//   const id = Number(ownProps.match.params.userId)
//   return {
//     editUser: (id, user) => dispatch(updateUser(id, user))
//   }
// }
