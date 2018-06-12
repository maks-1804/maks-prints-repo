import axios from 'axios'
import history from '../history' // we'll see if we need this in the thunks

/* will discuss - add a thunk for GET /api/reviews/user/:userId ?? */

/**
 * ACTION TYPES
 */
const GET_REVIEWS = 'GET_REVIEWS'
const ADD_NEW_REVIEW = 'ADD_NEW_REVIEW'
const EDIT_REVIEW = 'EDIT_REVIEW'
const DELETE_REVIEW = 'DELETE_REVIEW'

/**
 * ACTION CREATORS
 */
const getReviews = reviews => ({ type: GET_REVIEWS, reviews })
const addNewReview = review => ({ type: ADD_NEW_REVIEW, review })
const editReview = review => ({ type: EDIT_REVIEW, review })
const deletedReview = reviewId => ({ type: DELETE_REVIEW, reviewId })

/**
 * THUNK CREATORS
 */

export const loadAllReviews = () => {
  return async dispatch => {
    try {
      const response = await axios.get('/api/reviews')
      const reviews = response.data
      dispatch(getReviews(reviews))
    } catch (err) {
      console.log('Error getting all reviews: ', err.message)
    }
  }
}
//need to interpolate to add to correct product
//api/reviews/:productId
export const addReview = (review, id) => {
  return async dispatch => {
    try {
      const response = await axios.post(`/api/reviews/${id}`, review)
      const newReview = response.data
      console.log('dispatching new review thunk,', newReview)
      dispatch(addNewReview(newReview))
    } catch (err) {
      console.log('Error adding new review: ', err.message)
    }
  }
}

export const updateReview = review => {
  return async dispatch => {
    try {
      const response = await axios.put(`/api/reviews/${review.id}`, review)
      const updatedReview = response.data
      dispatch(editReview(updatedReview))
    } catch (err) {
      console.log('Error editing review: ', err.message)
    }
  }
}

/* needs review with api review routes */

//  export const deleteReview = reviewId => {
//    return async (dispatch) => {
//      try {
//         const deleteThisReview = await axios.delete(`/api/reviews/products/${productId}`) //??
//         dispatch(deletedReview(reviewId))
//      } catch (err) {
//        console.log('Error deleting review: ', err.message)
//      }
//    }
//  }

/**
 * INITIAL STATE
 */
const defaultReviews = []

/**
 * REDUCER
 */

export default (state = defaultReviews, action) => {
  switch (action.type) {
    case GET_REVIEWS:
      return action.reviews
    case ADD_NEW_REVIEW:
      return [...state, action.review]
    case EDIT_REVIEW:
      return state.map(review => {
        if (review.id === action.review.id) {
          return action.review //if the ids match, maps keeps updated
        }
        return review //otherwise, map keeps as is
      })
    // case DELETE_REVIEW
    //pending discussion
    default:
      return state
  }
}
