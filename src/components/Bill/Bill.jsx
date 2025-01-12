import React from 'react'
import './Bill.css'

const Bill = ({amount}) => {
  return (
    <div>
      <div className='cart-popup-bill'></div>
                <h2>Bill Details</h2>
                <div className="cart-popup-bill-table">

                    <div className="cart-popup-bill-label">

                        <p>Item Total</p>
                        <p>Delivery Charge</p>
                        <p>Handling Charge</p>
                        <p>Total Amount</p>
                    </div>
                    <div className="cart-popup-bill-values">
                        <p>Rs {amount}</p>
                        <p>Rs 50.00</p>
                        <p>Rs 5.00</p>
                        <p>Rs {55 + amount}</p>
                    </div>
                </div>
    </div>
  )
}

export default Bill
