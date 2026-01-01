import React from 'react'
import './Footer.css'
import { Assets } from '../../assets/frontend_assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className="footer-content">
                <div className="footer-content-left">
                    <img className= 'logo' src={Assets.logo} alt="" />
                    <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Maxime, similique reiciendis rerum consectetur, dignissimos assumenda sequi numquam eum ut voluptatibus, sint impedit labore? Qui pariatur rerum, ab quod architecto cupiditate nihil vitae?</p>
                    <div className="footer-social-links">
                        <img src={Assets.facebook_icon} alt="" />
                        <img src={Assets.twitter_icon} alt="" />
                        <img src={Assets.linkedin_icon} alt="" />
                    </div>
                </div>
                <div className="footer-content-center">
                    <h2>Company</h2>
                    <ul>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy Policy</li>
                    </ul>
                </div>
                <div className="footer-content-right">
                    <h2>GET IN TOUCH</h2>
                    <ul>
                        <li>+91-1234-5678-00</li>
                        <li>zwiggy.customerservice@gmail.com</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>© [2025] [Zwiggy]. All rights reserved.
            </p>
        </div>
    )
}

export default Footer