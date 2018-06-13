import React from 'react'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'

const NavCategory = (props) => {

  return (
    <div className="row">
      <div className="col s12">
        <ul className="tabs">
          <li className="tab">
            <NavLink to="/shop">All</NavLink>
          </li>
          {props.categories.map(cat => {
            return (
              <li className="tab" key={cat.id}>
                <NavLink to={`/shop/${cat.name}`}>{cat.name}</NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export default NavCategory
