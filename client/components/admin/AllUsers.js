import React, {Component} from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../store/admin'
import UserCard from './UserCard'

class AllUsers extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  render(){
    const {users} = this.props
    return (
      <div className="card-columns">
        {users.map(user => {return <UserCard key={user.id} user={user} />})}
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
