import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'
import axios from 'axios'
import axiosInstance from '../../api/axiosInstance'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const LoginPopup = ({ setShowLogin }) => {
    const [currState, setCurrState] = useState("Sign Up")
    const { login } = useAuth();
    const [formData, setFormData] = useState({
        email: '',
        userName: '',
        password: '',
        termsAccepted: false,
    });
    const [errorMessage, setErrorMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    useEffect(() => {
        // Lock the background scroll when the popup is open
        document.body.style.overflow = 'hidden';

        // Cleanup function to reset the overflow when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!formData.userName || !formData.password || (currState === 'Sign Up' && !formData.email)) {
            setErrorMessage('Please fill in all required fields.');
            return;
        }
        if (!formData.termsAccepted) {
            setErrorMessage('You must accept the terms and conditions.');
            return;
        }

        setErrorMessage('');

        const endpoint = currState === 'Sign Up' ? '/v1/auth/signup' : '/v1/auth';
        const payload = {
            userName: formData.userName,
            password: formData.password,
            ...(currState === 'Sign Up' && { email: formData.email }),
        };

        try {

            const response = await axiosInstance.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            if (data.token) {
                console.log("true")
                login(data)
                localStorage.setItem('userId', data.id);

                setShowLogin(false);
                
            }


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
        <div className='login-popup'>
            <div className="login-popup-container">
                <div className="login-popup-title">
                    <h2>{currState}</h2>
                    <img onClick={() => setShowLogin(false)} src={assets.cross_icon} />
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="login-popup-form">
                        <div className="login-popup-inputs">
                            {currState === "Login" ? <></> :
                                <input
                                    type='email' placeholder='Your E-mail' name='email' required value={formData.email}
                                    onChange={handleInputChange} />}
                            <input type='text' placeholder='Your UserName' name="userName" required value={formData.userName}
                                onChange={handleInputChange} />
                            <input type='password' name="password" placeholder='Password' required value={formData.password}
                                onChange={handleInputChange} />
                        </div>
                        <button type='submit'> {currState === "Sign Up" ? "Create Account" : "Login"}</button>
                        <div className="login-popup-condition">
                            <input type='checkbox' name="termsAccepted" required checked={formData.termsAccepted}
                                onChange={handleInputChange}></input>
                            <p>By continuing, I agree to the terms of use and privacy policy</p>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}

                        {currState === "Login" ? <p>Create a new account? <span onClick={() => setCurrState("Sign Up")}> Click here </span> </p> : <p>Already have an account? <span onClick={() => setCurrState("Login")}> Login here </span> </p>}
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPopup
