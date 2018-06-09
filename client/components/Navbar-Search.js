import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { loadAllProducts } from '../store/products'
import { dispatchSearch } from '../store/search'

class SearchBar extends React.Component {
  constructor() {
    super()
    this.state = {
      search: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange(event) {
    this.setState({
      search: event.target.value
    })
  }

  handleSubmit(event) {
    event.preventDefault()
    this.props.dispatchSearch(this.state.search)
    this.setState({
      search: ''
    })
  }

  render() {
    return (
      <div>
        <form className="form-inline my-2 my-lg-0" onSubmit={this.handleSubmit} >
          <input className="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search" value={this.state.search} onChange={this.handleChange} />
          <button className="btn btn-sm btn-outline-secondary" type="submit">Search</button>
        </form>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    fetchProducts: () => dispatch(loadAllProducts()),
    dispatchSearch: (query) => {
      dispatch(dispatchSearch(query))
      ownProps.history.push(`?${query}`)
    }
  }
}

export default withRouter(connect(null, mapDispatchToProps)(SearchBar))
