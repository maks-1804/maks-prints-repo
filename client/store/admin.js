import axios from 'axios'

const GET_ALL_USERS = 'GET_ALL_USERS'

const getAllUsers = users => ({type: GET_ALL_USERS})

export const fetchUsers = () => {
  return async dispatch => {
    try {
      const {data} = await axios.get('/users')
      dispatch(getAllUsers(data))
    }
    catch (err) { console.error("There was an error adding all users", err.message) }
  }
}
