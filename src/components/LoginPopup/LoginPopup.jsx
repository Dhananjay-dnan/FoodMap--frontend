import React, { useEffect, useState } from 'react'
import './LoginPopup.css'
import { assets } from '../../assets/assets'

const LoginPopup = ({setShowLogin}) => {
    const [currState, setCurrState] = useState("Sign Up")
    useEffect(() => {
        // Lock the background scroll when the popup is open
        document.body.style.overflow = 'hidden';

        // Cleanup function to reset the overflow when the component is unmounted
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, []); 
  return (
    <div className='login-popup'>
        <div className="login-popup-container">
            <div className="login-popup-title">
                <h2>{currState}</h2>
                <img onClick={()=>setShowLogin(false)} src={assets.cross_icon}/>
            </div>
            <div className="login-popup-inputs">
                {currState==="Login"?<></>:<input type='text' placeholder='Your Name' required/>}
                <input type='email' placeholder='Your Email' required/>
                <input type='password' placeholder='Password' required/>                
            </div>
            <button> {currState==="Sign Up"?"Create Account": "Login"}</button>
            <div className="login-popup-condition">
                <input type='checkbox' required></input>
                <p>By continuing, I agree to the terms of use and privacy policy</p>
            </div>
            {currState==="Login"?<p>Create a new account? <span onClick={()=>setCurrState("Sign Up")}> Click here </span> </p> : <p>Already have an account? <span onClick={()=>setCurrState("Login")}> Login here </span> </p> }
        </div>
    </div>
  )
}

export default LoginPopup
