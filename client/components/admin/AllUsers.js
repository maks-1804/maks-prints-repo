import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/admin'
import { UserCard } from './UserCard'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render(){
    const {users} = this.props
    console.log("Helloooooo nurse", this.props.users)
    return (
      <div>
        {users.map(user => (<UserCard key={user.id} user={user} />
        Hello
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    users: state.admin
  }
}

const mapDispatchToProps = dispatch => {

  return {
    getUsers: () => dispatch(fetchUsers())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AllUsers)
