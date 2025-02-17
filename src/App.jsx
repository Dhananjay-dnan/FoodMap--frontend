import React, { useState } from 'react'
import NavBar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import CartPopup from './components/CartPopup/CartPopup'
import Login from './pages/Login/Login'
import MapComponent from './components/MapComponent/MapComponent'
import Address from './components/Address/Address'
import StripeContainer from './payment/StripeContainer'
import MapCmponent from './components/MapComponent/MapCmponent'
import OrderStatus from './pages/OrderStatus/OrderStatus'
import FoodDisplay from './components/FoodDisplay/FoodDisplay'

const App = () => {
  const[showLogin, setShowLogin] = useState(false);
  const[showAddress, setShowAddress] = useState(false);
  const[showCart, setShowCart] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {showCart?<CartPopup setShowCart={setShowCart} setShowLogin={setShowLogin}/>:<></>}
    {showAddress?<Address setShowAddress={setShowAddress}/>:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin} setShowCart={setShowCart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order"  element={<PlaceOrder setShowAddress={setShowAddress}/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/map" element={<MapCmponent />} />
        <Route path="/payment" element={<StripeContainer />} />
        <Route path="/delivery" element={<OrderStatus />} />
        <Route path="/restaurant" element={<FoodDisplay category='All'/>} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
