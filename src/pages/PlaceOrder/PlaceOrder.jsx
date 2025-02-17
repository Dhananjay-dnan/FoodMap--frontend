import React, { useContext, useEffect, useState } from 'react'
import './PlaceOrder.css'
import Bill from '../../components/Bill/Bill';
import { StoreContext } from '../../context/StoreContext';
import axiosInstance from '../../api/axiosInstance';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const PlaceOrder = ({ setShowAddress }) => {

    const {cartItems, getTotalCartAmount } = useContext(StoreContext);
    const [savedAddresses, setSavedAddresses] = useState([]);
    const [errorMessage,setErrorMessage] = useState('');
    const {user} = useAuth();
    const navigate = useNavigate();

    // const savedAddresses = [
    //     { id: '1', address: '123 Main St', city: 'Newyork', country: 'United States' },
    //     { id: '2', address: '456 Elm St', city: 'Newyork', country: 'United States' },
    //     { id: '3', address: '789 Elas St', city: 'Illinois', country: 'United States' },
    //     { id: '4', address: '451 East St', city: 'Illinois', country: 'United States' },
    //     { id: '5', address: '412 St Min', city: 'Chicago', country: 'United States' },
    // ]
    useEffect(() => {
        const fetchAddress = async () => {
          try {
            const userId = localStorage.getItem('userId');
            const response = await axiosInstance.get(`/user/location/${userId}`);
            setSavedAddresses(response.data);
          } catch (err) {
            console.error('Error fetching Address', err);
            setError('Failed to load Address.');
          } finally {
            // setLoading(false);
          }
        };
    
        fetchAddress();
      }, []);

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

    const handleOrderCreation = async(e) => {
        e.preventDefault();
        const endpoint = '/order/create';
        const deliveryAddress = selectedAddress.address+ ", " + selectedAddress.city + ", " + selectedAddress.state;
        const orderItems = Object.entries(cartItems).map(([key, value]) => {
            return {
                foodListId: parseInt(key, 10),
                quantity: value
            };
        });
        const userId = localStorage.getItem('userId');
        const payload = {
            userId: userId,
            restaurantId: 16,
            deliveryAddress: deliveryAddress,
            price: getTotalCartAmount(),
            orderItems: orderItems,
        };

        try {
            
            const response = await axiosInstance.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            localStorage.removeItem('orderId');
            const data = response.data;
            const orderId = data.id;
            localStorage.setItem('orderId', orderId);
            console.log(data.id);
            navigate('/payment');
            
        } catch (error) {
            if (error.response) {
                // The request was made, and the server responded with a status code
                // that falls out of the range of 2xx
                const errorData = error.response.data;
                setErrorMessage(errorData.message || 'An error occurred.');
            } else if (error.request) {
                // The request was made, but no response was received
                console.error('Error:', error.request);
                setErrorMessage('Network error. Please try again later.');
            } else {
                // Something happened in setting up the request that triggered an Error
                console.error('Error:', error.message);
                setErrorMessage('An error occurred. Please try again later.');
            }
        }
        
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
                            <div>{address.state}</div>
                            <button onClick={() => handleDeliverHere(address)}>Deliver Here</button>

                        </div>
                    ))}
                    <button onClick={()=>setShowAddress(true)}>Add New</button>
                    </>):
                    (
                        // Show only selected address
                        <div className="address selected">
                            <div>{selectedAddress.address}</div>
                            <div>{selectedAddress.city}</div>
                            <div>{selectedAddress.state}</div>
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
                    <button onClick={handleOrderCreation}  >Place Order</button>
                    
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
