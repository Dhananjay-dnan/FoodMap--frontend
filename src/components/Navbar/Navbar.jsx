import React, { useState } from 'react'
import { assets } from '../../assets/assets'
import './NavBar.css'

const NavBar = () => {
  const[menu,setMenu] = useState('Menu');
  return (
    <div className='navbar'>
      <img src ={assets.logo} alt = "" className='logo'/>
      <ul className='navbar-menu'>
        <li onClick={()=>setMenu('Home')} className={menu==="Home"?"active":""}>Home</li>
        <li onClick={()=>setMenu('Menu')} className={menu==="Menu"?"active":""}>Menu</li>
        <li onClick={()=>setMenu('Download')} className={menu==="Download"?"active":""}>Download</li>
        <li onClick={()=>setMenu('Support')} className={menu==="Support"?"active":""}>Support</li>
      </ul>
      <div className='navbar-right'>
        <img src = {assets.search_icon} alt=""></img>
        <div className='navbar-search-icon'>
          <img src ={assets.basket_icon} alt=''></img>
          <div className='dot'></div>
        </div>
        <button>Sign In</button>
        </div>
    </div>
  )
}
export default NavBar
