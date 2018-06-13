import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CartHistoryCard = props => {
  const { date, status } = props.order
  const products = props.order.products || []

  return (
    <div className='row cart-card' id='history-card'>
      <table>
        <tr>
          <td className="col-2" style={{ width: '20%' }}>
            <p>{date.slice(0, 10)}</p>
          </td>
          <td className='col-6 align-items-left'>
            <div className='column'>
              {products.map(product => {
                // return <p key={product.id}> hi</p>
                return (<p key={product.id}>{product.title}</p>)
              })}
            </div>
          </td>
          <td className="column col-2 align-items-right">
          </td>
        </tr>
      </table>
    </div>
  )
}

export default CartHistoryCard

CartHistoryCard.propTypes = {
  order: PropTypes.object
}
