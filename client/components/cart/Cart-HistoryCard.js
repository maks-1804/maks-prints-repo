import React, { Component } from 'react'
import PropTypes from 'prop-types'

const CartHistoryCard = props => {
  const { date, status } = props.order
  const products = props.order.products || []
  console.log('in hist card, products: ', products)
  // console.log('date: ', date)
  return (
    <div className='row cart-card' id='history-card'>
      <p className='col-2'>{date}</p>
      <div className='row col-6'>
        <div className='column'>
          {products.map( product => {
            // return <p key={product.id}> hi</p>
            return (<p key={product.id}>{product.title}</p>)
          })}
        </div>
      </div>
      <p className='col-2'>{status}</p>
      {status === 'processing' && (
        <button type='button'>Cancel Order</button>
      )}

    </div>
  )
}

export default CartHistoryCard

CartHistoryCard.propTypes = {
  order: PropTypes.object
}
