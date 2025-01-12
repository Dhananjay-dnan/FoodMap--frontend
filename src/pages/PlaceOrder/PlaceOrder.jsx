import React, { useContext, useState } from 'react'
import './PlaceOrder.css'
import Bill from '../../components/Bill/Bill';
import { StoreContext } from '../../context/StoreContext';

const PlaceOrder = () => {

    const {getTotalCartAmount } = useContext(StoreContext);

    const savedAddresses = [
        { id: '1', address: '123 Main St', city: 'Newyork', country: 'United States' },
        { id: '2', address: '456 Elm St', city: 'Newyork', country: 'United States' },
        { id: '3', address: '789 Elas St', city: 'Illinois', country: 'United States' },
        { id: '4', address: '451 East St', city: 'Illinois', country: 'United States' },
        { id: '5', address: '412 St Min', city: 'Chicago', country: 'United States' },
    ]

    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAllAddresses, setShowAllAddresses] = useState(true);

    const handleDeliverHere = (address) => {
        setSelectedAddress(address);
        setShowAllAddresses(false);
    };

    const handleChangeAddress = () => {
        setShowAllAddresses(true);
        setSelectedAddress(null);
    };

    return (
        <div className='place-order'>
            <div className="place-order-container">
            <div className="place-order-left">
                <p className='title'> {showAllAddresses ? 'Choose a delivery address' : 'Delivery address'}
                    {!showAllAddresses && (
                        <button className='change-address-btn' onClick={handleChangeAddress}>
                            Change
                        </button>
                    )}
                </p>
                <div className='place-order-left-address'>
                {
                showAllAddresses ? ( <>
                    {savedAddresses.map((address) => (
                        <div key={address.id} className="address">
                            {/* <input type='radio' name='selected-address' value={address.address} id={`address-${address.id}`} /> */}
                            <div>{address.address}</div>
                            <div>{address.city}</div>
                            <div>{address.country}</div>
                            <button onClick={() => handleDeliverHere(address)}>Deliver Here</button>

                        </div>
                    ))}
                    <button>Add New</button>
                    </>):
                    (
                        // Show only selected address
                        <div className="address selected">
                            <div>{selectedAddress.address}</div>
                            <div>{selectedAddress.city}</div>
                            <div>{selectedAddress.country}</div>
                        </div>
                    )
                    }

                </div>
                <div className="place-order-left-payment">
                    <p className='title'>Select a payment method</p>
                    <div className='payment-selection'>
                        <input type='radio' name='selected-payment' value="Cash on Delivery" />
                        <label>Cash on Delivery</label>
                    </div>
                    <button onClick={()=> alert('Order Succesfull')}  >Place Order</button>

                </div>
            </div>
            <div className="place-order-right">
                <Bill amount={getTotalCartAmount()} />

            </div>
            </div>
        </div>
    )
}

export default PlaceOrder
