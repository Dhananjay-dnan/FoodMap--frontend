import React, { useContext, useEffect } from 'react'
import { assets } from '../../assets/assets'
import { StoreContext } from '../../context/StoreContext';
import './CartPopup.css'
import { Link } from 'react-router-dom';
import Bill from '../Bill/Bill';

const CartPopup = ({ setShowCart }) => {
    const { cartItems, foodList, addToCart, removeFromCart, getTotalCartAmount } = useContext(StoreContext);
    useEffect(() => {
        // Lock the background scroll when the popup is open
        document.body.style.overflow = 'hidden';

        // Cleanup function to reset the overflow when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); 
    return (
        <div className='cart-popup'>
            <div className="cart-popup-container">
                <div className="cart-popup-title">
                    <h2>My Cart</h2>
                    <img onClick={() => setShowCart(false)} src={assets.cross_icon} />
                </div>
                <br />
                <hr />
                <div className="cart-popup-item-container">
                {foodList.map((item, index) => {
                    if (cartItems[item.id] > 0) {
                        return (
                            <div key={index} className="cart-popup-items">
                                <img src={assets.food_1} alt='' />
                                <div className="cart-popup-items-details-container">
                                    <p>{item.name}</p>
                                    <p>{item.category}</p>
                                    <p>Rs.{item.price}</p>
                                </div>
                                <div className='cart-popup-items-counter'>
                                    <img onClick={() => removeFromCart(item.id)} src={assets.remove_icon_red} alt='' />
                                    <p>{cartItems[item.id]}</p>
                                    <img onClick={() => addToCart(item.id)} src={assets.add_icon_green} alt='' />
                                </div>
                            </div>
                        )
                    }
                })}
                </div>
                <br />
                <hr />
                {/* <div className='cart-popup-bill'></div>
                <h2>Bill Details</h2>
                <div className="cart-popup-bill-table">

                    <div className="cart-popup-bill-label">

                        <p>Item Total</p>
                        <p>Delivery Charge</p>
                        <p>Handling Charge</p>
                        <p>Total Amount</p>
                    </div>
                    <div className="cart-popup-bill-values">
                        <p>Rs {getTotalCartAmount()}</p>
                        <p>Rs 50.00</p>
                        <p>Rs 5.00</p>
                        <p>Rs {55 + getTotalCartAmount()}</p>
                    </div>
                </div>
                <br />
                <hr /> */}
                <Bill amount ={getTotalCartAmount()} />
                <div className="cart-popup-cancellation-policy">
                    <h2>Cancellation Policy</h2>
                    <p>Orders cannot be cancelled once packed for delivery. In case of unexpected delays, a refund will be provided, if applicable.</p>
                </div>
                <Link to='/order'><button onClick={() => setShowCart(false)}>Place Order

                </button></Link>

            </div>

        </div>
    )
}

export default CartPopup
