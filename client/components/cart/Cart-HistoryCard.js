import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CartHistoryCard = props => {
  const { date, status } = props.order
  const products = props.order.products || []
  console.log('in hist card, products: ', products)
  console.log('typeof date: ', date.slice(0, 10))
  return (
    <div className='row cart-card' id='history-card'>
     <table>
      <tr>
      <td className="col s4 left-align">{date.slice(0, 10)}</td>
      <td>
        <div className='column col s6 left-align'>
          {products.map( product => {
            // return <p key={product.id}> hi</p>
            return (<p key={product.id}>{product.title}</p>)
          })}
        </div>
      </td>
        <td className="column col s2 right-align">
          <p>{status}</p>
          {status === 'processing' && (
            <button type='button'>Cancel Order</button>
          )}
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
