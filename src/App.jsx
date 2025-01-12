import React, { useState } from 'react'
import NavBar from './components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home/Home'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
import LoginPopup from './components/LoginPopup/LoginPopup'
import CartPopup from './components/CartPopup/CartPopup'

const App = () => {
  const[showLogin, setShowLogin] = useState(false);
  const[showCart, setShowCart] = useState(false);
  return (
    <>
    {showLogin?<LoginPopup setShowLogin={setShowLogin}/>:<></>}
    {showCart?<CartPopup setShowCart={setShowCart}/>:<></>}
    <div className='app'>
      <NavBar setShowLogin={setShowLogin} setShowCart={setShowCart}/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<PlaceOrder />} />
      </Routes>
    </div>
    <Footer />
    </>
  )
}

export default App
