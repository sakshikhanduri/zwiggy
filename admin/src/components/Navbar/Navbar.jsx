import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/admin_assets/assets.js'
const Navbar = () => {
  return (
    <div className='navbar'>
      <img src={assets.logo} alt="" className="logo" />
      <img src={assets.profile_icon} className='profile' alt="" />
    </div>
  )
}

export default Navbar