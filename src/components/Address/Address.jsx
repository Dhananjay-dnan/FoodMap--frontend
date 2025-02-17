import React, { useState } from 'react'
import './Address.css';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

const Address = ({setShowAddress}) => {
    const {user, isLoggedIn} = useAuth();
    const [errorMessage,setErrorMessage] = useState('');
        const [formData, setFormData] = useState({
          address: '',
          city: '',
          state: '',
          pinCode: '',
          landmark: '',
        });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prevData => ({
          ...prevData,
          [name]: value,
        }));
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        const userId = localStorage.getItem('userId');
        const endpoint = `/public/user/location/${userId}/create`;
        const payload = {
            address: formData.address,
            city: formData.city,
            state: formData.state,
            pinCode: formData.pinCode,
            landmark: formData.landmark,
        };
        try {
            
            const response = await axiosInstance.post(endpoint, payload, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = response.data;
            setShowAddress(false);
            
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
    <div className="modal-overlay">
      <div className="modal-content">
        {/* Modal Header */}
        <div className="modal-header">
          <h2>Add Address</h2>
          <button className="close-button" onClick={()=>setShowAddress(false)}>&times;</button>
        </div>

        {/* Modal Body */}
        <div className="modal-body">
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="pinCode">Pin Code:</label>
              <input
                type="text"
                id="pinCode"
                name="pinCode"
                value={formData.pinCode}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="landmark">Landmark:</label>
              <input
                type="text"
                id="landmark"
                name="landmark"
                value={formData.landmark}
                onChange={handleChange}
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="save-button" >Save Address</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Address
