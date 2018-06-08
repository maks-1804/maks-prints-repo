
const SEARCH = 'SEARCH'

const doSearch = query => ({ type: SEARCH, query })

export const dispatchSearch = query => {
  return dispatch => {
    dispatch(doSearch(query))
  }
}

const initialState = ''

export default (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return action.query
    default:
      return state
  }
}
