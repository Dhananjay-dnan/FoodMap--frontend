import React, { useContext, useEffect, useState } from 'react'
import axiosInstance from '../../api/axiosInstance'
import './OrderStatus.css'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import Bill from '../../components/Bill/Bill';
import { StoreContext } from '../../context/StoreContext';

const OrderStatus = () => {
    const [orderStatus, setOrderStatus] = useState();
    const orderId = localStorage.getItem('orderId');
    const [message,setMessage] = useState();
    const {cartItems, getTotalCartAmount } = useContext(StoreContext);
    const [animationSrc, setAnimationSrc] = useState('https://lottie.host/dc952b68-2f38-4fa4-8ba1-6de8ad83a834/20OfisN5Dj.lottie');
    const fetchOrderStatus = async () => {
        try {

            const response = await axiosInstance.get(`/order/${orderId}/order-status`,{
                withCredentials: true,
            });
            setOrderStatus(response.data);
            if(response.data=="CREATED"){
                setAnimationSrc('https://lottie.host/dc952b68-2f38-4fa4-8ba1-6de8ad83a834/20OfisN5Dj.lottie')
            
                setMessage("Waiting for Payment Confirmation")
            }
            if(response.data=="PLACED"){
                setAnimationSrc('https://lottie.host/dc952b68-2f38-4fa4-8ba1-6de8ad83a834/20OfisN5Dj.lottie')
            
                setMessage("Waiting for Restaurant to Accept your order")
            }
            else if(response.data=="ACCEPTED"){
                setAnimationSrc('https://lottie.host/be6b2a1b-75d8-4345-8a2d-401f61bdff82/FrISuT8OHd.lottie')
                setMessage("Your order is being prepared")

            }
            else if(response.data=="OUT_FOR_DELIVERY"){
                setAnimationSrc('https://lottie.host/52e1258b-c96f-4e97-8c62-28ccd21072fc/xTnnn8wg3i.lottie')
                setMessage("Order picked up, your food is on the way")
            }
        } catch (error) {

        }
    }
    
    useEffect(() => {
        fetchOrderStatus();
        const interval = setInterval(() => {
            fetchOrderStatus();
        }, 180000);

        return () => clearInterval(interval);
    }, []);
    return (
        <div className='order-status'>
            <div className="order-status-header">
            <h1>Live Order Tracking</h1>
            <button className='orderStatus' onClick={fetchOrderStatus}>Refresh Status</button>
            </div>
            <div className="order-status-container">
                <div className="order-status-left">
                    
                    <h2>Order Details</h2>
                    <h1>{message}</h1>
                    <DotLottieReact
      src={animationSrc}
      loop
      autoplay
      className='preparing-animation'
    />
                </div>
                <div className="order-status-center">
                {getTotalCartAmount()}
                </div>
                <div className="order-status-right">
                    <p>Order #<span>{orderId}</span></p>
                    <h4>From</h4>
                    <h2>Restaurant Name</h2>
                    <h4>Deliver To</h4>
                    <h2>Address Name</h2>
                </div>
                
            </div>
        </div>
    )
}

export default OrderStatus
