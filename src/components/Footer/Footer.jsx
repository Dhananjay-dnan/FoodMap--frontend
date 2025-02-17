import React from 'react'
import { assets } from '../../assets/assets'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
        <div className="footer-content-left">
            <div className='footer-social-icons'>
                <img src ={assets.facebook_icon} alt=''/>
                <img src ={assets.twitter_icon} alt=''/>
                <img src ={assets.linkedin_icon} alt=''/>
            </div>
        </div>
        <div className="footer-content-center">
            <h2>COMPANY</h2>
            <ul>
                <li>Home</li>
                <li>About Us</li>
                <li>Delivery</li>
                <li>Privacy Policy</li>

            </ul>
        </div>
        <div className="footer-content-right">
            <h2>GET IN TOUCH</h2>
            <ul>
                <li>+91-6576497543</li>
                <li>contact@tomato.com</li>
            </ul>
        </div>
        </div>
    </div>
  )
}

export default Footer
