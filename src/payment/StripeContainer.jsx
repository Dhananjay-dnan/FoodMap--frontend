import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const PUBLIC_KEY = 'pk_test_51QjK8OKK3bITYNlaL3r0WnrY2cssvGA0wpirayZjZHfV9CvRRewkVEmoaZVJCLv5p5QiXYKj7K3Nvf9gCeviXiEE00SOTIt0cB';

const stripePromise = loadStripe(PUBLIC_KEY);

const StripeContainer = () => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm />
    </Elements>
  );
};

export default StripeContainer;