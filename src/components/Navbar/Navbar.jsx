import React, { useContext, useEffect, useState } from 'react'
import { assets } from '../../assets/assets'
import './NavBar.css'
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import { useAuth } from '../../context/AuthContext';
import axiosInstance from '../../api/axiosInstance';

const NavBar = ({setShowLogin, setShowCart}) => {
  const[menu,setMenu] = useState('Menu');
  const { isLoggedIn,setIsLoggedIn, logout} = useAuth();
  const {cartItems,isCartItemsEmpty} = useContext(StoreContext);
  const [isEmpty, setIsEmpty] = useState(true);
  const navigate = useNavigate();
  const handleLogout = async (e) => {
    console.log("Logout Clicked")
    const response = await axiosInstance.post('/v1/auth/logout', {
        withCredentials: true,
    });
    if(response.data){
    setIsLoggedIn(false);
    console.log("logged in is set to false")
    logout();
    navigate('/')
  }
};

  useEffect(() => {
    setIsEmpty(isCartItemsEmpty);
}, [cartItems]);
  return (
    <div className='navbar'>
      <Link to='/'><img src ={assets.logo} alt = "" className='logo'/></Link>
      <ul className='navbar-menu'>
        <Link to='/' onClick={()=>setMenu('Home')} className={menu==="Home"?"active":""}>Home</Link>
        <a href='#explore-menu' onClick={()=>setMenu('Menu')} className={menu==="Menu"?"active":""}>Menu</a>
        <a href = 'https://play.google.com/store/apps/details?id=in.swiggy.android&referrer=utm_source%3Dswiggy%26utm_medium%3Dheader&pli=1' onClick={()=>setMenu('Download')} className={menu==="Download"?"active":""}>Download</a>
        <a href='#footer' onClick={()=>setMenu('Support')} className={menu==="Support"?"active":""}>Support</a>
      </ul>
      <div className='navbar-right'>
        <img src = {assets.search_icon} alt=""></img>
        <div className='navbar-search-icon'>
          {!isEmpty?<img onClick={()=>setShowCart(true)} src ={assets.basket_icon} alt=''></img>:<></>}
          {/* <div className='dot'></div> */}
        </div>
        {isLoggedIn?<button onClick={()=>handleLogout()}>Logout</button>:<button onClick={()=>setShowLogin(true)}>Sign In</button>}
        </div>
    </div>
  )
}
export default NavBar
