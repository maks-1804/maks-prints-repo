import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const NavCategory = () => {
  const categories = [
    {
      id: 1,
      name: 'National Parks'
    },
    {
      id: 2,
      name: 'California'
    },
    {
      id: 3,
      name: 'South America'
    }
  ]

  return (
    <div className="container-nav col-sm-3" id="navcategory">
    <div className="px-auto">
      {categories.map(cat => {
        return (
          <div key={cat.id}>
            <Link to={`/shop/${cat.name}`}>{cat.name}</Link>
          </div>
        )
      })}
    </div>
    </div>
  )
}

export default NavCategory
