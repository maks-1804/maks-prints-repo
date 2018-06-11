import axios from 'axios'

const GET_CATEGORIES = 'GET_CATEGORIES'

const getCategories = categories => ({ type: GET_CATEGORIES, categories })

export const loadAllCategories = () => {
  return async dispatch => {
    try {
      const res = await axios.get('/api/categories')
      const categories = res.data
      dispatch(getCategories(categories))
    } catch (err) {
      console.log('Error getting all categories: ', err.message)
    }
  }
}

const initialState = []

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
