import React, { useState } from 'react'
import './Header.css'

const Header = () => {
    const [menu, setMenu] = useState('')
    return (
        <div className='header'>
            <div className="header-contents">
                <h2>From Our Kitchen to Your Table</h2>
                <p>Craving something delicious? Explore a world of flavors with just a tap. Your next meal is ready to be enjoyed!</p>
                <a href='#menu' onClick={() => setMenu('Menu')}>
                    <button className='header-btn'>View Menu</button>
                </a>

            </div>
        </div>
    )
}

export default Header