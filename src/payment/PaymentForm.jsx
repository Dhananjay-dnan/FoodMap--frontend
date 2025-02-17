// src/PaymentForm.js

import React, { useContext, useEffect, useState } from 'react';
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import axios from 'axios';
import './PaymentForm.css'; // Import the CSS file
import axiosInstance from '../api/axiosInstance';
import { StoreContext } from '../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const PaymentForm = () => {
  const [success, setSuccess] = useState(false);
  const [processing, setProcessing] = useState('');
  const [error, setError] = useState(null);
  const {getTotalCartAmount } = useContext(StoreContext);
  console.log(getTotalCartAmount());
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        navigate('/delivery');
      }, 3000); // Redirect after 3 seconds
  
      return () => clearTimeout(timer); // Cleanup
    }
  }, [success, navigate]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setProcessing(true);
    setError(null);

    if (!stripe || !elements) {
      setProcessing(false);
      return;
    }

    // Create Payment Method
    const cardElement = elements.getElement(CardElement);
    const { error: createError, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (createError) {
      setError(createError.message);
      setProcessing(false);
      return;
    }

    // Send Payment Method to backend
    try {
      console.log({getTotalCartAmount});
      const orderId = localStorage.getItem('orderId');
      console.log({getTotalCartAmount});
      const response = await axiosInstance.post('/payment/create-payment-intent', {
        amount: getTotalCartAmount(), // Amount in cents
        currency: 'usd',
        paymentMethodId: paymentMethod.id,
        orderId: orderId
      });

      const clientSecret = response.data.clientSecret;

      // Confirm Payment Intent
      const { error: confirmError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: paymentMethod.id, // Ensure this is sent
        });

      if (confirmError) {
        setError(`Payment failed: ${confirmError.message}`);
        setProcessing(false);
        return;
      }

      if (paymentIntent.status === 'succeeded') {
        setSuccess(true);
        setProcessing(false);
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
      setProcessing(false);
    }
  };

  return (
    <>
      {success ? (
        <div className="payment-success">
          <h2>Payment Successful!</h2>
          <p>Thank you for your purchase.</p>
        </div>
      ) : (
        <form className="payment-form" onSubmit={handleSubmit}>
          <h2>Complete Your Purchase</h2>
          <div className="card-element">
            <CardElement options={CARD_OPTIONS} />
          </div>
          {error && (
            <div className="card-error" role="alert">
              {error}
            </div>
          )}
          <button disabled={processing || !stripe}>
            {processing ? 'Processing...' : 'Pay'}
          </button>
        </form>
      )}
    </>
  );
};

const CARD_OPTIONS = {
  style: {
    base: {
      color: '#32325d',
      fontFamily: 'Arial, sans-serif',
      fontSize: '16px',
      '::placeholder': {
        color: '#a0aec0',
      },
    },
    invalid: {
      color: '#fa755a',
    },
  },
};

export default PaymentForm;